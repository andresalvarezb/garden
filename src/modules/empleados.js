async function getEmpleados() {
    const response = (await fetch(`http://localhost:3000/employee`))
    return await response.json()
}

async function getEmpleadoPorCodigo(codigo) {
    const response = (await fetch(`http://localhost:3000/employee?code_boss=${codigo}`))
    return await response.json()
}

async function getEmpleadoPorRol(rol, es=true) {
    let response
    if(!es) {
        response = (await fetch(`http://localhost:3000/employee?position=!${rol}`))
    }
    response = (await fetch(`http://localhost:3000/employee?position=${rol}`))
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