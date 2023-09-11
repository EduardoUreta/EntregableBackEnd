import express from "express";
import cors from "cors";

import { productsRouter } from "./routes/products.routes.js";
import { cartRouter} from "./routes/carts.routes.js";

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

// Cors
app.use(cors());

// Rutas

app.use("/products",productsRouter);
app.use("/carts", cartRouter);
