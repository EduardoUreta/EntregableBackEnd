import express from "express";
import cors from "cors";
import { __dirname } from "./utils.js";
import path from 'path';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { productService } from "./persistence/index.js";

import { productsRouter } from "./routes/products.routes.js";
import { cartRouter} from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";

// Crear puerto donde se ejecuta el servidor
const port = 8080;

// Instanciar Express
const app = express();

// Con esa variable, creo el SV de WebSocket
const httpServer = app.listen(port, () => console.log("Servidor funcionando"));

// Servidor de WebSocket, manejar desde el Back
const io = new Server(httpServer);

// Definir caracteres especiales a través de la ruta (query params)
app.use(express.urlencoded({extended:true}));

// Cors
app.use(cors());

// Configuración de HandleBars
    // Indicar extensión de archivos de las vistas
app.engine('.hbs', engine({extname:'hbs'}))
    // Indicar al SV cual es el motor de plantilla (hbs)
app.set('view engine', '.hbs')
    // Indicar en que carpeta están las views
app.set('views', path.join(__dirname,"/views"));

// MiddleWare para que la carpeta Public sea publica
app.use(express.static(path.join(__dirname,"/public")));

// Rutas

app.use("/products",productsRouter);
app.use("/carts", cartRouter);
app.use(viewsRouter);

// Socket Server

// Enviar Información al Front
io.on("connection", async (socket) => {
    console.log("Cliente Conectado");
    // Enviar información de los productos en tiempo real
    const products = await productService.getProducts();
    socket.emit("productsArray", products);

    // Recibir el producto del socket del cliente
    // Recibir el producto del Form
    socket.on("addProduct", async (productForm) => {
        await productService.addProduct(productForm);
        const products = await productService.getProducts();
        io.emit("productsArray", products);
    });
    
    // Borrar Productos 
    socket.on("deleteProduct", async (idEvent) =>{
        await productService.deleteProduct(idEvent);
        const products = await productService.getProducts();
        io.emit("productsArray", products);
    });
});