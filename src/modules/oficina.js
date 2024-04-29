async function getOficinas() {
    const response = await fetch("http://localhost:3000/offices");
    return await response.json();
}

async function getOficinasPorPais(pais) {
    const response = await fetch(`http://localhost:3000/offices?country=${pais}`);
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
getCiudadYTelefonoPorPais("Francia")