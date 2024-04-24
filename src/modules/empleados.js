// 3. Devuelve un listado con el nombre, apellidos y email de los empleados cuyo jefe tiene un código de jefe igual a 7.

async function getinfoEmpleadoByJefeCode(codeBoss) {
    const response = await fetch(`http://localhost:3000/employee?code_boss=${codeBoss}`)
    const empleados = await response.json()

    const empleadosInfo = empleados.map(empleado => {
        let {name, lastname1, lastname2, email} = empleado
        return {name, lastname1, lastname2, email}
    })
    console.log(empleadosInfo);
}

// getinfoEmpleadoByJefeCode(3)

// 4. Devuelve el nombre del puesto, nombre, apellidos y email del jefe de la empresa.
 
 async function getInfoBoss(codeBoss=null) {
    const response = await fetch(`http://localhost:3000/employee?code_boss=${codeBoss}`)
    const empleados = await response.json()

    const empleadosInfo = empleados.map(empleado => {
        let {position, name, lastname1, lastname2, email} = empleado
        return {position, name, lastname1, lastname2, email}
    })
    console.log(empleadosInfo);
}

// getInfoBoss()

// 5. Devuelve un listado con el nombre, apellidos y puesto de aquellos empleados que no sean representantes de ventas.

async function getEmpleadoByRol(rol, es) {
    // * Preguntar por este ejercicio
    let response;
    if(es) {
        response = await fetch(`http://localhost:3000/employee?position=${rol}`)
    } else {
        response = await fetch(`http://localhost:3000/employee?position=!${rol}`)
    }
    const empleados = await response.json()

    const empleadosInfo = empleados.map(empleado => {
        let {name, lastname1, lastname2, position} = empleado
        return {name, lastname1, lastname2, position}
    })
    console.log(empleadosInfo);
}

getEmpleadoByRol("Representante Ventas")