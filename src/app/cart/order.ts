export interface Order {

    userid:string,
    tableIds:string[],
    foodids:string[],
    foodItem:Map<number,number>,
    totalPrice: number;

}
