export default function pedidosPorAno(fecha, ano) {
    const dateWait = new Date(fecha)
    return dateWait.getFullYear() == ano ? true : false
}

export default function pedidosPorMes(fecha, mes) {
    const dateRequest = new Date(fecha)
    return (dateRequest.getMonth() + 1) == mes ? true : false
}