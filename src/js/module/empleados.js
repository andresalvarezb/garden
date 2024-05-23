import { getClientes, getClienteById } from "./clientes.js";

export async function getEmpleados() {
    const response = await fetch(`http://172.16.101.146:5462/employee`);
    return await response.json();
}

export async function getEmpleadoPorCodigo(codigo) {
    const response = await fetch(
        `http://172.16.101.146:5462/employee?code_boss=${codigo}`,
    );
    return await response.json();
}

export async function getEmpleadoPorId(id) {
    const response = await fetch(
        `http://172.16.101.146:5462/employee?employee_code=${id}`,
    );
    return await response.json();
}

// console.log(getEmpleadoPorId(1));

export async function getEmpleadoPorRol(rol, es = true) {
    let response;
    if (!es) {
        response = await fetch(
            `http://172.16.101.146:5462/employee?position=!${rol}`,
        );
    }
    response = await fetch(`http://172.16.101.146:5462/employee?position=${rol}`);
    return await response.json();
}

// 3. Devuelve un listado con el nombre, apellidos y email de los empleados cuyo jefe tiene un código de jefe igual a 7.

export async function getEmpleadosPorJefe(codigoJefe) {
    const response = await fetch(
        `http://172.16.101.146:5462/employee?code_boss=${codigoJefe}`,
    );
    const empleados = await response.json();

    const empleadosInfo = empleados.map(
        ({ code_boss, name, lastname1, lastname2, email }) => ({
            code_boss,
            name,
            lastname1,
            lastname2,
            email,
        }),
    );
    return empleadosInfo;
}

// getEmpleadosPorJefe(3)

// 4. Devuelve el nombre del puesto, nombre, apellidos y email del jefe de la empresa.

export async function getInfoJefe() {
    const empleados = await getEmpleados();
    const infojefe = empleados.filter(
        (empleado) => empleado.code_boss == null,
    );
    return infojefe.map((jefe) => {
        return {
            position: jefe.position,
            name: jefe.name,
            lastname1: jefe.lastname1,
            lastname2: jefe.lastname2,
            email: jefe.email,
        };
    });
}

// getInfoJefe()

// 5. Devuelve un listado con el nombre, apellidos y puesto de aquellos empleados que no sean representantes de ventas.

export async function getEmpleadoByRol(rol, es) {
    const empleados = await getEmpleadoPorRol(rol, es);
    const empleadosInfo = empleados.map(
        ({ name, lastname1, lastname2, position }) => ({
            name,
            lastname1,
            lastname2,
            position,
        }),
    );
    return empleadosInfo;
}

// getEmpleadoByRol("Representante Ventas")

// MULTITABLA
// 8. Devuelve un listado con el nombre de los empleados junto con el nombre de sus jefes.

export async function getEmpleadoConJefe() {
    const empleados = await getEmpleados();

    const data = await Promise.all(
        empleados.map(async (empleado) => {
            const jefe = await getEmpleadoPorId(empleado.code_boss);
            return {
                'name': empleado.name,
                // Preguntar como acceder a las propiedades de dicho objeto
                'boss': jefe[0].name,
            };
        }),
    );
    // console.log(empleados);
    return data;
}

// getEmpleadoConJefe()

// 9. Devuelve un listado que muestre el nombre de cada empleados, el nombre de su jefe y el nombre del jefe de sus jefe.
export async function getEmpleadoConJefes() {
    const empleados = await getEmpleados();

    const data = await Promise.all(
        empleados.map(async (empleado) => {
            const jefe = await getEmpleadoPorId(empleado.code_boss);
            const jefeDelJefe = await getEmpleadoPorId(jefe[0].code_boss);
            return {
                'empleado': empleado.name,
                // Preguntar como acceder a las propiedades de dicho objeto
                'jefe_1': jefe[0].name,
                'jefe_2': jefeDelJefe[0].name,
            };
        }),
    );

    console.log(data);
}
// getEmpleadoConJefes()

// Consultas multitabla (Composición externa)
// 12. Devuelve un listado con los datos de los empleados que no
// tienen clientes asociados y el nombre de su jefe asociado
// ! Compiado de MIGUEL
export const getAllEmployNotClients = async () => {
    let dataClients = await getClientes();
    let dataEmployees = await getEmpleados();
    let code_employee_sales_manager = [
        ...new Set(dataClients.map((val) => val.code_employee_sales_manager)),
    ];
    let employee_code = dataEmployees.map((val) => val.employee_code);
    let codes = [code_employee_sales_manager, employee_code];
    let code = codes.reduce((resultado, array) =>
        resultado
            .filter((elemento) => !array.includes(elemento))
            .concat(array.filter((elemento) => !resultado.includes(elemento))),
    );
    let employees = [];
    for (let i = 0; i < code.length; i++) {
        let searchingEmployees = async () => await getClienteById(code[i]);
        let [employee] = await searchingEmployees();
        if (!employee.code_boss) {
            let { code_boss, ...employeeUpdate } = employee;
            employeeUpdate.name_boss = employee.name;
            employees.push(employeeUpdate);
            continue;
        }
        let searchedBoss = async () => await getClienteById(employee.code_boss);
        let [boos] = await searchedBoss();
        let { code_boss, ...employeeUpdate } = employee;
        employeeUpdate.name_boss = boos.name;
        employees.push(employeeUpdate);
    }
    return employees;
};
