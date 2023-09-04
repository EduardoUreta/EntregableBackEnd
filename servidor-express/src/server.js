import express from "express";
import { ProductManager } from "./persistence/ProductManager.js";
import cors from "cors";

// Crear puerto donde se ejecuta el servidor
const port = 8080;

// Instanciar Express
const app = express();

// Poner a escuchar el servidor en el puerto
app.listen(port, () => {
    console.log("Servidor funcionando");    
});

// Definir caracteres especiales a través de la ruta (query params)
app.use(express.urlencoded({extended:true}));

// Instanciar ProductManager
const managerProductService = new ProductManager("../Entregable1/servidor-express/src/files/products.json");
console.log(managerProductService);

// Cors
app.use(cors());

// Rutas

// request.query
app.get("/products", async (request, response) => { 
    // Se pone Async, ya que los metodos son asincronos
    try {
        const {limit} = request.query;
        const limitNumber = parseInt(limit);

        const getProducts = await managerProductService.getProducts();

        if(limit){
            const productsLimit = getProducts.slice(0, limitNumber);
            response.send(productsLimit)
        } else {
            response.send(getProducts);
        }
    } catch(error){
        response.send(error.message);
    };
});

// request.params
app.get("/products/:productsId", async (request, response) => {
    try {
        const productsId = parseInt(request.params.productsId);
        const getProductsById = await managerProductService.getProductsById(productsId);
        
        response.send(getProductsById);
    } catch (error) {
        response.send(error.message);
    }
});
