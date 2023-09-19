// Ejecutar webSocket desde el Front / cliente
const socketClient = io();

// Elementos
const productList = document.getElementById("productList");

// Capturar elementos del formulario
const createProductForm = document.getElementById("createProductForm");

// Enviar Información del Form al socket del SV
createProductForm.addEventListener("submit", (e) => {
    // Al enviar un Form, por defecto se actualiza la página
    // Con preventDefault se previene
    e.preventDefault();
    // Capturar todos los elementos del Form
    const formData = new FormData(createProductForm);
    const jsonData = {};
    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    };
    jsonData.price = parseInt(jsonData.price)
    jsonData.code = parseInt(jsonData.code)
    jsonData.stock = parseInt(jsonData.stock)

    // Enviar el Objeto con la info del producto
    //  al socket del SV
    socketClient.emit("addProduct", jsonData);
    createProductForm.reset();
});

// Recibir los productos
socketClient.on("productsArray", (dataProducts) => {
    console.log(dataProducts);
    console.log(dataProducts);
    let productsItems = "";
    dataProducts.forEach( product => {
        productsItems +=
        `<ul> 
            <li>Nombre: ${product.title}
            <li>Descripcion: ${product.description}
            <li>ID: ${product.idProduct}
            <button onClick="deleteProduct(${product.idProduct})">Eliminar</button>
        </ul>`
    });
    // El productsItem ya tiene todo el recorrido resuelto
    // Entonces al productList, le ponemos los items
    productList.innerHTML = productsItems;
});

// Enviar el objeto a eliminar al SV
const deleteProduct = (productId) => {
    console.log(productId);
    // socketClient.emit("deleteProduct", productId);
};


