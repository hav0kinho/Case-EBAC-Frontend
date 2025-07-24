import type Cateogry from "./Category";

export default interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: string;
  category: Cateogry;
  active: boolean;
}