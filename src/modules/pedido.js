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

// getPeidosPorEstado()

// 9. Devuelve un listado con el código de pedido, código de cliente, fecha esperada y fecha de entrega de los pedidos que no han sido entregados a tiempo.

async function getPedidosSinEntregar() {
    const response = await fetch("http://localhost:3000/requests?status=Pendiente")
    const pedidos = await response.json()
    
    const pedidosPendientes = pedidos.map(pedido => {
        let {code_request, code_client, date_wait, date_request} = pedido

        return {code_request, code_client, date_wait, date_request}
    })

    console.log(pedidosPendientes);
}

// getPedidosSinEntregar()

// 10. Devuelve un listado con el código de pedido, código de cliente, fecha esperada y fecha de entrega de los pedidos cuya fecha de entrega ha sido al menos dos días antes de la fecha esperada.

function obtenerNumeroDias(mes, año) {
    // Creamos un objeto Date con el primer día del mes siguiente
    // Pasamos el mes + 1 para obtener el siguiente mes, y luego el día 0 para retroceder al último día del mes actual
    const ultimoDiaDelMes = new Date(año, mes + 1, 0);
    // Obtenemos el día del mes, que nos da el número de días en el mes
    return ultimoDiaDelMes.getDate();
}

async function getPedidosAntesDeFecha() {
    const response = await fetch("http://localhost:3000/requests?status=Entregado")
    const pedidos = await response.json()

    const pedidosEntregados = []

    pedidos.forEach(pedido => {
        let {code_request, code_client, date_wait, date_request} = pedido

        let dateWait = new Date(date_wait)
        let dateRequest = new Date(date_request)

        if (dateRequest.getMonth() < dateWait.getMonth() ) {

            if ((dateWait.getDate() - dateRequest.getDate() + obtenerNumeroDias(dateRequest.getDate(), dateRequest.getFullYear())) >= 2) {
                pedidosEntregados.push({code_request, code_client, date_wait, date_request})
            }
        }
        if (dateRequest.getMonth() == dateWait.getMonth()) {
            if ((dateWait.getDate() - dateRequest.getDate()) >= 2) {
                pedidosEntregados.push({code_request, code_client, date_wait, date_request})
            }
        }
    })
    console.log(pedidosEntregados);
}

// getPedidosAntesDeFecha()

// 11. Devuelve un listado de todos los pedidos que fueron rechazados en 2009.

function pedidos2009(pedido) {
    let {date_wait} = pedido

    const dateWait = new Date(date_wait)
    return dateWait.getFullYear() == 2009 ? true : false
}


async function getPedidosRechazados2009() {
    const response = await fetch("http://localhost:3000/requests?status=Rechazado")
    const pedidos = await response.json()

    const pedidosRechazados = pedidos.filter(pedido => pedidos2009(pedido))
    console.log(pedidosRechazados);
}

// getPedidosRechazados2009()

// 12. Devuelve un listado de todos los pedidos que han sido entregados en el mes de enero de cualquier año.

function pedidosEnEnero(pedido) {
    let {date_request} = pedido

    const dateRequest = new Date(date_request)
    return dateRequest.getMonth() == 0 ? true : false
}

async function getPedidosEnero() {
    const response = await fetch("http://localhost:3000/requests?status=Entregado")
    const pedidos = await response.json()
    const pedidosEntregados = pedidos.filter(pedido => pedidosEnEnero(pedido))

    console.log(pedidosEntregados);
}

getPedidosEnero()