export interface Order {

    userid:string,
    tableIds:string[],
    foodids:string[],
    foodItem:{ [ number: number]: any },
    totalPrice: number;

}
