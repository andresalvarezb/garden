import getEmpleadoPorId from "./empleados.js"
import getPagos from "./pago.js"

async function getClientes() {
    const response = await fetch("http://localhost:3000/clients")
    const clientes = await response.json()
    return clientes
}

async function getClienteById(id) {
    const response = await fetch(`http://localhost:3000/clients?client_code=${id}`)
    const clientes = await response.json()
    return clientes
}

async function getClientesPorPais(pais) {
    const response = await fetch(`http://localhost:3000/clients?country=${pais}`)
    const clientes = await response.json()
    return clientes
}

async function getClientesPorCiudad(ciudad) {
    const response = await fetch(`http://localhost:3000/clients?country=${region}`)
    const clientes = await response.json()
    return clientes
}


// 6. Devuelve un listado con el nombre de los todos los clientes españoles.

async function getClientesDeEspana() {
    const clientes = await getClientesPorPais("Spain")
    const nombresClientes = clientes.map(({ client_name }) => ({ client_name }))
    console.log(nombresClientes);
}

//  getClientesFromSpain()

// 16. Devuelve un listado con todos los clientes que sean de la ciudad de Madrid y cuyo representante de ventas tenga el código de empleado 11 o 30.

async function getClientesMadrid(prams) {
    const response1 = await fetch("http://localhost:3000/clients?city=Madrid&code_employee_sales_manager=11")
    const response2 = await fetch("http://localhost:3000/clients?city=Madrid&code_employee_sales_manager=30")
    const clientes1 = await response1.json()
    const clientes2 = await response2.json()
    console.log(...clientes1, ...clientes2);
}

// getClientesMadrid()

// CONSULTA MULTITABLA

// 1. Obtén un listado con el nombre de cada cliente y el nombre y apellido de su representante de ventas.
async function getClienteYRepresentanteDeVentas() {
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

async function getClientesConPagoYRepresentanteDeVentas() {
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

getClientesConPagoYRepresentanteDeVentas()