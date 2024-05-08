// 15. Devuelve un listado con todos los productos que pertenecen a la gama Ornamentales y que tienen más de 100 unidades en stock. El listado deberá estar ordenado por su precio de venta, mostrando en primer lugar los de mayor precio.

async function getOrnamentales() {
    const response = await fetch("http://localhost:5505/products?gama=Ornamentales&stock_gt=100&_sort=price_sale")
    const productos = await response.json()

    console.log(productos.reverse());
}

getOrnamentales()