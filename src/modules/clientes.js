async function getClientes() {
    const response = await fetch("http://localhost:3000/clients")
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
    const nombresClientes = clientes.map(({client_name}) => ({client_name}))
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
async function getClientes() {
    const response = await fetch("http://localhost:3000/clients")
    const data = await response.json()

    const infoClientes = []

    data.forEach(cliente => {
        const { client_name, code_employee_sales_manager } = cliente

        infoClientes.push({ client_name, code_employee_sales_manager })
    })
    return infoClientes
}

async function getEmpleados() {
    const response = await fetch(`http://localhost:5501/employee`)
    const empleados = await response.json()
    return empleados
}


async function getClienteYRepesentanteDeVentas() {

    let infoClientes = await getClientes()
    const empleados = await getEmpleados()

    infoClientes.forEach(cliente => {
        let { code_employee_sales_manager } = cliente
        empleados.forEach(empleado => {
            let { id } = empleado
            if (code_employee_sales_manager == id) {
                infoClientes.code_employee_sales_manager = `${empleado["name"]} ${empleado["lastname1"]}`
            }
            console.log(infoClientes);
        })
    })
    // console.log(infoClientes);
}
getClienteYRepesentanteDeVentas()


