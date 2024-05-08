import { getClientesPorCiudad } from "./clientes.js";
import { getEmpleadoPorId } from "./empleados.js";

async function getOficinas() {
    const response = await fetch("http://localhost:5503/offices");
    return await response.json();
}

export async function getOficinaPorId(id) {
    const response = await fetch(`http://localhost:5503/offices?code_office=${id}`);
    return await response.json();
}

async function getOficinasPorPais(pais) {
    const response = await fetch(`http://localhost:5503/offices?country=${pais}`);
    return await response.json();
}

// 1. Devuelve un listado con el código de oficina y la ciudad donde hay oficinas.
async function getCodigoYCiudadPorOficina() {
    const oficinas = await getOficinas();
    const infoOficinas = oficinas.map(({ code_office, city }) => ({ code_office, city }));
    console.log(infoOficinas);
}
// getCodigoYCiudadPorOficina()

// 2. Devuelve un listado con la ciudad y el teléfono de las oficinas de España.
async function getCiudadYTelefonoPorPais(pais) {
    const oficinas = await getOficinasPorPais(pais);
    const infoOficinas = oficinas.map(({ city, movil }) => ({ city, movil }));
    console.log(infoOficinas);
}
// getCiudadYTelefonoPorPais("Francia")



// MULTITABLA
// 6. Lista la dirección de las oficinas que tengan clientes en Fuenlabrada.
async function getOficinasConClientesPorCiudad(ciudad) {
    const clientes = await getClientesPorCiudad(ciudad)
    
    const data = clientes.map(async ({code_employee_sales_manager}) =>{
        const empleado = await getEmpleadoPorId(code_employee_sales_manager)
        const oficina = await getOficinaPorId(empleado[0].code_office)

        return {
            "office_address": oficina[0].address1
        }
    })

    console.log(await Promise.all(data));
}

getOficinasConClientesPorCiudad("Fuenlabrada")