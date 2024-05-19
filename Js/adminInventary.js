import { deleteHttp, post, update } from "../../API/clientHTTP.js"
import { get } from "../../API/clientHTTP.js"
import { URL_INVENTARY,URL_PRODUCTS } from "../../API/URLS.js";
import { idCategoryUpdate, printCategories } from "./functionsDOM.js";

//Selectores

const formCategories = document.getElementById("formCategories");
export const nameCategory = document.getElementById("nameCategory");
export const descriptionCategory = document.getElementById("descriptionCategory");


//Eventos

formCategories.addEventListener("submit", (event)=>{
    event.preventDefault();

    if(idCategoryUpdate.value){
        //Actualizar
        updateProduct(idCategoryUpdate.value);
    }else {
        createProduct();
    }

});

document.addEventListener("DOMContentLoaded", ()=> {
    getProduct();

})

async function createProduct() {

    const newProduct = {
        name:"",
        price:"",
        size:"",
        color:"",
        stock:"",
        inventaryId:""
    };

    post(URL_PRODUCTS, newProduct);
}


async function getProduct() {
   const data = await get(URL_INVENTARY);

   console.log(data);

   printCategories(data);
}

export async function deleteProduct(id) {
    console.log("Eliminado Id, ", id);

    await deleteHttp(`${URL_PRODUCTS}/${id}`);
}

export async function updateProduct(id) {

    const productUpdate = {
        name: nameCategory.value,
        description : descriptionCategory.value
    };

    await update(`${URL_CATEGORIES}/${id}`, categoryUpdate);
}

