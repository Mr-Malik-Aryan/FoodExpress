"use client";
import { useEffect, useState } from "react";
import { Restaurant } from "../lib/interfaces";
import { Navbar } from "./components/navbar";
import { FoodItems } from "./components/foodItems";
import { ChooseOption } from "./components/chooseOption";
import Restaurants from "./components/resturants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UID {
  uid: string;
}
interface CartData {
  uid: string;
  item_count:number
}


// Fetch function
const fetchCartDetails = async (uid: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/getcart?uid=${encodeURIComponent(uid)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const cart = await response.json();
    console.log("Fetched CartItems:", cart);
    return cart;
  } catch (error) {
    console.error("Error fetching CartItems:", error);
    return [];
  }
};

// Component
export default function RiderComponent() {
  const [CartData, setCartData] = useState<CartData[]>([]);
  const [countItems, setCountItems] = useState(0);
  const [uid, setUid] = useState<UID>({ uid: "1001" });

  const handleFetchCart = async () => {
    const data = await fetchCartDetails(uid.uid);
    console.log("UID:", uid);
    //console.log("Cart Data:", data[0].item_count);
    setCountItems(data.length)
    setCartData(data); // Update state with fetched data if needed
  };
  useEffect (()=>{
    handleFetchCart()
  },[uid])

  return (
    <div className="flex flex-col w-full h-auto">
      <div className="fixed z-10 justify-center w-full">
        <Navbar Trigger={false} />
      </div>
      <div  className="hidden mt-36 md:mt-20  md:flex h-40 w-full">
      <div className="flex w-6/12 justify-center ">
      <ChooseOption />
       </div>
        
        {/* <div className="relative ml-auto flex items-center md:grow-0 mr-10">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            value={uid.uid}
            onChange={(event) => setUid({ uid: event.target.value })}
          />
          <Button
            variant="outline"
            className={`${uid.uid ? "absolute" : "hidden"} right-0 h-8 bg-transparent`}
            onClick={() => {
              handleFetchCart();
              setUid({ uid: "" });
            }}
          >
            Fetch
          </Button>
        </div> */}
      </div>
      <div className="flex mt-20 md:mt-10  p-4 w-full justify-center h-2/6 bg-[#f8f8f8]">
        <div className="scale-90 w-full">
          <FoodItems />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Restaurants />
      </div>
    </div>
  );
}
