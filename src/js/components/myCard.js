import {
    getClientesMadrid,
    getClienteYRepresentanteDeVentasYCiudad,
    getClienteYRepresentanteDeVentas,
    getClientesConPagoYRepresentanteDeVentas,
    getClientesSinPago,
    getClientesConPagoYRepresentanteDeVentasYCiudad,
    getClientesSinPagoYRepresentanteDeVentasYCiudad,
} from "../module/clientes.js";
import {
    getAllEmployNotClients,
    getEmpleadosPorJefe,
    getInfoJefe,
    getEmpleadoByRol,
    getEmpleadoConJefe,
    getEmpleadoConJefes
} from "../module/empleados.js";
import {
    getCiudadYTelefonoPorPais,
    getCodigoYCiudadPorOficina,
    getOficinasConClientesPorCiudad
} from "../module/oficina.js";
import {
    getClientesPagosMayorA2008,
    getFormasDePago,
    getPagosPaypal
} from "../module/pago.js";
import {
    getEstadosDeUnPedido,
    getPedidosAntesDeFecha,
    getPedidosEnero,
    getPedidosPendientes,
    getPedidosRechazados2009
} from "../module/pedido.js";


// STYLES
const styles = /*html*/ `
<style>
    .report__card{
        /* background: red; */
        margin: 10px 0px 0px
    }
    .card__title{
        background: var(--color2);
        color: var(--color8);
        font-family: "Roboto-Bold";
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }
    .card__body{
        background: var(--color8);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 10px 15px 10px;
    }
    .body__marck{
        border: 1px solid var(--color6);
        padding: 10px;
    }
    .card__body b{
        color: var(--color5);
    }
    .card__body p{
        margin: 10px 0;
        color: var(--color6);
    }
    .card__footer{
        background: var(--color2);
        color: var(--color8);
        font-family: "Roboto-Bold";
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }
</style>
`;

