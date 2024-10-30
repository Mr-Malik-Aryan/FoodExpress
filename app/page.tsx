"use client"
import { useState } from "react";
import {Restaurant} from "../lib/interfaces"
import { Navbar } from "./components/navbar";
import {FoodItems} from "./components/foodItems"
import { ChooseOption } from "./components/chooseOption";
import Restaurants from "./components/resturants";
// Fetch function
const fetchRiders = async () => {
  try {
    const response = await fetch("./api/getres");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const riders = await response.json(); // Parse JSON response
    console.log("Fetched Riders:", riders);
    return riders; // Return fetched data
  } catch (error) {
    console.error("Error fetching riders:", error);
    return []; // Return an empty array if there is an error
  }
};

// Component
export default function RiderComponent() {
  const [resData, setResData] = useState<Restaurant[]>([]); // Initialize state

  // Handler to fetch and set rider data
  const handleFetchRiders = async () => {
    const data = await fetchRiders(); // Wait for fetch to complete
    setResData(data); // Update state with fetched data
  };

  return (<>
     <main className="flex flex-col  w-full h-auto  ">
      <div className="flex justify-center w-full ">
     
            <Navbar/>  
      </div>
      <div className=" hidden md:flex h-40 justify-start w-6/12 ">
      <ChooseOption/>
      </div>
      <div className=" flex p-4 w-full justify-center h-2/6 bg-[#f8f8f8] ">
        <div className="scale-90 w-full">
        <FoodItems/>
          </div>  
      </div>
      <div className="w-full flex justify-center">
        <Restaurants/>
      </div>
     </main>

    </>
  );
}
