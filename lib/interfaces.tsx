export interface User {
    uid: number;
    fname: string;
    lname: string;
    uname: string;
    email_address: string;
    phoneNo: string;
    dob: Date;
    address: string;
    age: number;
    image?: string;  // Optional field for image
  }
  export interface Cart {
    uid: number;
    restaurantID: number;
    itemname: string;
    itemsprice: number;
    quantity:number;
  }
  export interface Restaurant {
    restaurantID: number;
    name: string;
    address: string;
    phoneNo: string;
    email_address: string;
    status: boolean;  // True for open, false for closed
    image: string;
    rating:number;
    category:string;
    cpp:number;  // Optional field for image
  }
  export interface Item {
    itemid: number;
    restaurantid: number;
    itemname: string;
    itemprice: number;
    veg_nonveg: boolean;  // True for veg, false for non-veg
    preparationtime: number;  // Time in minutes
    itemstatus: boolean;  // True for available, false for not available
    image: string;  // Optional field for image
  }
  export interface Rider {
    riderid: number;
    fname: string;
    lname: string;
    phoneNo: string;
    email_address: string;
    curr_address: string;
    vehicleNo: string;
    image?: string;  // Optional field for image
  }
  
  export interface Order {
    orderID: number;
    uid: number;
    restaurantID: number;
    itemName: string;
    placedTime: Date;
    edt: Date;  // Estimated delivery time
    riderID: number;
    status: string;  // Status could be 'Pending', 'Delivered', etc.
    image?: string;  // Optional field for image
  }
  