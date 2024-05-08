async function getEmpleados() {
    const response = await fetch(`http://localhost:5501/employee`)
    return await response.json()
}

async function getEmpleadoPorCodigo(codigo) {
    const response = await fetch(`http://localhost:5501/employee?code_boss=${codigo}`)
    return await response.json()
}

export async function getEmpleadoPorId(id) {
    const response = await fetch(`http://localhost:5501/employee?employee_code=${id}`)
    return await response.json()
}

// console.log(getEmpleadoPorId(1));

async function getEmpleadoPorRol(rol, es=true) {
    let response
    if(!es) {
        response = (await fetch(`http://localhost:5501/employee?position=!${rol}`))
    }
    response = (await fetch(`http://localhost:5501/employee?position=${rol}`))
    return await response.json()
}

// 3. Devuelve un listado con el nombre, apellidos y email de los empleados cuyo jefe tiene un código de jefe igual a 7.

async function getEmpleadosPorJefe(codigoJefe) {
    const response = await fetch(`http://localhost:3000/employee?code_boss=${codigoJefe}`)
    const empleados = await response.json()

    const empleadosInfo = empleados.map(({ name, lastname1, lastname2, email }) => ({ name, lastname1, lastname2, email }))
    console.log(empleadosInfo);
}

// getEmpleadosPorJefe(3)

// 4. Devuelve el nombre del puesto, nombre, apellidos y email del jefe de la empresa.

async function getInfoJefe() {
    const empleados = await getEmpleados()
    const infojefe = empleados.fillter(empleado => empleado.code_boss == null)
    console.log(
        {
            "position": infojefe.position,
            "name": infojefe.name,
            "lastname1": infojefe.lastname1,
            "lastname2": infojefe.lastname2,
            "email": infojefe.email
        }
    );
}

// getInfoJefe()

// 5. Devuelve un listado con el nombre, apellidos y puesto de aquellos empleados que no sean representantes de ventas.

async function getEmpleadoByRol(rol, es) {
    const empleados = await getEmpleadoPorRol(rol, es)
    const empleadosInfo = empleados.map(({name, lastname1, lastname2, position}) => ({ name, lastname1, lastname2, position }))
    console.log(empleadosInfo);
}

// getEmpleadoByRol("Representante Ventas")


// MULTITABLA
// 8. Devuelve un listado con el nombre de los empleados junto con el nombre de sus jefes.

async function getEmpleadoConJefe() {
    const empleados = await getEmpleados()

    const data = await Promise.all(empleados.map(async (empleado) => {
        const jefe = await getEmpleadoPorId(empleado.code_boss)
        // console.log(jefe[0].name)
        return {
            "name": empleado.name,
            // Preguntar como acceder a las propiedades de dicho objeto
            "boss": jefe[0].name
        }
    }))

    console.log(data);
}

// getEmpleadoConJefe()


// 9. Devuelve un listado que muestre el nombre de cada empleados, el nombre de su jefe y el nombre del jefe de sus jefe.
async function getEmpleadoConJefes() {
    const empleados = await getEmpleados()

    const data = await Promise.all(empleados.map(async (empleado) => {
        const jefe = await getEmpleadoPorId(empleado.code_boss)
        const jefeDelJefe = await getEmpleadoPorId(jefe[0].code_boss)
        console.log(jefeDelJefe)
        return {
            "empleado": empleado.name,
            // Preguntar como acceder a las propiedades de dicho objeto
            "jefe_1": jefe[0].name,
            "jefe_2": jefeDelJefe[0].name
        }
    }))

    console.log(data);
}
// getEmpleadoConJefes()

