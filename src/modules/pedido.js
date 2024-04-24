// 7. Devuelve un listado con los distintos estados por los que puede pasar un pedido.

async function getPeidosPorEstado() {
    const response = await fetch("http://localhost:3000/requests")
    const pedidos = await response.json()
    
    const estados = []

    for (let i = 0; i < pedidos.length; i++) {
        if (!estados.includes(pedidos[i].status)) {
            estados.push(pedidos[i].status)
        }
    }
    console.log(estados);
}

getPeidosPorEstado()