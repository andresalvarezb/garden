import {pedidosPorAno} from '../utils/index.js'

export default async function getPagos() {
    const response = await fetch("http://172.16.101.146:5465/payments")
    return await response.json()
};


// 8. Devuelve un listado con el código de cliente de aquellos clientes que realizaron algún pago en 2008. Tenga en cuenta que deberá eliminar aquellos códigos de cliente que aparezcan repetidos. Resuelva la consulta:

export async function getClientesPagosMayorA2008() {
    const pagos = await getPagos()
    const pagosEn2008 = []
    pagos.forEach(pago => {
        let { code_client, date_payment } = pago
        if (date_payment.split('-')[0] == "2008") {
            if (!pagosEn2008.includes(code_client)) {
                pagosEn2008.push(code_client)
            }
        }
    })
    return (pagosEn2008);
};

// getClientesPagosMayorA2008()

// 13. Devuelve un listado con todos los pagos que se realizaron en el año 2008 mediante Paypal. Ordene el resultado de mayor a menor.
export async function getPagosPaypal() {
    const response = await fetch("http://172.16.101.146:5465/payments?payment=PayPal")
    const pagos = await response.json()
    const pagosRealizados = pagos.filter(({date_payment}) => pedidosPorAno(date_payment, 2008))
    return (pagosRealizados);
}

// getPagosPaypal()

// 14. Devuelve un listado con todas las formas de pago que aparecen en la tabla pago. Tenga en cuenta que no deben aparecer formas de pago repetidas.

export async function getFormasDePago() {
    const pagos = await getPagos()
    const formasDePago = []

    pagos.forEach(pago => {
        let { payment } = pago

        if (!formasDePago.includes(payment)) {
            formasDePago.push(payment)
        }
    })

    return (formasDePago);
}

// getFormasDePago()