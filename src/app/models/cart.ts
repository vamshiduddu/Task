
import { product } from "./product";
export class cart{
    public products :product
    public count:number

    constructor(products:product,count:number)
    {
        this.products = products;
        this.count = count
    }

}