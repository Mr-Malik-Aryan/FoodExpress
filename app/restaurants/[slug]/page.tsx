'use client';
import { useEffect, useState } from "react";
import { Item } from "@/lib/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
async function Menufetcher(slug: string) {
  const restaurantName = slug.replaceAll('%20', ' ');

  try {
    const response = await fetch(
      `http://localhost:3000/api/getmenu?restaurantName=${encodeURIComponent(restaurantName)}`
    );
    console.log(response);

    if (!response.ok) {
      console.log("Problem fetching menu");
      throw new Error(`${response.status}`);
    }

    const menu = await response.json();
    console.log("Fetched Menu:", menu);
    return menu;

  } catch (error) {
    console.error(`Error fetching menu for: ${restaurantName}`, error);
    return [];
  }
}

export default function RiderComponent({ params }: { params: Promise<{ slug: string }> }) {
  const [items, setItems] = useState<Item[]>([]); // Fix: 'item' -> 'items'
   const [restaurantName,setRestaurantName]=useState<String>();
  const handleFetchItems = async () => {
    const resolvedParams = await params;
    const data = await Menufetcher(resolvedParams.slug);
    setItems(data); // Set the fetched data into state
     setRestaurantName(resolvedParams.slug.replaceAll("%20"," "))
  };
  useEffect(()=>{
    handleFetchItems()
    //console.log("useEffect ran !")
  },[])
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{restaurantName}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Card key={item.itemid} className="flex overflow-hidden">
            <div className="relative w-32 h-32">
              <img
                alt={item.itemname}
                className="object-cover w-full h-full"
                src={item.image}
              />
            </div>
            <div className="flex-1">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{item.itemname}</CardTitle>
                    {item.veg_nonveg && (
                      <Badge variant="secondary" className="mt-1 bg-green-100 text-green-600 hover:bg-orange-100">
                        Veg
                      </Badge>
                    )
                  
                    }
                    {
                        (!item.veg_nonveg )&&(
                          <Badge variant="secondary" className="mt-1 bg-orange-100 text-orange-600 hover:bg-orange-100">
                           Non-Veg
                          </Badge>
                        )
                    }
                  </div>
                  <span className="font-semibold">₹ {item.itemprice}</span>
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
                    {item.preparationtime} mins
                  </span>
                </div>
                <CardDescription className="text-sm line-clamp-2">
                  {item.itemstatus}
                </CardDescription>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
