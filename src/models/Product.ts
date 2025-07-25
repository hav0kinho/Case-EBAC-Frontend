import type Category from "./Category";

export default interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: string;
  category: Category;
  active: boolean;
}