class product{

    static id = 0;

    constructor(nombre, desc, precio, img, codigo, stock){
        this.id = ++product.id
        this.nombre = nombre;
        this.desc = desc;
        this.precio = precio;
        this.img = img;
        this.codigo = codigo;
        this.stock = stock
    }    
};

class productManager{
    constructor(){
        this.products = new Array();
    }
    
    getProducts() {
        return this.products;
    }

    addProduct(nombre, desc, precio, img, codigo, stock) {
        let nuevoProduct = new product(nombre, desc, precio, img, codigo, stock)
        if (this.products.find(element => element.codigo === nuevoProduct.codigo)) {
            return console.log("Producto ya existe")
        } else {
            this.products.push(nuevoProduct);
            return console.log("Producto agregado")
        }
    }

    getProductById(id) {
        return this.products.find(element => element.id === id) || "Ese producto no existe"
    }
}
let ProductManager = new productManager();

//test

/* console.log(ProductManager); 
ProductManager.addProduct("joystick", "simulador", "$5000", "sin img", 1020, "20");
ProductManager.addProduct("joystick2", "juego", "$3000", "sin img", 1021, "25");
console.log(ProductManager);
console.log(ProductManager.getProductById(2));
console.log(ProductManager.getProducts());  */