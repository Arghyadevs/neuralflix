import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
  try {
    const { title } = await params;
    const decodedTitle = decodeURIComponent(title);

    const filePath = path.join(process.cwd(), "..", "backend", "media_database.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const db = JSON.parse(data);

    // Find the movie case-insensitively
    const allMovies = Object.values(db);
    const movie = allMovies.find(
      (m) => m.title.toLowerCase() === decodedTitle.toLowerCase()
    );
    
    if (!movie) {
      return NextResponse.json(
        { error: `Movie "${decodedTitle}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error reading movie_database.json:", error);
    return NextResponse.json(
      { error: "Failed to load movie data" },
      { status: 500 }
    );
  }
}
