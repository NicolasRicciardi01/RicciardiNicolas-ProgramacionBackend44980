class product{
    constructor(nombre, desc, precio, img, codigo, stock){
        this.nombre = nombre;
        this.desc = desc;
        this.precio = precio;
        this.img = img;
        this.codigo = codigo;
        this.stock = stock
    }    
}

class productManager{
    constructor(){
        this.product = new Array();
    }

    addProduct(product) {
        if (this.product.find(element => element.code === product.code)) {
            return console.log("Producto ya esxiste")
        } else {
            this.product.push(product);
            return console.log("Producto agregado")
        }
    }

    getAllProducts() {
        return this.product
    }

    getProductById(id) {
        return this.product.find(element => element.code === id) || "Ese producto noi existe"
    }
}