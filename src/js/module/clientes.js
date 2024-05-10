import {getEmpleadoPorId} from "./empleados.js"
import { getOficinaPorId } from "./oficina.js"
import getPagos from "./pago.js"

export async function getClientes() {
    const response = await fetch("http://localhost:3000/clients")
    const clientes = await response.json()
    return clientes
}

async function getClienteById(id) {
    const response = await fetch(`http://localhost:3000/clients?client_code=${id}`)
    return await response.json()
}

async function getClientesPorPais(pais) {
    const response = await fetch(`http://localhost:3000/clients?country=${pais}`)
    return await response.json()
}

export async function getClientesPorCiudad(ciudad) {
    const response = await fetch(`http://localhost:3000/clients?city=${ciudad}`)
    return await response.json()
}


// 6. Devuelve un listado con el nombre de los todos los clientes españoles.

async function getClientesDeEspana() {
    const clientes = await getClientesPorPais("Spain")
    const nombresClientes = clientes.map(({ client_name }) => ({ client_name }))
    console.log(nombresClientes);
}

//  getClientesFromSpain()

// 16. Devuelve un listado con todos los clientes que sean de la ciudad de Madrid y cuyo representante de ventas tenga el código de empleado 11 o 30.

export async function getClientesMadrid() {
    const response1 = await fetch("http://localhost:3000/clients?city=Madrid&code_employee_sales_manager=11")
    const response2 = await fetch("http://localhost:3000/clients?city=Madrid&code_employee_sales_manager=30")
    const clientes1 = await response1.json()
    const clientes2 = await response2.json()
    return [...clientes1, ...clientes2]
}

// getClientesMadrid()



// CONSULTA MULTITABLA

// 1. Obtén un listado con el nombre de cada cliente y el nombre y apellido de su representante de ventas.
export async function getClienteYRepresentanteDeVentas() {
    const clientes = await getClientes()
    const clientesInfo = clientes.map(({ client_name, code_employee_sales_manager }) => ({ client_name, code_employee_sales_manager }))

    // obteniendo al representante de ventas
    const data = clientesInfo.map(async ({ client_name, code_employee_sales_manager }) => {
        const representante = (await getEmpleadoPorId(code_employee_sales_manager))

        return {
            client_name,
            "sales_manager": `${representante[0].name} ${representante[0].lastname1}`
        }
    })
    console.log(await Promise.all(data));
}

// getClienteYRepresentanteDeVentas()

// 2. Muestra el nombre de los clientes que hayan realizado pagos junto con el nombre de sus representantes de ventas.

export async function getClientesConPagoYRepresentanteDeVentas() {
    const pagos = await getPagos()
    const codesClient = pagos.map(({ code_client, payment }) => ({ code_client, payment }))
    // console.log(codesClient);

    const data = codesClient.map(async ({ code_client, payment }) => {
        const cliente = await getClienteById(code_client)
        const representante = await getEmpleadoPorId(cliente[0].code_employee_sales_manager)

        return {
            payment,
            "client_name": cliente[0].client_name,
            "sales_manager": `${representante[0].name} ${representante[0].lastname1}`
        }
    })

    console.log(await Promise.all(data));
}

// getClientesConPagoYRepresentanteDeVentas()


// 3. Devuelve un listado que muestre los clientes que no han realizado ningún pago y los que no han realizado ningún pedido.

export async function getClientesSinPago() {
    const pagos = await getPagos()
    const clientes = await getClientes()

    const codeClientesFromPayments = pagos.map(({code_client}) => code_client)
    const clientesSinPago = clientes.filter(({client_code}) => !codeClientesFromPayments.includes(client_code))

    console.log(clientesSinPago);
}

// getClientesSinPago()

