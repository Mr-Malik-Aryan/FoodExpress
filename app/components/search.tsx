import React, { useEffect, useState } from "react";
import { Ghost, Search } from "lucide-react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
const SearchBar =()=>{
    type SearchValType = string |  undefined;
    const [searchVal, setSearchval] =useState<SearchValType>("");
    return(
        <div className="relative ml-auto flex items-center md:grow-0 mr-10">
            <Search className="absolute left-2.5  h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8  md:w-[200px] lg:w-[336px]"
              value={searchVal}
              onChange={(event)=>{setSearchval(event?.target?.value)}}
          />
           <Button variant={"default"} className={` ${searchVal?"absolute":"hidden"}  right-0 h-8 bg-transparent`} onClick={()=>{setSearchval("")}} >
               <X className="h-4 w-4"/>
           </Button>
       
          </div>
    );
}
export default SearchBar;

//${searchVal? "flex":"hidden"} 