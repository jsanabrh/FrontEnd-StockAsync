import { deleteNew } from "./index.js";

const btnOpenModalNews = document.getElementById("btnOpenModalNews");

export function printNews(news) {

    news.forEach((tempNew) => {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        const tdContent = document.createElement("td");
        const tdQuantity = document.createElement("td");
        const tdPrice = document.createElement("td");

        const btnEdit = document.createElement("button");
        const btnDelete = document.createElement("button");

        btnDelete.classList.add("btn", "btn-danger");
        btnEdit.classList.add("btn", "btn-primary");

        btnEdit.textContent = "Edit";
        btnDelete.textContent = "Delete";

        btnEdit.addEventListener("click", ()=> {
            loadInfoNew(tempNew)
        });

        btnDelete.addEventListener("click", ()=> {
            deleteNew(tempNew.id)

        });

        tdId.textContent = tempNew.name;
        tdContent.textContent = tempNew.content;
        tdQuantity.textContent = tempNew.publicationDate;
        tdPrice.textContent = tempNew.user.name;

        tdActions.appendChild(btnEdit);
        tdActions.appendChild(btnDelete);

        tr.appendChild(tdId);
        tr.appendChild(tdContent);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdPrice);


        newsTbody.appendChild(tr);

    });
}
