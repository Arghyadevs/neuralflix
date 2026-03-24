import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Correct path for production/Amplify
    const filePath = path.join(process.cwd(), "public", "media_titles.json");
    
    const data = fs.readFileSync(filePath, "utf-8");
    const titles = JSON.parse(data);
    return NextResponse.json(titles);
  } catch (error) {
    console.error("Error loading titles:", error);
    return NextResponse.json(
      { error: "Failed to load titles" },
      { status: 500 }
    );
  }
}
