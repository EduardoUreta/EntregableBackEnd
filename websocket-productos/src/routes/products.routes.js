import express, { Router }  from "express";
import { productService } from "../persistence/index.js";
import { uploader } from "../utils.js";

export const productsRouter = Router();

// Para recibir información de las peticiones en formato JSON
productsRouter.use(express.json());

// Mostrar todos los Productos
productsRouter.get("/", async (request, response) => { 
    // Se pone Async, ya que los metodos son asincronos
    try {
        const {limit} = request.query;
        const limitNumber = parseInt(limit);

        const getProducts = await productService.getProducts();

        if(limit){
            const productsLimit = getProducts.slice(0, limitNumber);
            response.send(productsLimit);
        } else {
            response.send(getProducts);
        }
    } catch(error){
        response.send(error.message);
    };
});

// Mostrar Producto Por ID
productsRouter.get("/:pid", async (request, response) => {
    try {
        const productId = parseInt(request.params.pid);
        const getProductsById = await productService.getProductsById(productId);
        
        response.send(getProductsById);
    } catch (error) {
        response.send(error.message);
    }
});

// Agregar Producto
productsRouter.post("/", async (request, response) => {
    try {
        const newProduct = request.body;
        await productService.addProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.thumbnail, newProduct.code, newProduct.stock);
        response.json({"Producto Agregado": newProduct});
    } catch(error) {
        response.send(error.message);
    }
});

// Actualizar Producto
productsRouter.put("/:pid", async (request, response) => {
    try {
        const productId = parseInt(request.params.pid);
        const putProduct = request.body;
        await productService.updateProduct(productId, putProduct.title, putProduct.description, putProduct.price, putProduct.thumbnail, putProduct.code, putProduct.stock)
        response.json({"Producto Actualizado": putProduct});
    } catch(error){
        response.send(error.message);
    }
});

// Eliminar Producto
productsRouter.delete("/:pid", async (request, response) => {
    try {
        const productId = parseInt(request.params.pid);
        await productService.deleteProduct(productId);
    } catch (error) {
        response.send(error.message);
    }
});