import { ProductManager } from "./ProductManager.js";
import { CartManager } from "./CartManager.js";

import { __dirname } from "../utils.js";
import path from "path";

export const productService = new ProductManager(path.join(__dirname,"/files/products.json"));
export const cartService = new CartManager(path.join(__dirname,"/files/carts.json"));
