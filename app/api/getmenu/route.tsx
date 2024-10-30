import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(req:any) {

  const { searchParams } = new URL(req.url);
  const restaurantName = searchParams.get("restaurantName");

  if (!restaurantName) {
    return NextResponse.json({ error: "restaurantName is required" }, { status: 400 });
  }

  try {
    // Use parameterized query to prevent SQL injection
    const res = await pool.query(
      `SELECT * FROM ITEMS WHERE restaurantID = (
         SELECT restaurantID FROM Restaurant WHERE name = $1
       )`,
      [restaurantName]
    );

    return NextResponse.json(res.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
