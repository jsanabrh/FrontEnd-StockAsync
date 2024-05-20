import { get, deleteHttp, post, update } from "./clientHTTP.js";
import { URL_INVENTARY, URL_PRODUCTS } from "./urls.js";
import { printProducts } from "./functions.js";

// Selectores

export const nameCategory = document.getElementById("nameCategory");
export const descriptionCategory = document.getElementById("descriptionCategory");

// Inicialización
document.addEventListener("DOMContentLoaded", () => {

    getProducts()
});

// // Eventos
// formCategories.addEventListener("submit", (event) => {
//     event.preventDefault();

//     if (idCategoryUpdate.value) {
//         // Actualizar
//         updateProduct(idCategoryUpdate.value);
//     } else {
//         createProduct();
//     }
// });

// Funciones
async function createProduct() {
    const newProduct = {
        name: "",
        price: "",
        size: "",
        color: "",
        stock: "",
        inventaryId: ""
    };

    await post(URL_PRODUCTS, newProduct);
}

async function getProducts(){
    const data = get(URL_PRODUCTS)

    printProducts(data)
}

export async function deleteProduct(id) {
    console.log("Eliminado Id, ", id);
    await deleteHttp(`${URL_PRODUCTS}/${id}`);
}

export async function updateProduct(id) {
    const productUpdate = {
        name: nameCategory.value,
        description: descriptionCategory.value
    };

    await update(`${URL_CATEGORIES}/${id}`, productUpdate);
}