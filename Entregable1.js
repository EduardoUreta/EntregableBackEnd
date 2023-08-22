class ProductManager{
    constructor(){
        this.products = []
    };

    // Método Agregar Productos
    addProduct(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !stock || !thumbnail || !code){
                // Si no hay titulo, ni descripcion y etc, retorna un mensaje y hasta ahí llega
            return console.log("Todos los campos son obligatorios")
        } else {
            // Declarar idEvent y gestionar su valor
            let idEvent;
            this.products.length === 0 ? idEvent = 1 : idEvent = this.products.length + 1

            // Si se cumple, avanza y evalua si el codigo ya existe en el array products
            const codeExists = this.products.find((item) => item.code === code);
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
            }
            // Se agrega a Array
            this.products.push(newProduct);
            console.log(`El producto ${newProduct.title} ha sido agregado`);
            }
        }
    }

    // Métodos Obtener Productos
    getProducts(){
        const products = this.products;
        products.forEach(product => {
            console.log(`ID: ${product.idEvent}`);
            console.log(`Title: ${product.title}`);
            console.log(`Description: ${product.description}`);
            console.log(`Price: ${product.price}`);
            console.log(`Img: ${product.thumbnail}`);
            console.log(`Code: ${product.code}`);
            console.log(`Stock: ${product.stock}`);
            console.log("-------------------------");
        })
    }
    
    // Método Obtener Productos Por ID
    getProductsById(idEvent){
        const idExists = this.products.find((item) => item.idEvent === idEvent)
        if(idExists){
            return `Ya que ingresaste la ID: ${idEvent}, te muestro el detalle: \n${JSON.stringify(idExists, null, 2)}`;
        } else {
            return `Not Found`;
        }
    }
}

const manager = new ProductManager();

// Agregar productos
manager.addProduct("Telefono", "Celular", 1990, "imagen.com", 700, 5);
manager.addProduct("Libro", "Aventuras", 2990, "imagen.com", 980, 5);
manager.addProduct("Planta", "Carnívora", 2990, "imagen.com", 910, 5);
console.log(manager);

// Obtener los productos 
    // manager.getProducts();

// ID que existe
    console.log(manager.getProductsById(2));

//  ID Que no existe
    // console.log(manager.getProductsById(6));

