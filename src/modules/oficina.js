// 1. Devuelve un listado con el código de oficina y la ciudad donde hay oficinas.

export default async function getOfficeCodeAndCities() {
    const response = await fetch("http://localhost:3000/offices");
    const oficinas = await response.json();

    const infoOficinas = oficinas.map(oficina => {
        let { code_office, city } = oficina
        return { code_office, city }
    });

    console.log(infoOficinas);
}

// getOfficeCodeAndCities()

// 2. Devuelve un listado con la ciudad y el teléfono de las oficinas de España.

async function getOfficeCitiAndPhone() {
    const response = await fetch("http://localhost:3000/offices");
    const oficinas = await response.json();

    const oficinasEspana = oficinas.filter(oficina => oficina.country == "España")
    const infoOficinas = oficinasEspana.map(oficina => {
        let { city, movil } = oficina
        return { city, movil }
    });

    console.log(infoOficinas);
}

getOfficeCitiAndPhone()