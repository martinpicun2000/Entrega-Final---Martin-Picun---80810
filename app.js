//Defino el array de producto
//const productos = [{}]


let productos = []

const traerProductos = ()=>{
  try {
    const productosFetch = fetch("./lista.json")
    productosFetch.then((respuesta)=>{
      return respuesta.json()
    }).then(rta=>{
      productos = rta
      mostrarProductosSuperEmePe()
    })
  } catch (error) {
    console.warn("No se cargaron los productos")
  }}

// Obtener objetos de HTML
const listaSuper = document.getElementById("listaSuper")
const listarCarrito = document.getElementById("listaCarritoCompras")
const botonComprar = document.getElementById("btnComprar")
const btnDarkMode = document.getElementById("btnDarkMode")

//Agrego array donde se va a agregar el carrito de compra
let carritoCompra = JSON.parse(localStorage.getItem("carrito")) || []



const calcularTotalCarrito = () => {
    let total = carritoCompra.reduce((total, elemento)=>{
        return total + elemento.precio
    }, 0)
    return total
}

const mostrarTotalCompra = ()=> {
    const divTotal = document.getElementById("totalCompra")
    divTotal.innerText = calcularTotalCarrito()
}

const guardarCarrito = () => {
        const carritoJSON = JSON.stringify(carritoCompra)
    localStorage.setItem("carrito", carritoJSON)
}

const mostrarCarrito = () => {
    listarCarrito.innerHTML = ""
    carritoCompra.forEach(prod=>{
        const li = document.createElement("li")
        li.innerHTML = `${prod.nombre} - $${prod.precio}`
        listarCarrito.appendChild(li)
    })
}

const agregarCarritoCompra = (prod)=>{
    carritoCompra.push(prod)
    mostrarCarrito()
    guardarCarrito()
    mostrarTotalCompra()
}

function mostrarProductosSuperEmePe(){
    listaSuper.innerHTML = ""
    productos.forEach(prod=>{
        const li = document.createElement("li")
        const primerDiv = document.createElement("div")
        const btn = document.createElement("button")
        li.id = prod.prod_id
        primerDiv.innerText = `${prod.nombre} - $${prod.precio}`
        btn.innerText = "Agregar"
        btn.addEventListener("click", ()=>{
            agregarCarritoCompra(prod)
            Toastify({
                text: "Producto agregado al carrito",
                duration: 3000
            }).showToast();
        })

        li.appendChild(primerDiv)
        li.appendChild(btn)
        listaSuper.appendChild(li)
    })
}

const vaciarCarritoCompra = () => {
    carritoCompra = []
    guardarCarrito()
    mostrarCarrito()
    mostrarTotalCompra()
}

const comprar = () => {
    guardarCarrito()
    vaciarCarritoCompra()
    mostrarTotalCompra()
    Swal.fire({
        icon: "success",
        title: "Compra Realizada!",
        text: "Gracias por comprar en Eme Pe!!"
    });
    const agradecimmiento = document.getElementById("Despedida")
    agradecimmiento.innerText = "Gracias por comprar en Eme Pe!"
    agradecimmiento = setTimeout(()=>{
        agradecimmiento.innerText = ""
    }, 3000)
}

botonComprar.onclick = comprar
btnDarkMode.addEventListener("click", ()=>{
            document.body.classList.toggle("darkmode")
        })


//Ejecuto la operacion
traerProductos()
mostrarProductosSuperEmePe()
