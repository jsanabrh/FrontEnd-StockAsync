import { get } from "./clientHTTP.js"
import { URL_CLIENTS, URL_INVOICE } from "./urls.js";

//Selectors
const nameClient = document.getElementById('name-client');
const consultButton = document.getElementById('consult-button');

// const tableBody = document.querySelector('.table-description tbody');


//Events
document.addEventListener("DOMContentLoaded", () =>{
    consulInvoiceFunction();
});


//Functions
async function consulInvoiceFunction() {
    consultButton.addEventListener("click", async () => {
        const documentNumber = document.getElementById('document').value;
        console.log(documentNumber);

        try {
            const response = await get(`${URL_CLIENTS}/getByDocumentNumber/${documentNumber}`);
            console.log(response);

            if (response) {
                nameClient.innerHTML = `<h4>Client: ${response.name}</h4>`;
            } else {
                nameClient.innerHTML = `<h4>Client not found</h4>`;
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });
}

