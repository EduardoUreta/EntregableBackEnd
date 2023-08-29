const { log } = require("console");
const fs = require("fs");

const path = require("path");
const rutaArchivo = path.join(__dirname, "productos.json");

class ProductManager{
    constructor(rutaArchivo){
        this.products = []
        this.filePath = rutaArchivo
    };

    // ¿Existe el archivo?
    fileExist(){
        return fs.existsSync(rutaArchivo);
    };

    // Método Agregar Productos
    async addProduct(title, description, price, thumbnail, code, stock){
        try {
            if(this.fileExist()){
                // Leer el archivo JSON
                const contenido = await fs.promises.readFile(rutaArchivo, "utf8");
                // Convertir de JSON a String
                const contenidoJsonEnString = JSON.parse(contenido);

                if(!title || !description || !price || !stock || !thumbnail || !code){
                    // Si no hay titulo, ni descripcion y etc, retorna un mensaje y hasta ahí llega
                    return console.log("Todos los campos son obligatorios")
                } else {
                    // Declarar idEvent y gestionar su valor
                    let idEvent;
                    contenidoJsonEnString.length === 0 ? idEvent = 1 : idEvent = contenidoJsonEnString.length + 1
        
                    // Si se cumple, avanza y evalua si el codigo ya existe en el array products
                    const codeExists = contenidoJsonEnString.find((item) => item.code === code);
                    // Si lo encuentra, finalizará
                    if(codeExists){
                        return console.log(`No se creará el producto "${title}". Ya existe un producto con el código ingresado`);
                    } else {
                        // Como el código no se repite, creará producto
                        const newProduct = {
                            idEvent,
                            title,
                            description,
                            price,
                            thumbnail,
                            code,
                            stock
                    };
                    // Se agrega a Array
                    contenidoJsonEnString.push(newProduct);
                    console.log(`El producto ${newProduct.title} ha sido agregado`);

                    // Transformar de string a JSON
                    await fs.promises.writeFile(rutaArchivo,JSON.stringify(contenidoJsonEnString, null, "\t"));
                    console.log("Producto agregado");
                    };
                };
            };
        } catch (error){
            throw new Error("No es posible guardar el producto")
        };
    };

    // Métodos Obtener Productos
    async getProducts() {
        try {
            if(this.fileExist()){
                //leer el archivo
                const contenido = await fs.promises.readFile(rutaArchivo,"utf-8");

                //transformar JSON a string => JSON.parse(objetoJson)
                const contenidoJsonEnString = JSON.parse(contenido);

                // Nuevo Arreglo
                let newContenidoJson = [];

                // Recorrer array de productos
                contenidoJsonEnString.forEach(product => {
                    const productInfo = {
                        id: product.idEvent,
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        thumbnail: product.thumbnail,
                        code: product.code,
                        stock: product.stock
                    };
                    newContenidoJson.push(productInfo);
                });
                return newContenidoJson;

            } else {
                throw new Error("No es posible leer el archivo")
            };
        } catch (error) {
            console.log(error.message);
            throw error;
        };
    };
    
    
    // Método Obtener Productos Por ID
    async getProductsById(idEvent){
        try {
            if(this.fileExist()){
                //leer el archivo
                const contenido = await fs.promises.readFile(rutaArchivo,"utf-8");

                //transformar JSON a string => JSON.parse(objetoJson)
                const contenidoJsonEnString = JSON.parse(contenido);

                const idExists = contenidoJsonEnString.find((item) => item.idEvent === idEvent);
                if(idExists){
                    return `Ya que ingresaste la ID: ${idEvent}, te muestro el detalle: \n${JSON.stringify(idExists, null, 2)}`;
                } else {
                    return `Not Found`;
                };
            };
        } catch (error) {
            console.log(error.message);
            throw error;
        };
    };

