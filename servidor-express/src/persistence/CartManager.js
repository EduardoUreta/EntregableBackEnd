import fs from "fs";

export class CartManager{
    constructor(filePath){
        this.filePath = filePath
    };

    // ¿Existe el archivo?
    fileExist(){
        return fs.existsSync(this.filePath);
    };

    // Métodos Obtener Carritos
    async getCarts() {
        try {
            if(this.fileExist()){
                //leer el archivo
                const contenido = await fs.promises.readFile(this.filePath,"utf-8");

                //transformar JSON a string => JSON.parse(objetoJson)
                const carts = JSON.parse(contenido);

                return carts;
            } else {
                throw new Error("No se pudieron obtener los carritos")
            };
        } catch (error) {
            console.log(error.message);
            throw error;
        };
    };
    
    // Método Crear Carrito
    async createCart() {
        try {
            if(this.fileExist()){
                //leer el archivo
                const contenido = await fs.promises.readFile(this.filePath,"utf-8");

                //transformar JSON a string => JSON.parse(objetoJson)
                const carts = JSON.parse(contenido);

                // Definir ID incremental
                let idCart;
                carts.length === 0 ? idCart = 1 : idCart = carts.length + 1

                // Nuevo carrito
                const newCart = {
                    idCart,
                    products: [],
                };

                // Se agrega al carrito
                carts.push(newCart);

                await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, '\t'));
                return `Se creó un nuevo carrito ${newCart}`;

            } else {
                throw new Error("No se pudo crear el carrito")
            };
        } catch (error) {
            console.log(error.message);
            throw error;
        };
    };

    // Obtener Carrito por ID
    async getCartById(idCart){
        try {
            if(this.fileExist()){
                //leer el archivo
                const contenido = await fs.promises.readFile(this.filePath,"utf-8");

                //transformar JSON a string => JSON.parse(objetoJson)
                const contenidoJsonEnString = JSON.parse(contenido);

                const idExists = contenidoJsonEnString.find((item) => item.idCart === idCart);
                if(idExists){
                    return `${JSON.stringify(idExists, null, 2)}`;
                } else {
                    return `Not Found`;
                };
            };
        } catch (error) {
            console.log(error.message);
            throw error;
        };
    };

    // Agregar Productos al Carrito
    async addProductInCart(cartId, productId) {
        try {
            if (this.fileExist()) {
                // Leer el archivo
                const contenido = await fs.promises.readFile(this.filePath, "utf-8");
    
                // Transformar JSON a objeto
                const carts = JSON.parse(contenido);
    
                // Encontrar el carrito correspondiente por su ID
                const cart = carts.find((item) => item.idCart === cartId);
    
                if (cart) {
                    // Verificar si el producto ya existe en el carrito
                    const existingProduct = cart.products.find((product) => product.idProduct === productId);
    
                    if (existingProduct) {
                        // Incrementar la cantidad del producto
                        existingProduct.quantity += 1;
                        console.log("Se aumentó en 1 la cantidad");
                    } else {
                        // Agregar un nuevo producto al carrito
                        const newProduct = {
                            idProduct: productId,
                            quantity: 1,
                        };
                        cart.products.push(newProduct);
                    }
    
                    // Escribir los cambios en el archivo
                    await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, '\t'));
    
                    return `Se agregó el producto al carrito ${cartId}`;
                } else {
                    return `No se encontró el carrito con el ID ${cartId}`;
                }
            } else {
                throw new Error("No se pudo agregar el producto al carrito");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };
        
};