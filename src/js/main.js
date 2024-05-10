// import { 
//     getAllOfficesCodeAndCity, 
//     getAllOfficesFromSpainCityAndMovil 
// } from "./module/oficina.js";

// import { 
//     getAllEmployeesWithBossAndCodeSeven,
//     getBossFullNameAndEmail,
//     getAllEmployeesNotSalesReps,
//     getAll3,
//     getAll
// } from "./module/empleados.js";
// import { 
//     getAll2,
//     getClientsEmploy
// } from "./module/clientes.js";

// // console.log(await getAll());

class AppElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.shadowRoot.innerHTML = /* html */`
        <div class="container">
          <h2>Títular del componente</h2>
          <p>Texto y descripción del contenido del componente.</p>
        </div>
      `;
    }
  }
  
  customElements.define("app-element", AppElement);