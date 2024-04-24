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

