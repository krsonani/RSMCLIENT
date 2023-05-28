export interface ManagerFoodCrud {
    fid:number;
    fname:string;
    fimage:string;
    description:string;
    price:Number;
    categoryId : Number;
}

// [
//     {
//       "fid": 1,
//       "fname": "Mango",
//       "fimage": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.medicalnewstoday.com%2Farticles%2F322096&psig=AOvVaw2rzBQfkDE-OwuXa_8lQycJ&ust=1685105045344000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNi0yNC_kP8CFQAAAAAdAAAAABAD",
//       "description": "This is mango.",
//       "price": 1010.1,
//       "category": {
//         "cid": 2,
//         "cname": "Happy"
//       },
//       "available": true
//     }
//   ]