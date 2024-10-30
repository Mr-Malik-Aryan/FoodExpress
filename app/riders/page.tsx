"use client"
import { useState } from "react";
import {Rider} from "../../lib/interfaces"
// Fetch function
const fetchRiders = async () => {
  try {
    const response = await fetch("./api/getrider");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const riders = await response.json(); // Parse JSON response
    //console.log("Fetched Riders:", riders);
    return riders; // Return fetched data
  } catch (error) {
    console.error("Error fetching riders:", error);
    return []; // Return an empty array if there is an error
  }
};

// Component
export default function RiderComponent() {
  const [riderData, setRiderData] = useState<Rider[]>([]); // Initialize state

  // Handler to fetch and set rider data
  const handleFetchRiders = async () => {
    const data = await fetchRiders(); // Wait for fetch to complete
    setRiderData(data); // Update state with fetched data
    console.log(data);
  };

  return (<>
     <div>
   
      <button className="bg-green-500 rounded-xl p-3" onClick={handleFetchRiders}>Fetch Riders</button>
      <ul>
        {riderData.map((rider, index) => (
          <li key={index}>RiderID:{rider.riderid} Name :{rider.fname + " "+rider.lname}</li>
        ))}
      </ul>
    </div>
    </>
  );
}
