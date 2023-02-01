const fs = require('fs');
const fileName = "./productos.json"

class productManager{
    constructor(fileName){
        this.fileName = fileName;
    }
    
    getAllProducts() {
        let products = fs.readFileSync(fileName, fileDataFormatDefault)
        return JSON.parse(products)
    }

    addProduct(obj) {
        if (obj) {

            const productos = this.getAllProducts();

            let nuevaId;

            if (productos.length == 0) {
                nuevaId = 1
            } else {
                const ultId = parseInt(productos[productos.length - 1].id)
                nuevaId = ultId + 1
            }
            if (this.codeExist(obj.code)) {
                return "Ya hay otro objeto con este codigo"
            } else {
                productos.push({ ...obj, id: nuevaId })
                try {
                    fs.writeFileSync(fileName, JSON.stringify(productos), fileDataFormatDefault)
                    return console.log(`Se agrego el producto: ${obj.title} con el ID:${nuevaId}`)
                } catch (error) {
                    throw new Error(`Error al guardar ${error}`)
                }
            }
        } else {
            console.log("Desconocido")
        }
    }

    getProductById(id) {
        if (id > 0) {
            try {

                const objetos = this.getAllProducts()
                let oneProduct = objetos.find(element => element.id === id)

                if (oneProduct) {
                    return oneProduct
                } else {
                    return "Producto no encontrado"
                }

            } catch (error) {
                throw new Error(`Error al bucar: ${error}`)
            }

        } else {
            return "El valor ingresado es inválido"
        }
    }

    delProductById(id){
        if (id > 0) {
            try {
                let prod = this.getProductById(id)
                let objetos = this.getAllProducts()
                if (objetos.length > 0) {
                    if (prod.id) {
                        objetos.splice(this.getProductUbication(objetos, id), 1)
                        fs.writeFileSync(fileName, JSON.stringify(objetos))
                        return `Objeto eliminado`
                    } else {
                        return "El item no existe"
                    }

                } else {
                    return "Lista Vacia"
                }

            } catch (error) {
                console.log("Error al eliminar", error)
            }

        } else {
            return "El valor es inválido"
        }

    }  

    codeExist(code) {
        let allProducts = this.getAllProducts()
        let res = allProducts.find(product => product.code === code)
        if (res) {
            return true
        } else {
            return false
        }
    }
    
    getProductUbication(arry, indx) {
        let index = arry.findIndex(element => element.id === indx)
        return index
    }

    updateProduct(obj, idd) {
        const productos = this.getAllProducts()
        let index = this.getProductUbication(productos, idd)

        if (obj || index > 0) {
            for (let clave in obj) {
                productos[index][clave] = obj[clave]
            }
            try {
                fs.writeFileSync(fileName, JSON.stringify(productos), fileDataFormatDefault)
                return console.log(`Se actualizó el producto con el ID:${productos[index].id}`)
            } catch (error) {
                throw new Error(`Error al guardar: ${error}`)
            }
        } else {
            console.log(`No se encontro el producto con id: ${idd}`)
        }
    }

    deleteAllProducts() {
        try {
            fs.writeFileSync(fileName, '[]')
            return console.log("Todos los productos eliminados exitosamente")
        } catch (error) {
            console.log("Error al eliminar los todos productos", error)
        }
    }
}

let productTest = new ProductManager("productos.txt");