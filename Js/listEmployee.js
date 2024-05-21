const tbody = document.querySelector("#tbody_table")
const btnAgregar = document.querySelector("#btnAgregar");
const btnOpenDrawer = document.querySelector("#btnOpenDrawer");
const modal= document.querySelector("newEmployee")

let employee;


btnAgregar.addEventListener("click", (event) => {
    /**PreventDefault previene los eventos que vienen por defecto */
    event.preventDefault();
    agregarProducto();
});



  

let listaEmployee = [
    {
        id: Date.now(),
        name: "Miguel",
        identity: 5.0,
        contact: 10,
        
    }
];


function mostrarProductos() {

    //Limpiar la tabla
    tbody.innerHTML = "";
    //Recorro mi lista con foreach
    //Donde producto es el item que se está iterando en el momento
    // y index es el indice de la lista de ese item
     listaEmployee.forEach((employee, index) => {
         /*Desestructurar el objeto que se está recorriendo */
         const { id, name, identity, contact } = employee;
         
         console.log(employee);

        
        

        /**Modificar el HTML del tbody */
       
        tbody.innerHTML += `
            <tr>
            
                <td>${index + 1}</td>
                <td>${name}</td>
                <td>${identity}</td>
                <td>${contact}</td>

                <td>
                <button 
                    class="btn btn-primary edit-product"
                    data-id="${id}"
                >
                    <i class="bx bxs-edit" style="pointer-events: none"></i>
                </button>

                <button
                    class="btn btn-danger delete-product"
                    data-id="${id}"
                >
                    <i class='bx bxs-trash' style="pointer-events: none" ></i>
                </button>
                
                </td>
            </tr>
        `
    }
 );
 }


function agregarProducto() {

   
    /*Selectores los inputs y al mismo tiempo acceder al valor */
    const name = document.querySelector("#nameEmployee").value;
    const identity = document.querySelector("#documentEmployee").value;
    const contact = document.querySelector("#contactEmployee").value;
    
    
    console.log({ name, identity, contact })


    listaEmployee.push({
        id: Date.now(),
        name: name,
        identity: identity,
        contact: contact,
    
    });

    console.log(listaEmployee + "lista///");

}


function cargarDrawer(id) {
    /**Buscar el producto que tiene el id proporcionado en los parametros */
    employee = listaEmployee.find(employee => employee.id == id);

    /*Selectores los inputs y al mismo tiempo acceder al valor */
    document.querySelector("#nameEmployee").value = employee.name;
    document.querySelector("#documentEmployee").value = employee.identity;
    document.querySelector("#contactEmployee").value = employee.contact;
    

    console.log(employee + "aqui");
}

function eliminarProducto(id) {

    listaEmployee = listaEmployee.filter(employee => employee.id != id)
    mostrarProductos();
}

mostrarProductos();