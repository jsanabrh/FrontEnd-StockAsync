const tableProducts = document.getElementById("tableProducts");

export function printProducts(products) {

    tableProducts.innerHTML = "";

    products.forEach((product) => {
      
      const row = document.createElement("tr");

        row.innerHTML +=
        `<tr>
        <th scope="row">${product.id}</th>
        <td colspan="2">${product.name}</td>
        <td>${product.stock}</td>
        <td>${product.price}</td>
      </tr>`;

      tableProducts.appendChild(row);
    });
}
