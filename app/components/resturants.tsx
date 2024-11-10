"use client"
import { useEffect, useState } from "react";
import {Restaurant} from "../../lib/interfaces"
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import Image from 'next/image';
  import { useRouter } from 'next/navigation'

// Fetch function
const fetchRestaurants = async () => {
  try {
    const response = await fetch("./api/getres");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const restaurant = await response.json();
  // console.log("Fetched Restaurant details:", restaurant);
    return restaurant; 
  } catch (error) {
   // console.error("Error fetching restaurant details:", error);
    return []; 
};
}


export default function Restaurants() {
  const router = useRouter()
  const [resData, setResData] = useState<Restaurant[]>([]); // Initialize state
   useEffect(()=>{
     handleFetchRestaurants()
     //console.log("useEffect ran !")
   },[])
  // Handler to fetch and set rider data
  const handleFetchRestaurants = async () => {
    const data = await fetchRestaurants(); // Wait for fetch to complete
    setResData(data); // Update state with fetched data
    console.log(data);
  };

  return (
  
      <div>
     
      <div className="flex justify-center flex-basis flex-wrap w-full mt-20 ">
        
        {resData.map((res, index) => (
          <Card key={index} className="scale-90 md:scale-100 w-[400px] h-[400px] hover:scale-95 md:hover:scale-105 transition-all md:ml-10 mb:4 md:mb-10 border-2 border-slate-200 shadow-lg">
          <img className=" md:hover:scale-105 transition-all" src={res.image} alt="Restaurant Image"   style={{
    width: '100%',
    height: '250px', 
    objectFit: 'cover',
    borderRadius: '8px', 
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
  }} onClick={()=>{  router.push(`/restaurants/${res.name}`)}} />
          <CardContent className="p-2">
        <h3 className="text-lg md:text-xl font-semibold">{res.name}</h3>
        <p className="text-sm text-muted-foreground">
         {res.category}
        </p>
        <p className="text-sm text-muted-foreground">₹{res.cpp} for one</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-2">
        <Badge className="text-green-600 bg-green-100">{res.rating}</Badge>
        <span className="text-sm">25 min</span>
        {res.restaurantID}
      </CardFooter>
    </Card>
        ))}
      </div>
  
      </div>
  );
}
