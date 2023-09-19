import { Router } from "express";
import { productService } from "../persistence/index.js";

export const viewsRouter = Router();

// Renderizar la ruta con el contenido

// Renderizo con Home.hbs
viewsRouter.get("/", async (req, res) => {
    // Llamar getProducts desde el productService
    const getProducts = await productService.getProducts();
    // Renderizo los productos, y debo mostrarlos en home.hbs
    res.render("home", {products: getProducts});
});

// Renderizo con realTime.hbs
viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTime");
});