// 8. Devuelve un listado con el código de cliente de aquellos clientes que realizaron algún pago en 2008. Tenga en cuenta que deberá eliminar aquellos códigos de cliente que aparezcan repetidos. Resuelva la consulta:

async function getClientesPagosMayorA2008() {
    const response = await fetch("http://localhost:3000/payments")
    const pagos = await response.json()

    const pagosEn2008 = []

    pagos.forEach(pago => {
        let {code_client, date_payment} = pago
        if(date_payment.split('-')[0] == "2008") {
            if(!pagosEn2008.includes(code_client)) {
                pagosEn2008.push(code_client)
            }
        }
    })

    // const regex = new RegExp("/^2008-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/")

    // const pagosEn2008 = pagos.map(pago => {
    //     if(regex.test(pago.date_delivery)) {
    //         return pago.code_client
    //     }
    // })
    console.log(pagosEn2008);
};

// getClientesPagosMayorA2008()

// 13. Devuelve un listado con todos los pagos que se realizaron en el año 2008 mediante Paypal. Ordene el resultado de mayor a menor.
function pagos2008(pago) {
    let {date_payment} = pago

    const datePayment = new Date(date_payment)
    return datePayment.getFullYear() == 2008 ? true : false
    
}

async function getPagosPaypal() {
    const response = await fetch("http://localhost:3000/payments?payment=PayPal")
    const pagos = await response.json()

    const pagosRealizados = pagos.filter(pago => pagos2008(pago))

    console.log(pagosRealizados);
}

// getPagosPaypal()

// 14. Devuelve un listado con todas las formas de pago que aparecen en la tabla pago. Tenga en cuenta que no deben aparecer formas de pago repetidas.

async function getFormasDePago() {
    const response = await fetch("http://localhost:3000/payments")
    const pagos = await response.json()
    const formasDePago = []

    pagos.forEach(pago => {
        let {payment} = pago

        if(!formasDePago.includes(payment)){
            formasDePago.push(payment)
        }
    })

    console.log(formasDePago);
}

getFormasDePago()