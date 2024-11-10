"use client";
import { useEffect, useState } from "react";
import { Item, Restaurant, Cart, User } from "@/lib/interfaces";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/app/components/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Query } from "pg";
import { Router } from "lucide-react";
import { Button } from "@/components/ui/button";

async function Menufetcher(slug: string) {
  const restaurantName = slug.replaceAll("%20", " ");

  try {
    const response = await fetch(
      `http://localhost:3000/api/getmenu?restaurantName=${encodeURIComponent(
        restaurantName
      )}`
    );
    //  console.log(response);

    if (!response.ok) {
      console.log("Problem fetching menu");
      throw new Error(`${response.status}`);
    }

    const menu = await response.json();
   // console.log("Fetched Menu:", menu);
    return menu;
  } catch (error) {
    console.error(`Error fetching menu for: ${restaurantName}`, error);
    return [];
  }
}
async function Resfetcher(slug: string) {
  const restaurantName = slug.replaceAll("%20", " ");

  try {
    const response = await fetch(
      `http://localhost:3000/api/getares?restaurantName=${encodeURIComponent(
        restaurantName
      )}`
    );
    //console.log(response);

    if (!response.ok) {
      console.log("Problem fetching menu");
      throw new Error(`${response.status}`);
    }

    const res = await response.json();
    //  console.log("Fetched Menu:", res);
    return res;
  } catch (error) {
    console.error(`Error fetching menu for: ${restaurantName}`, error);
    return [];
  }
}
async function addItemToCart(
  uid: number,
  itemname: string,
  itemsprice: number,
  restaurantid: number,
  quantity: number
) {
  try {
    const response = await fetch("/api/getcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid,
        itemname,
        itemsprice,
        restaurantid,
        quantity,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add item to cart");
    }

    const data = await response.json();
    console.log(data.message); // Successfully added message
    return data;
  } catch (error: any) {
    console.error("Error adding item to cart:", error);
    return { error: error.message };
  }
}

export default function RiderComponent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [items, setItems] = useState<Item[]>([]); // Fix: 'item' -> 'items'
  const [res, setRes] = useState<Restaurant[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [Trigger, setTrigger] = useState(true);
  const [restaurant, setRestaurant] = useState<Restaurant>(res[0]);
  const [restaurantName, setRestaurantName] = useState<String>();
  const getRestaurant = async () => {
    const resolvedParams = await params;
    const data = await Resfetcher(resolvedParams.slug);
    // console.log(data[0].address)
    setRes(data);
    setRestaurant(data[0]);
  };
  const handleFetchItems = async () => {
    const resolvedParams = await params;
    const data = await Menufetcher(resolvedParams.slug);

    setItems(data); // Set the fetched data into state
    setRestaurantName(resolvedParams.slug.replaceAll("%20", " "));
  };
  useEffect(() => {
    handleFetchItems();
    getRestaurant();
   // console.log(restaurant);
  }, [Trigger]);
  const handleAddToCart = async (item: Item) => {
   await addItemToCart(
      1001,
      item.itemname,
      item.itemprice,
      item.restaurantid,
      quantity
    );
    setTrigger(!Trigger)
  };
  if (restaurant) {
    return (

      <div className="  flex  flex-col w-11/12  lg:w-9/12 bg-white  relative mx-auto">
         <div className="fixed z-10 left-1 right-16 w-full ">
        <Navbar Trigger={Trigger} />
      </div>
        <div className="flex mt-20 w-full justify-center">
        
          <div className=" absolute flex justify-center w-full h-[200px] lg:h-[300px] ">
            {res && res[0] && res[0].image ? (
              <img
                src={res[0].image}
                alt="restaurant image is Loading..."
                className="object-cover  w-full h-full opacity-90 rounded-b-xl"
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className=" mt-[210px] md:[mt-250px] lg:mt-[320px] md:mb-6  w-full border-b-4  rounded-xl z-20 border-red-500">
          <h2 className="ml-2  text-4xl mr-auto font-bold">{restaurantName}</h2>
          <h2 className="ml-2 text-md mr-auto font-medium">
            {restaurant?.address}
          </h2>
          <h2 className="ml-2 text-md text-muted-foreground font-sans">
            {restaurant?.category}
          </h2>
          <h2 className="ml-2 text-sm text-muted-foreground font-sans">
            {" "}
            Rs.{restaurant.cpp} for one
          </h2>
        </div>
        <div className="w-full md:w-11/12 flex justify-center md:justify-end">
          <div className="scale-95 md:scale-100 grid gap-4 md:grid-cols-1 w-full md:w-9/12">
            {items.map((item) => (
              <Card
                key={item.itemid}
                className="flex overflow-hidden hover:scale-105 transition-all"
              >
                <div className="relative w-32 h-32 ">
                  <img
                    alt={item.itemname}
                    className="object-cover w-full h-full hover:scale-105"
                    src={item.image}
                  />
                </div>
                <div className="flex-1 h-4/5">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {item.itemname}
                        </CardTitle>
                        {item.veg_nonveg && (
                          <Badge
                            variant="secondary"
                            className="mt-1 bg-green-100 text-green-600 hover:bg-orange-100"
                          >
                            Veg
                          </Badge>
                        )}
                        {!item.veg_nonveg && (
                          <Badge
                            variant="secondary"
                            className="mt-1 bg-orange-100 text-orange-600 hover:bg-orange-100"
                          >
                            Non-Veg
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col  h-full">
                        <span className="font-semibold ">
                          ₹ {item.itemprice}
                        </span>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(event) => {
                            const value = Number(
                              (event.target as HTMLInputElement).value
                            );
                            if (value > 0 && value < 20) {
                              setQuantity(value);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-1 mb-2">
                      {/* <div className="flex">
                    {[...Array(5)].map((_, i) => (
                    //   <Star
                    //     key={i}
                    //     className={`w-4 h-4 ${
                    //       i < Math.floor(item.)
                    //         ? "text-yellow-400 fill-yellow-400"
                    //         : "text-gray-300"
                    //     }`}
                    //   />
                    // ))}
                  </div> */}
                      <span className="text-sm text-muted-foreground">
                        Prep time: {item.preparationtime} mins
                      </span>
                    </div>
                    <CardDescription className="text-sm line-clamp-2">
                      {item.itemstatus}
                    </CardDescription>
                    <CardFooter className="w-full flex-1 justify-end">
                      <Button
                        onClick={() => {
                          handleAddToCart(item);
                        }}
                      >
                        Add to cart
                      </Button>
                    </CardFooter>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}