    // Método Actualizar Productos
    async updateProduct(idEvent, title, description, price, thumbnail, code, stock){
        try {
            if(this.fileExist()){
                // Leer el archivo JSON
                const contenido = await fs.promises.readFile(rutaArchivo, "utf8");
                // Convertir de JSON a String
                const contenidoJsonEnString = JSON.parse(contenido);

                if(!title || !description || !price || !stock || !thumbnail || !code){
                    // Si no hay titulo, ni descripcion y etc, retorna un mensaje y hasta ahí llega
                    console.log("Todos los campos son obligatorios");
                } else {        
                    // Evalua si el ID ya existe en el array products
                    const idExists = contenidoJsonEnString.find((item) => item.idEvent === idEvent);
                    // Evalua si el codigo ya existe en el array products
                    const codeExists = contenidoJsonEnString.find((item) => item.code === code);

                    // Si encuentra el ID y el codigo no existe, actualizará el producto
                    if(idExists && !codeExists){
                        const updateProduct = {
                            idEvent,
                            title,
                            description,
                            price,
                            thumbnail,
                            code,
                            stock
                        };
                    // La posición a modificar  
                    contenidoJsonEnString[idExists.idEvent - 1] = updateProduct;
                    console.log(`El producto ${updateProduct.title} ha sido actualizado`);

                    // Transformar de string a JSON
                    await fs.promises.writeFile(rutaArchivo,JSON.stringify(contenidoJsonEnString, null, "\t"));
                    } else {
                        console.log("Lo siento, la ID no existe y/o el código ya existe");
                    };
                };
            };
        } catch (error){
            throw new Error("No es posible actualizar el producto")
        };
    };

    async deleteProduct(idEvent){
        try {
            if(this.fileExist()){
                //leer el archivo
                const contenido = await fs.promises.readFile(rutaArchivo,"utf-8");

                //transformar JSON a string => JSON.parse(objetoJson)
                const contenidoJsonEnString = JSON.parse(contenido);

                const idExists = contenidoJsonEnString.find((item) => item.idEvent === idEvent);
                if(idExists){
                    // Eliminar el producto a través de la ID
                    contenidoJsonEnString.splice(idExists.idEvent - 1, 1);
                    console.log(`El producto ${idEvent} ha sido eliminado`);

                    // Transformar de string a JSON
                    await fs.promises.writeFile(rutaArchivo,JSON.stringify(contenidoJsonEnString, null, "\t"));
                } else {
                    console.log(`No se encuentra la id ${idEvent}`);
                };
            };
        } catch (error) {
            console.log(error.message);
            throw error;
        };
    };

};

const operations = async () => {
    const manager = new ProductManager("./productos.json");

    try {     
        // await manager.addProduct("Telefono", "Celular", 1990, "imagen.com", 700, 5);
        // await manager.addProduct("Libro", "Aventuras", 2990, "imagen.com", 980, 5);
        // await manager.addProduct("Planta", "Carnívora", 2990, "imagen.com", 910, 5);
        // await manager.addProduct("Eliminaré", "Eliminaré", 2990, "eliminare.com", 123456789, 5);

        // console.log("Detalle de Productos: ");
        // console.log(await manager.getProducts());

        // console.log("Detalle de Productos Por ID: ");
        // console.log(await manager.getProductsById(1));

        // console.log("Actualizar Producto: ");
        // await manager.updateProduct(3,"Nueva Planta", "Nueva Carnivora", 1990, "nueva-imagen.com", 910, 5);
        // await manager.updateProduct(3,"Nueva Planta", "Nueva Carnivora", 1990, "nueva-imagen.com", 700, 5);
        // await manager.updateProduct(3,"Nueva Planta", "Nueva Carnivora", 1990, "nueva-imagen.com", 987341, 5);

        // console.log("Eliminar un Producto: ");
        // await manager.deleteProduct(5);
        // await manager.deleteProduct(4);

    } catch (error) {
        console.log(error.message);
    };
};

operations();

