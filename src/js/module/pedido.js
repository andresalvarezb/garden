import {pedidosPorAno, pedidosPorMes} from "../utils/index.js"

async function getPedidos() {
    const response = await fetch("http://172.16.101.146:5464/requests")
    return await response.json()
}

async function getPedidosPorEstado(estado) {
    const response = await fetch(`http://172.16.101.146:5464/requests?status=${estado}`)
    return await response.json()
}

async function getPedidosPorAno(ano) {
    const response = await fetch(`http://172.16.101.146:5464/requests?date_wait=${ano}`)
    return await response.json()
}

// 7. Devuelve un listado con los distintos estados por los que puede pasar un pedido.

export async function getEstadosDeUnPedido() {
    const pedidos = await getPedidos()
    const estados = []
    for (let i = 0; i < pedidos.length; i++) {
        if (!estados.includes(pedidos[i].status)) {
            estados.push(pedidos[i].status)
        }
    }
    return (estados);
}

// getEstadosDeUnPedido()

// 9. Devuelve un listado con el código de pedido, código de cliente, fecha esperada y fecha de entrega de los pedidos que no han sido entregados a tiempo.

export async function getPedidosPendientes() {
    const pedidos = await getPedidosPorEstado("Pendiente")
    const pedidosPendientes = pedidos.map((
        { code_request, code_client, date_wait, date_request }
    ) => (
        { code_request, code_client, date_wait, date_request }
    ))
    return (pedidosPendientes);
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

export async function getPedidosAntesDeFecha() {
    const pedidos = await getPedidosPorEstado("Entregado")

    const pedidosEntregados = []

    pedidos.forEach(({ code_request, code_client, date_wait, date_request }) => {
        let dateWait = new Date(date_wait)
        let dateRequest = new Date(date_request)

        if (dateRequest.getMonth() < dateWait.getMonth()) {

            if ((dateWait.getDate() - dateRequest.getDate() + obtenerNumeroDias(dateRequest.getDate(), dateRequest.getFullYear())) >= 2) {
                pedidosEntregados.push({ code_request, code_client, date_wait, date_request })
            }
        }
        if (dateRequest.getMonth() == dateWait.getMonth()) {
            if ((dateWait.getDate() - dateRequest.getDate()) >= 2) {
                pedidosEntregados.push({ code_request, code_client, date_wait, date_request })
            }
        }
    })
    return (pedidosEntregados);
}

// getPedidosAntesDeFecha()

// 11. Devuelve un listado de todos los pedidos que fueron rechazados en 2009.

export async function getPedidosRechazados2009() {
    const pedidosRechazados = await getPedidosPorEstado("Rechazado")
    const pedidos = pedidosRechazados.filter(({date_wait}) => pedidosPorAno(date_wait, 2009))
    return (pedidos);
}

// getPedidosRechazados2009()

// 12. Devuelve un listado de todos los pedidos que han sido entregados en el mes de enero de cualquier año.

export async function getPedidosEnero() {
    const response = await fetch("http://172.16.101.146:5464/requests?status=Entregado")
    const pedidos = await response.json()
    const pedidosEntregados = pedidos.filter(({date_request}) => pedidosPorMes(date_request, 1))
    return (pedidosEntregados);
}

// getPedidosEnero()