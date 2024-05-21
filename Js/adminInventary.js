import { get, deleteHttp, post, update } from "./clientHTTP.js";
import { URL_INVENTARY, URL_PRODUCTS } from "./urls.js";
import { printProducts,tableProducts } from "./functions.js";

// Selectores

const formModal = document.querySelector(".btnFormSend")
const btnModalUpd =document.querySelector(".btnFormEditSend")

const nameProduct = document.getElementById("name")
const priceProduct = document.getElementById("price")
const colorProduct = document.getElementById("color")
const sizeProduct = document.getElementById("size")
const stockProduct = document.getElementById("stock")

let totalProducts = 0;
let currentProductPage = 0;
const productsPerPage = 8;

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    
    getProducts()
    const previousButton = document.getElementById('previousButton');
    const nextButton = document.getElementById('nextButton');
    previousButton.addEventListener('click', previousProductPage);
    
    nextButton.addEventListener('click', nextProductPage);
});

// Eventos
formModal.addEventListener("click", async (event) => {
    event.preventDefault();
        await createProduct();
        window.location.reload()
});



// Funciones
async function createProduct() {

    const data = await get(URL_INVENTARY)

    const newProduct = {
        name: nameProduct.value,
        price: priceProduct.value,
        size: sizeProduct.value,
        color: colorProduct.value,
        stock: stockProduct.value,
        inventaryId: data["content"][0].id
    };

    console.log(data["content"][0].id);

    await post(URL_PRODUCTS, newProduct);
}

async function getProducts(){

    const data = await get(URL_INVENTARY)
    totalProducts = data["totalElements"];
    console.log(data);
    const start = currentProductPage * productsPerPage;
    const end = start + productsPerPage;
    const products = data["content"][0]["product"].slice(start, end);
    printProducts(products)
    updateButtons()
}

export async function deleteProduct(id) {
    console.log("Eliminado Id, ", id);
    await deleteHttp(`${URL_PRODUCTS}/${id}`);
}

export async function updateProduct(id) {
    const nameProduct = document.getElementById("nameUpd")
    const priceProduct = document.getElementById("priceUpd")
    const colorProduct = document.getElementById("colorUpd")
    const sizeProduct = document.getElementById("sizeUpd")
    const stockProduct = document.getElementById("stockUpd")

    const productUpdate = {
        name: nameProduct.value,
        price: priceProduct.value,
        color: colorProduct.value,
        size: sizeProduct.value,
        stock: stockProduct.value
    };

    await update(`${URL_CATEGORIES}/${id}`, productUpdate);
}

function nextProductPage() {
    currentProductPage++;
        getProducts().then(() => updateButtons());
}

function previousProductPage() {
    if (currentProductPage > 0) {
        currentProductPage--;
        getProducts().then(() => updateButtons());
    }
}

function updateButtons() {
    const previousButton = document.getElementById('previousButton');
    const nextButton = document.getElementById('nextButton');
    previousButton.disabled = currentProductPage === 0;
    nextButton.disabled = currentProductPage >= Math.ceil(totalProducts / productsPerPage) ;
}