// 4. Devuelve el nombre de los clientes que han hecho pagos y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.
export async function getClientesConPagoYRepresentanteDeVentasYCiudad() {
    const pagos = await getPagos()
    const codesClient = pagos.map(({ code_client, payment }) => ({ code_client, payment }))

    const data = codesClient.map(async ({ code_client, payment }) => {
        const cliente = await getClienteById(code_client)
        const representante = await getEmpleadoPorId(cliente[0].code_employee_sales_manager)
        const oficina = await getOficinaPorId(representante[0].code_office)

        return {
            payment,
            "client_name": cliente[0].client_name,
            "sales_manager": `${representante[0].name} ${representante[0].lastname1}`,
            "ofina": oficina[0].city

        }
    })

    console.log(await Promise.all(data));
}
// getClientesConPagoYRepresentanteDeVentasYCiudad()

// 5. Devuelve el nombre de los clientes que no hayan hecho pagos y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.
export async function getClientesSinPagoYRepresentanteDeVentasYCiudad() {
    const pagos = await getPagos()
    const clientes = await getClientes()

    const codeClientesFromPayments = pagos.map(({code_client}) => code_client)
    const clientesSinPago = clientes.filter(({client_code}) => !codeClientesFromPayments.includes(client_code))

    const data = clientesSinPago.map(async ({client_name, code_employee_sales_manager}) => {
        const representante = await getEmpleadoPorId(code_employee_sales_manager)
        const oficina = await getOficinaPorId(representante[0].code_office)
        return {
            client_name,
            "sales_manager": `${representante[0].name} ${representante[0].lastname1}`,
            "ofina": oficina[0].city
        }
    })


    console.log(await Promise.all(data));
}

// getClientesSinPagoYRepresentanteDeVentasYCiudad()


// 7. Devuelve el nombre de los clientes y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.

export async function getClienteYRepresentanteDeVentasYCiudad() {
    const clientes = await getClientes()
    const clientesInfo = clientes.map(({ client_name, code_employee_sales_manager }) => ({ client_name, code_employee_sales_manager }))

    // obteniendo al representante de ventas
    const data = clientesInfo.map(async ({ client_name, code_employee_sales_manager }) => {
        const representante = (await getEmpleadoPorId(code_employee_sales_manager))
        const oficina = await getOficinaPorId(representante[0].code_office)

        return {
            client_name,
            "sales_manager": `${representante[0].name} ${representante[0].lastname1}`,
            "city": oficina[0].city
        }
    })
    console.log('Holaaaaaaaaa');
    console.log(await Promise.all(data));
    return (await Promise.all(data));
}

// getClienteYRepresentanteDeVentasYCiudad()

// 7. Devuelve el nombre de los clientes y el nombre de sus representantes 
// junto con la ciudad de la oficina a la que pertenece el representante.
export const getClientsEmploy = async() =>{
    let res = await fetch("http://localhost:3000/clientes");
    let clients = await res.json();
    for (let i = 0; i < clients.length; i++) {
        let {
            client_code,
            contact_name,
            contact_lastname,
            phone,
            fax,
            address1:address1Client,
            address2:address2Client,
            city,
            region:regionClients,
            country:countryClients,
            postal_code:postal_codeClients,
            limit_credit,
            id:idClients,
            ...clientsUpdate
        } = clients[i];

        let [employ] = await getEmployByCode(clientsUpdate.code_employee_sales_manager)
        let {
            extension,
            email,
            code_boss,
            position,
            id:idEmploy,
            name,
            lastname1,
            lastname2,
            employee_code,
            ...employUpdate
        } = employ
        let [office] = await getOfficesByCode(employUpdate.code_office)

        let {
            country:countryOffice,
            region:regionOffice,
            postal_code:postal_codeOffice,
            movil,
            address1:address1Office,
            address2:address2Office,
            id:idOffice,
            ...officeUpdate
        } = office


        let data = {...clientsUpdate, ...employUpdate, ...officeUpdate};
        let {
            code_employee_sales_manager,
            code_office,
            ...dataUpdate       
        }=data;

        dataUpdate.name_employee = `${name} ${lastname1} ${lastname2}`
        clients[i] = dataUpdate
    }
    // [
    //     {
    //         city: "San Francisco"
    //         client_name : "GoldFish Garden"
    //         name_employee: "Walter Santiago Sanchez Lopez"
    //     }
    // ]
    return clients;
}