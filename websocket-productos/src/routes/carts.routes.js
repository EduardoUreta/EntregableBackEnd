import express, { Router } from "express";
import { cartService } from "../persistence/index.js";
import { productService } from "../persistence/index.js";

export const cartRouter = Router();

// Para recibir información de las peticiones en formato JSON
cartRouter.use(express.json());

// Mostrar los Carritos
cartRouter.get("/", async(req,res)=>{
    try {
        const carts = await cartService.getCarts();
        res.json({data:carts});
    } catch (error) {
        res.json({error:error.message});
    }
});

// Crear Carrito
cartRouter.post("/", async (req, res) => {
    try {
        const cartCreate = await cartService.createCart();
        res.json({data:cartCreate})

    } catch (error) {
        res.json({error:error.message});
    }
});

// Listar los productos según ID de Carrito
cartRouter.get("/:cid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const getCartById = await cartService.getCartById(cartId);

        res.send(getCartById)
    } catch (error) {
        res.json({error:error.message});
    }
});

// Agregar productos al arreglo "products" del carrito seleccionado
// Solo se agrega el ID del producto y el quantify

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        const log = await cartService.addProductInCart(cartId, productId);
        console.log(log);

    } catch (error) {
        res.json({error:error.message});
    }
});