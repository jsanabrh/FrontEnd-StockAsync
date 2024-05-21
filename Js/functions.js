
import { update } from "./clientHTTP.js";
import { URL_PRODUCTS } from "./urls.js";

export const tableProducts = document.getElementById("tableProducts");



export function printProducts(products) {
  tableProducts.innerHTML = "";

  products.forEach((product) => {
    const row = document.createElement("tr");

    row.innerHTML += `<tr>
        <th scope="row">${product.id}</th>
        <td colspan="2">${product.name}</td>
        <td>${product.stock}</td>
        <td>${product.price}</td>
        <td>
          <button type="button" class="btn btn-primary edit-user-btn" data-bs-toggle="modal"
            data-bs-target="#editModal" data-id="${product.id}">
            Edit
        </button>
        </td>
        <td>
          <button type="button" class="btn btn-danger edit-user-btn" data-bs-toggle="modal" data-bs-target="#
            cn" data-id="${product.id}">
            Delete
        </button>
        </td>
      </tr>
      <div
      class="modal fade"
      id="editModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Add product
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="name" class="form-label"
                  >Enter the new name product</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="nameUpd"
                  placeholder="Enter the new name of the product you want to register."
                />
              </div>

              <div class="mb-3">
                <label for="price" class="form-label"
                  >Enter the new price of the product</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="priceUpd"
                  placeholder="Enter the new price of the product you want to register."
                />
              </div>

              <div class="mb-3">
                <label for="color" class="form-label"
                  >Enter the new color of the product</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="colorUpd"
                  placeholder="Enter the new color of the product you want to register."
                />
              </div>

              <div class="mb-3">
                <label for="color" class="form-label"
                  >Enter the new size of the product</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="sizeUpd"
                  placeholder="Enter the new size of the product you want to register."
                />
              </div>

              <div class="mb-3">
                <label for="stock" class="form-label"
                  >Enter the new stock of the product</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="stockUpd"
                  placeholder="Enter the new stock of the product you want to register."
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary btnFormEditSend">Send</button>
          </div>
        </div>
      </div>
    </div>`;

    tableProducts.appendChild(row);

  });
//   let btnModalUpd = document.querySelectorAll(".edit-user-btn")
// let currentDataId = btnModalUpd.getAttribute("data-id")

//   tableProducts.querySelectorAll(".btnFormEditSend").forEach((button) => {
//     button.addEventListener("click", async function () {
//       console.log(currentDataId);
//       updateProduct(currentDataId);
//       // window.location.reload
// });
//   });
}

// export async function updateProduct() {
//     const nameProduct = document.getElementById("nameUpd")
//     const priceProduct = document.getElementById("priceUpd")
//     const colorProduct = document.getElementById("colorUpd")
//     const sizeProduct = document.getElementById("sizeUpd")
//     const stockProduct = document.getElementById("stockUpd")

//     const productUpdate = {
//         name: nameProduct.value,
//         price: priceProduct.value,
//         color: colorProduct.value,
//         size: sizeProduct.value,
//         stock: stockProduct.value
//     };

//     await update(`${URL_PRODUCTS}/${currentDataId}`, productUpdate);
// }