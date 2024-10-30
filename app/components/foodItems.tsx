import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@radix-ui/react-dropdown-menu";
export const FoodItems =()=>{
    return (
      <div className="w-full flex flex-col items-center">
        <h1 className=" font-sans scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">Eat what makes you <span className="font-sans scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-[#ed203e]"> Happy !</span></h1>
     <div className=" mt-10 fooditems overflow-y-auto flex justify-between w-11/12 lg:w-9/12">
 
<div className="flex flex-col justify-center text-center "><Avatar className=" w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-4 md:mx-0">
  <AvatarImage src="https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png" />
  <AvatarFallback>F.Img</AvatarFallback>
 
</Avatar>
<h3 className="mt-3 scroll-m-20 text:sm md:text:xl lg:text-2xl font-okra-500  tracking-tight">
       Burger
      </h3>
</div>
<div className="flex flex-col justify-center text-center ">
<Avatar className=" w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-4 md:mx-0">
  <AvatarImage src="https://b.zmtcdn.com/data/o2_assets/bf2d0e73add1c206aeeb9fec762438111727708719.png" />
  <AvatarFallback>F.Img</AvatarFallback>
</Avatar>
<h3 className="mt-3 scroll-m-20 text:sm md:text:xl lg:text-2xl font-  tracking-tight">
       Biryani
      </h3>
      </div>
<div className="flex flex-col justify-center text-center ">
<Avatar className=" w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-4 md:mx-0">
  <AvatarImage src="https://b.zmtcdn.com/data/o2_assets/4c7697178c268c50e1b1641fca205c231634401116.png" />
  <AvatarFallback>F.Img</AvatarFallback>
</Avatar>

<h3 className="mt-3 scroll-m-20 text:sm md:text:xl lg:text-2xl font-  tracking-tight">
       Ice Cream
      </h3>
      </div>
      <div className="flex flex-col justify-center text-center ">
<Avatar className=" w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-4 md:mx-0">
  <AvatarImage src="https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png" />
  <AvatarFallback>F.Img</AvatarFallback>
</Avatar>
<h3 className="mt-3 scroll-m-20 text:sm md:text:xl lg:text-2xl font-  tracking-tight">
      Pizza
      </h3>
      </div>
      <div className="flex flex-col justify-center text-center ">
<Avatar className=" w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-4 md:mx-0">
  <AvatarImage src="https://b.zmtcdn.com/data/dish_images/91c554bcbbab049353a8808fc970e3b31615960315.png" />
  <AvatarFallback>F.Img</AvatarFallback>
</Avatar>
<h3 className="mt-3 scroll-m-20 text:sm md:text:xl lg:text-2xl font-  tracking-tight">
       Noodles
      </h3>
      </div>
      <div className="flex flex-col justify-center text-center ">
<Avatar className=" w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-4 md:mx-0">
  <AvatarImage src="https://b.zmtcdn.com/data/o2_assets/2f34540e0b12058f5f8b9390c3a3fb4a1648972281.png" />
  <AvatarFallback>F.Img</AvatarFallback>
</Avatar>
<h3 className="mt-3 scroll-m-20 text:sm md:text:xl lg:text-2xl font-  tracking-tight">
       Shawarma
      </h3>
      </div>
     </div>
     </div>
    );
}
