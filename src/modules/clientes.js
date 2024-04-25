// 6. Devuelve un listado con el nombre de los todos los clientes españoles.

async function getClientesFromSpain() {
    const response = await fetch("http://localhost:3000/clients?country=Spain")
    const clientes = await response.json()
    
    const nombresClientes = clientes.map(cliente => {
        let {client_name} = cliente
        return {
            client_name
        }
    })

    console.log(nombresClientes);
}

// getClientesFromSpain()

// 16. Devuelve un listado con todos los clientes que sean de la ciudad de Madrid y cuyo representante de ventas tenga el código de empleado 11 o 30.

async function getClientesMadrid(prams) {
    const response1 = await fetch("http://localhost:3000/clients?city=Madrid&code_employee_sales_manager=11")
    const response2 = await fetch("http://localhost:3000/clients?city=Madrid&code_employee_sales_manager=30")
    const clientes1 = await response1.json()
    const clientes2 = await response2.json()
    console.log(...clientes1, ...clientes2);
}

getClientesMadrid()