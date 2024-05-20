import { get, post } from "./clientHTTP.js"
import { URL_CLIENTS, URL_EMPLOYEES, URL_INVOICE, URL_PRODUCTS } from "./urls.js";

//Selectors
const nameClient = document.getElementById('name-client');
const consultButton = document.getElementById('consult-button-client');
const consultButtonProduct = document.getElementById('consult-button-product');
const tableBody = document.getElementById('tBody');
const totalAmount = document.getElementById('total-amount');
const totalItems = document.getElementById('total-items');
const create = document.getElementById('create');



let clientData = {};
let employeeData = {};
let productList = [];
let totalPrice = 0;
let sumItems = 0;


//Events

document.addEventListener("DOMContentLoaded", () =>{
    consulClient();
    consulEmployee()
    consulProduct();
    createInvoice();
});





//Functions

async function consulEmployee() {
    consultButton.addEventListener("click", async () => {
        const documentNumberEmployee = document.getElementById('documentEmployee').value;
        console.log(documentNumberEmployee);

        try {
            const response = await get(`${URL_EMPLOYEES}/getByDocumentNumber/${documentNumberEmployee}`);

            if (response) {
                employeeData = response;
                console.log(employeeData);
                
            } else {
                employeeData = console.log("Client not found");
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });
}


async function consulClient() {
    consultButton.addEventListener("click", async () => {
        const documentNumber = document.getElementById('document').value;
        console.log(documentNumber);

        try {
            const response = await get(`${URL_CLIENTS}/getByDocumentNumber/${documentNumber}`);
            console.log(response);

            if (response) {
                clientData = response; // Alamcenamos los datos del cliente
                nameClient.innerHTML = `<h4>Client: ${response.name}</h4>`;
            } else {
                nameClient.innerHTML = `<h4>Client not found</h4>`;
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });
}

async function consulProduct() {
    consultButtonProduct.addEventListener("click", async () => {
        const idProduct = document.getElementById('reference').value;
        const quantity = parseInt(document.getElementById('quantityProduct').value);
        console.log(idProduct);
        console.log(quantity);

        try {
            const response = await get(`${URL_PRODUCTS}/${idProduct}`);
            console.log(response);

            if (response && response.name && response.price) {
                const totalPriceProduct = response.price * quantity; 
                totalPrice += totalPriceProduct; 

                sumItems += quantity;


                // Actualiza el DOM con el total acumulado
                totalAmount.innerHTML = `${totalPrice}`;
                totalItems.innerHTML = `${sumItems}`;

                // Agregamos el producto a la lista de productos
                productList.push({
                    product_id: response.id,
                    quantity: quantity,
                    price: response.price
                });

                const row = `<tr>
                                <td colspan="2">${response.name}</td>
                                <td>${quantity}</td>
                                <td>${totalPriceProduct}</td>
                            </tr>`;
                tableBody.innerHTML += row;
            } else {
                console.error('La respuesta no tiene la estructura esperada:', response);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });
}

function createInvoice() {
    create.addEventListener("click", async () => {
       
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);

        const newInvoice = {
            date: formattedDate,
            storeId: employeeData.storeId,
            employeeId: employeeData.id,
            clientId: clientData.id,
            itemList: productList.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        console.log(newInvoice);

        try {
            const response = await post(URL_INVOICE, newInvoice);
            console.log('Invoice created successfully:', response);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });

}


