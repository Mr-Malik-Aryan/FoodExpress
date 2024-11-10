"use client"
import React from "react";
import { UserProfile } from "./userProfile";
import { useEffect, useState } from "react";

import { useRouter } from 'next/navigation'
import { CardHeader } from "@/components/ui/card";
import SearchBar from "./search";
import { FaShoppingCart } from "react-icons/fa";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { Trigger } from "@radix-ui/react-dropdown-menu";
import { count } from "console";
  interface Trigger {
    Trigger: boolean;
}
interface UID {
  uid: string;
}
interface CartData {
  uid: string;
  item_count:number
}


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


export const Navbar=({Trigger}:Trigger)=>{
  const [CartData, setCartData] = useState<CartData[]>([]);
  const [countItems, setCountItems] = useState(0);
  const [quant, setquant] = useState(0);
  const [uid, setUid] = useState<UID>({ uid: "1001" });
  const router = useRouter()
 
  const handleFetchCart = async () => {
    const data = await fetchCartDetails(uid.uid);
    
    setCountItems(data.length); // Sets the count of items
    console.log("Count Items:", countItems);
  
    // Calculate the total quantity sum
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].quantity;
    }
  
    setquant(sum); // Set the total quantity in state
    console.log("Total Quantity:", sum);
  
    setCartData(data); // Update state with fetched cart data
  };
  useEffect (()=>{
    handleFetchCart()
    console.log("got data from cart ")
  },[Trigger])

    return(
        <div className="w-full h-full flex justify-center  ">
        <nav className="  w-11/12  lg:w-10/12 z-40 border-[#da2724] border-b-2  flex items-center justify-center  p-2 h-16  rounded-xl bg-[#f7f8fc]  bg-white/10 backdrop-blur-lg shadow-lg" >
<p className="text-xl lg:text-2xl font-bold w-full ">FoodExpress</p>

<div className="flex w-full justify-end mr-10">

<div className="w-full  hidden lg:flex justify-start  ml-16"  >
     {/* <Menubar className="flex justify-evenly border-0">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
     
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
   */}
</div>
<div className="hidden md:flex">
<SearchBar />  
</div>
<div className="relative flex items-center mr-4">
                        <FaShoppingCart onClick={()=>{router.push(`/cart/${uid.uid}`)}} className=" text-2xl text-gray-600" />
                        {quant > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
                                {quant}
                            </span>
                        )}
                    </div>
<UserProfile />
</div>
        </nav>
        </div>
     );
}
    