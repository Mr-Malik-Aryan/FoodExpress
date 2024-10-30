import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const ChooseOption =()=>{
    return(
        <div className="flex justify-center items-center lg:mr-auto w-full ">
   <Tabs defaultValue="delivery" className= "flex justify-center lg:justify-between md:w-9/12 w-full ">
  <TabsList className="w-full h-fit">
    <TabsTrigger value="dine">
    <div className="flex mr-10  items-center text-center">
    <Avatar className="hidden lg:flex">
    <AvatarImage src="https://b.zmtcdn.com/data/o2_assets/30fa0a844f3ba82073e5f78c65c18b371616149662.png" className="w-14 h-14 bg-blue-200   rounded-full p-2"></AvatarImage>
    </Avatar>
    <p className=" mt-2   ml-4 text-sm  md:text-xl font-bold">Dine</p>
    </div>
    </TabsTrigger>
    <TabsTrigger value="delivery">
    <div className="flex mr-10  h-fit items-center  ">
    <Avatar className="hidden lg:flex">
    <AvatarImage src="https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2ec070a8db694588261616149578.png?output-format=webp" className="w-14 h-14 bg-yellow-200   rounded-full p-2"></AvatarImage>
    </Avatar>
    <p className=" ml-4 text-xl font-bold">Delivery</p>
    </div>
    </TabsTrigger>
       <TabsTrigger value="Book">
   
       <div className="flex items-center   ">
    <Avatar className="hidden lg:flex">
    <AvatarImage src="https://b.zmtcdn.com/data/o2_assets/855687dc64a5e06d737dae45b7f6a13b1616149818.png" className="w-14 h-14 bg-yellow-200   rounded-full p-2"></AvatarImage>
    </Avatar>
    <p className=" mt-2   ml-4 text-xl font-bold">Book</p>
    </div>
    </TabsTrigger>
  </TabsList>
  {/* <TabsContent value="dine" >Make changes to your account here.</TabsContent>
  <TabsContent value="delivery">Change your password here.</TabsContent> */}
</Tabs>

    
 
    </div>
    );

}