export class Mycard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = styles;
    }

    async getClienteYRepresentanteDeVentasYCiudadDesign() {
        let data = await getClienteYRepresentanteDeVentasYCiudad();
        data.forEach((val) => {
            this.shadowRoot.innerHTML += /*html*/ `
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.client_name}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre del empleado: </b>${val.name_employee}</p>
                            <p><b>Ciudad: </b>${val.city}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    async getClientesMadridDesign() {
        let data = await getClientesMadrid();
        data.forEach((val) => {
            let money = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(val.limit_credit);
            this.shadowRoot.innerHTML += /*html*/ `
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.client_name} # ${val.client_code}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Id: </b> ${val.id}</p>
                            <p><b>Codigo del empleado: </b>${
                                val.code_employee_sales_manager
                            }</p>
                            <p><b>Contacto: </b>${val.phone} - ${val.fax}</p>
                            <p><b>Nombre del representante: </b>${
                                val.contact_name
                            } ${val.contact_lastname}</p>
                            <p><b>Dirrecion: </b>${val.address1} ${
                val.address2 ? val.address2 : ""
            }</p>
                            <p><b>Ubicacion: </b>${val.country} ${val.region} ${
                val.city
            } ${val.postal_code}</p>
                            <p><b>Total a prestar: </b>${money}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    async getAllEmployNotClientsDesign() {
        let data = await getAllEmployNotClients();
        data.forEach((val) => {
            this.shadowRoot.innerHTML += /*html*/ `
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.name} ${val.lastname1} ${val.lastname2} # ${val.employee_code}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Id: </b> ${val.id}</p>
                            <p><b>Cargo: </b>${val.position}</p>
                            <p><b>Oficina: </b>${val.code_office}</p>
                            <p><b>Jefe encargado: </b>${val.name_boss}</p>
                            <p><b>Numero de extencion: </b>${val.extension}</p>
                            <p><b>Correo electronico: </b>${val.email}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    async getClienteYgetClienteYRepresentanteDeVentasDesign() {
        const data = await getClienteYRepresentanteDeVentas();
        data.forEach((val) => {
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.client_name}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Nombre del cliente: </b>${val.client_name}</p>
                        <p><b>Representante de ventas: </b>${val.sales_manager}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    async getClientesConPagoYRepresentanteDeVentasDesign() {
        const data = await getClientesConPagoYRepresentanteDeVentas();
        data.forEach((val) => {
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.payment}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Pago: </b>${val.payment}</p>
                        <p><b>Nombre del cliente: </b>${val.client_name}</p>
                        <p><b>Representante de ventas: </b>${val.sales_manager}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    async getClientesSinPagoDesign() {
        const data = await getClientesSinPago();
        data.forEach((val) => {
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.client_name}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Nombre del cliente: </b>${val.client_name}</p>
                        <p><b>Phone: </b>${val.phone}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    async getClientesConPagoYRepresentanteDeVentasYCiudadDesign() {
        const data = await getClientesConPagoYRepresentanteDeVentasYCiudad();
        data.forEach((val) => {
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.client_name}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Pago: </b>${val.client_name}</p>
                        <p><b>Nombre del cliente: </b>${val.client_name}</p>
                        <p><b>Sales manager: </b>${val.sales_manager}</p>
                        <p><b>Oficina manager: </b>${val.ofina}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    async getClientesSinPagoYRepresentanteDeVentasYCiudadDesign() {
        const data = await getClientesSinPagoYRepresentanteDeVentasYCiudad();
        data.forEach((val) => {
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.client_name}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Nombre del cliente: </b>${val.client_name}</p>
                        <p><b>Sales manager: </b>${val.sales_manager}</p>
                        <p><b>Oficina manager: </b>${val.ofina}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    // EMPLEADOS
    async getEmpleadosPorJefeDesign() {
        const data = await getEmpleadosPorJefe(2);
        data.forEach((val) => {
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.code_boss}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Nombre del empleado: </b>${val.name}</p>
                        <p><b>Posicion: </b>${val.position}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    async getInfoJefeDesign() {
        const data = await getInfoJefe();
        data.forEach((val) => {
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.name}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Posicion: </b>${val.position}</p>
                        <p><b>Nombre del jefe: </b>${val.name} ${val.lastname1} ${val.lastname2}</p>
                        <p><b>NEmail: </b>${val.email}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    async getEmpleadoByRolDesign() {
        const data = await getEmpleadoByRol("Representante Ventas", true);
        data.forEach((val) => {
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.position}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Empleado: </b>${val.name} ${val.lastname1} ${val.lastname2}</p>
                        <p><b>Posicion: </b>${val.position}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
 
    async getEmpleadoConJefeDesign() {
        const data = await getEmpleadoConJefe();
        data.forEach((val) => {
            console.log(val);
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.name}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Empleado: </b>${val.name}</p>
                        <p><b>Jefe: </b>${val.boss}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }

    async getEmpleadoConJefesDesign() {
        const data = await getEmpleadoConJefes();
        data.forEach((val) => {
            console.log(val);
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.name}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Empleado: </b>${val.name}</p>
                        <p><b>Jefe 1: </b>${val.jefe_1}</p>
                        <p><b>Jefe 2: </b>${val.jefe_2}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    asyncgetCodigoYCiudadPorOficinaDesign() {
        const data = awaitgetCodigoYCiudadPorOficina();
        data.forEach((val) => {
            console.log(val);
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.city}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Codigo: </b>${val.city}</p>
                        <p><b>Ciudad: </b>${val.code_office}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    async getCiudadYTelefonoPorPaisDesign() {
        const data = await getCiudadYTelefonoPorPais("EEUU");
        data.forEach((val) => {
            console.log(val);
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.city}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Movil: </b>${val.movil}</p>
                        <p><b>Ciudad: </b>${val.city}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
   
    async getOficinasConClientesPorCiudadDesign() {
        const data = await getOficinasConClientesPorCiudad();
        data.forEach((val) => {
            console.log(val);
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>Fuenlabrada</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Address: </b>${val.office_address}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    async getClientesPagosMayorA2008Design() {
        const data = await getClientesPagosMayorA2008();
        data.forEach((val) => {
            console.log(val);
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.code_client}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Date: </b>${val.date_payment}</p>
                        <p><b>Total: </b>${val.total}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    async getFormasDePagoDesign() {
        const data = await getFormasDePago();
        data.forEach((val) => {
            console.log(val);
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.payment}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Date: </b>${val.date_payment}</p>
                        <p><b>Total: </b>${val.total}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    async getPagosPaypalDesign() {
        const data = await getPagosPaypal();
        data.forEach((val) => {
            console.log(val);
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.payment}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Date: </b>${val.date_payment}</p>
                        <p><b>Total: </b>${val.total}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }

    async getEstadosDeUnPedidoDesign() {
        const data = await getEstadosDeUnPedido();
        data.forEach((val) => {
            console.log(val);
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val}</div>
                </div>
            </div>
            `;
        });
    }

    async getPedidosPendientesDesign() {
        const data = await getPedidosPendientes();
        data.forEach((val) => {
            console.log(val);
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.code_request}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Codigo: </b>${val.code_request}</p>
                        <p><b>Codigo cliente: </b>${val.code_client}</p>
                        <p><b>Date wait: </b>${val.date_wait}</p>
                        <p><b>Date rrequest: </b>${val.date_request}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }

    async getPedidosAntesDeFechaDesign() {
        const data = await getPedidosAntesDeFecha();
        data.forEach((val) => {
            console.log(val);
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.code_request}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Codigo: </b>${val.code_request}</p>
                        <p><b>Codigo cliente: </b>${val.code_client}</p>
                        <p><b>Date wait: </b>${val.date_wait}</p>
                        <p><b>Date rrequest: </b>${val.date_request}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }

    async getPedidosRechazados2009Design() {
        const data = await getPedidosRechazados2009();
        data.forEach((val) => {
            console.log(val);
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.code_request}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Codigo: </b>${val.code_request}</p>
                        <p><b>Codigo cliente: </b>${val.code_client}</p>
                        <p><b>Date wait: </b>${val.date_wait}</p>
                        <p><b>Date rrequest: </b>${val.date_request}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
    
    async getPedidosEneroDesign() {
        const data = await getPedidosEnero();
        data.forEach((val) => {
            console.log(val);
            this.shadowRoot.innerHTML += /*html */ `
            <div class="report__card">
                <div class="card__title">
                    <div>${val.code_request}</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                        <p><b>Codigo: </b>${val.code_request}</p>
                        <p><b>Codigo cliente: </b>${val.code_client}</p>
                        <p><b>Date wait: </b>${val.date_wait}</p>
                        <p><b>Date rrequest: </b>${val.date_request}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }

    static get observedAttributes() {
        return ["logic"];
    }

    attributeChangedCallback(name, old, now) {
        if (name == "logic" && now == "client_6")
            this.getClienteYRepresentanteDeVentasYCiudadDesign();
        if (name == "logic" && now == "client_16")
            this.getClientesMadridDesign();
        if (name == "logic" && now == "employ_12")
            this.getAllEmployNotClientsDesign();
        if (name == "logic" && now == "employ_3")
            this.getEmpleadosPorJefeDesign();
        if (name == "logic" && now == "employ_4")
            this.getInfoJefeDesign();
        if (name == "logic" && now == "employ_5")
            this.getEmpleadoByRolDesign();
        if (name == "logic" && now == "office_1")
            this.getCodigoYCiudadPorOficinaDesign();
        if (name == "logic" && now == "office_2")
            this.getCiudadYTelefonoPorPaisDesign();
        if (name == "logic" && now == "payment_8")
            this.getClientesPagosMayorA2008Design();
        if (name == "logic" && now == "payment_13")
            this.getFormasDePagoDesign();
        if (name == "logic" && now == "payment_14")
            this.getPagosPaypalDesign();
        if (name == "logic" && now == "request_7")
            this.getEstadosDeUnPedidoDesign();
        if (name == "logic" && now == "request_9")
            this.getPedidosPendientesDesign();
        if (name == "logic" && now == "request_10")
            this.getPedidosRechazados2009Design();
        if (name == "logic" && now == "request_11")
            this.getPedidosRechazados2009Design();
        if (name == "logic" && now == "request_12")
            this.getPedidosEneroDesign();



        // MULTITABLA
        if (name == "logic" && now == "client_1")
            this.getClienteYgetClienteYRepresentanteDeVentasDesign();
        if (name == "logic" && now == "client_2")
            this.getClientesConPagoYRepresentanteDeVentasDesign();
        if (name == "logic" && now == "client_3")
            this.getClientesSinPagoDesign();
        if (name == "logic" && now == "client_4")
            this.getClientesConPagoYRepresentanteDeVentasYCiudadDesign();
        if (name == "logic" && now == "client_5")
            this.getClientesSinPagoYRepresentanteDeVentasYCiudadDesign();
        if (name == "logic" && now == "employ_8")
            this.getEmpleadoConJefeDesign();
        if (name == "logic" && now == "employ_9")
            this.getEmpleadoConJefesDesign();
        if (name == "logic" && now == "office_6")
            this.getOficinasConClientesPorCiudadDesign();
    }
}
