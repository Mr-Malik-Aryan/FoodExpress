import { NextResponse } from "next/server";
import pool from "../../../lib/db";



export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");
  console.log(uid);

  if (!uid) {
    return NextResponse.json({ error: "uid not found" }, { status: 400 });
  }

  try {
    // Query to retrieve detailed information about each item in the cart for the given uid
    const res = await pool.query(
      `SELECT uid, itemname, itemsprice, quantity, restaurantid 
       FROM Cart 
       WHERE uid = $1;`,
      [uid]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: "No items found in cart" }, { status: 404 });
    }

    return NextResponse.json(res.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req:any) {
  // Parse the request body to get item details
  const { uid, itemname, itemsprice, restaurantid, quantity = 1 } = await req.json();

  // Validate the required fields
  console.log(typeof(uid));

  if (!uid || !itemname || !itemsprice || !restaurantid) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Insert the item into the Cart table with a parameterized query
    const res = await pool.query(
      `
        SELECT add_item_to_cart($1, $2, $3, $4, $5)
      `,
      [uid, itemname, Number(itemsprice), restaurantid, quantity]
    );

    return NextResponse.json({ message: "Item added to cart successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
