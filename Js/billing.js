import { get, post, update } from "./clientHTTP.js"
import { URL_CLIENTS, URL_EMPLOYEES, URL_INVOICE, URL_PRODUCTS } from "./urls.js";

//Selectors
const nameClient = document.getElementById('name-client');
const consultButton = document.getElementById('consult-button-client');
const consultButtonProduct = document.getElementById('consult-button-product');
const tableBody = document.getElementById('tBody');
const totalAmount = document.getElementById('total-amount');
const totalItems = document.getElementById('total-items');
const create = document.getElementById('create');
const nameClientUpdate = document.getElementById('nameClientUpdate');
const emailClientUpdate = document.getElementById('emailClientUpdate');
const phoneClientUpdate = document.getElementById('phoneClientUpdate');
const put = document.getElementById('put');
const editClientModal = document.getElementById('editClient');
const cancelButton = document.getElementById('cancel-button');


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
    updateClientData()
    updateClient();
});



cancelButton.addEventListener('click', () => {
    resetInvoiceForm();
});




//Functions

async function consulEmployee() {
    consultButton.addEventListener("click", async () => {
        const documentNumberEmployee = document.getElementById('documentEmployee').value;

        try {
            const response = await get(`${URL_EMPLOYEES}/getByDocumentNumber/${documentNumberEmployee}`);

            if (response) {
                employeeData = response;
                
            } else {
                employeeData = console.log("Employee not found");
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });
}

async function consulClient() {
    consultButton.addEventListener("click", async () => {
        const documentNumber = document.getElementById('document').value;

        try {
            const response = await get(`${URL_CLIENTS}/getByDocumentNumber/${documentNumber}`);

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

        try {
            const response = await get(`${URL_PRODUCTS}/${idProduct}`);

            
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

function updateClientData() {

    editClientModal.addEventListener('show.bs.modal', () => {


        if (clientData) {
            nameClientUpdate.value = clientData.name || '';
            emailClientUpdate.value = clientData.email || '';
            phoneClientUpdate.value = clientData.phoneNumber || '';
        }
    });

}

async function updateClient() {

    put.addEventListener("click", async () => {

        const newClient = {
            id: clientData.id,
            name: nameClientUpdate.value,
            email: emailClientUpdate.value,
            phoneNumber: phoneClientUpdate.value,
            documentType: clientData.documentType,
            documentNumber: clientData.documentNumber
        }
    
        try {
            const response = await update(`${URL_CLIENTS}/${clientData.id}`, newClient);
            console.log('Client updated successfully:', response);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }

    })
    

}

// function createInvoice() {
//     create.addEventListener("click", async (event) => {
//         event.preventDefault();
       
//         const today = new Date();
//         const year = today.getFullYear();
//         const month = String(today.getMonth() + 1).padStart(2, '0');
//         const day = String(today.getDate()).padStart(2, '0');
//         const formattedDate = `${year}-${month}-${day}`;

//         const newInvoice = {
//             date: formattedDate,
//             storeId: employeeData.store.id,
//             employeeId: employeeData.id,
//             clientId: clientData.id,
//             itemList: productList.map(item => ({
//                 product_id: item.product_id,
//                 quantity: item.quantity,
//                 price: item.price
//             }))
//         };

//         try {
//             const response = await post(URL_INVOICE, newInvoice);
//             console.log('Invoice created successfully:', response);

//             // Actualiza el DOM con los datos de la factura
//             document.getElementById("nameStore").textContent = response.storeName || 'Store not found';
//             document.getElementById("nameClient").textContent = response.clientName || 'Client not found';
//             document.getElementById("dateInvoice").textContent = formattedDate;
//             document.getElementById("nameEmployee").textContent = response.employeeName || 'Employee not found';
//             document.getElementById("totalPurchasesInvoice").textContent = totalPrice.toFixed(2);

//             // Actualiza el DOM con la lista de productos
//             const items = document.getElementById("items");
//             items.innerHTML = ''; // Limpia la lista de items

//             productList.forEach(item => {
//                 const row = `<tr>
//                                 <td>${item.product_id}</td>
//                                 <td>${item.quantity}</td>
//                                 <td>${item.price.toFixed(2)}</td>
//                                 <td>${(item.quantity * item.price).toFixed(2)}</td>
//                             </tr>`;
//                 items.innerHTML += row;
//             });

//             // Resetea el formulario de la factura
//             resetInvoiceForm();

//         } catch (error) {
//             console.error('There was a problem with the fetch operation:', error);
//         }
//     });
// }



function createInvoice() {
    create.addEventListener("click", async (event) => {

        event.preventDefault();
       
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const newInvoice = {
            date: formattedDate,
            storeId: employeeData.store.id,
            employeeId: employeeData.id,
            clientId: clientData.id,
            itemList: productList.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            }))
        };


        try {
            const response = await post(URL_INVOICE, newInvoice);
            console.log('Invoice created successfully:', response);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }

        
    
    });


}

function resetInvoiceForm() {
    // Limpiar los campos del formulario del cliente y empleado
    document.getElementById('document').value = '';
    document.getElementById('documentEmployee').value = '';
    nameClient.innerHTML = 'Client';
    
    // Limpiar los campos del formulario del producto
    document.getElementById('reference').value = '';
    document.getElementById('quantityProduct').value = '';
    tableBody.innerHTML = '';

    // Restablecer los totales
    totalAmount.innerHTML = '00,00';
    totalItems.innerHTML = '0';

    // Restablecer las variables globales
    clientData = {};
    employeeData = {};
    productList = [];
    totalPrice = 0;
    sumItems = 0;
}



