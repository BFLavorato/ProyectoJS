

const addProducto = () =>{
    Toastify({
        text: "Producto agregado al carrito",
        duration: 1000,
        close: true,
        gravity: "bottom", 
        position: "right",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){}
      }).showToast();
}
const noStock = () =>{
    Toastify({
        text: "Stock no disponible",
        duration: 1000,
        close: true,
        gravity: "bottom", 
        position: "right",
        style: {
          background: "linear-gradient(to right, #dd1818, #333333)",
        },
        onClick: function(){}
      }).showToast();
}
const openCart = () =>{
    Swal.fire({
        title: 'Carrito',
        text:`Producto:
        Cantidad:
        Precio`,
        showDenyButton: true,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Finalizar compra',
        denyButtonText: `Vaciar carrito`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Compra finalizada', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Carrito vaciado', '', 'info')
        }
      })
}

const container = document.getElementById("container")
const carrito = JSON.parse(localStorage.getItem(`carrito`)) ?? []


fetch("./json/productos.json")
.then(response => response.json())
.then(productos => {
    productos.forEach((producto, indice) => {
        container.innerHTML += `
    <div id="producto${indice}" class="card mb-3 producto">
        <h3 class="card-header">${producto.nombre}</h3>
        <div class="card-body">
            <img src="./img/${producto.img}" alt="">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Precio:$${producto.precio}</li>
            <li class="list-group-item">Stock:${producto.stock}</li>
        </ul>
        <button>Añadir al carrito</button>
        </div>
    </div>`
    })
    productos.forEach((producto, indice) =>{
        const cardProducto = document.getElementById(`producto${indice}`)
        cardProducto.children[1].children[2].addEventListener(`click`, () =>{
            if(carrito.find(prod=> prod.id == producto.id)){
                let index = carrito.findIndex((prod => prod.id == producto.id))
                if(carrito[index].cantidad < producto.stock){
                    addProducto ();
                    carrito[index].cantidad++
                }   else {
                    noStock();
                }
            } else {
                const prodCarrito = {id: producto.id, cantidad: 1}
                addProducto ();
                carrito.push(prodCarrito)
            }
            localStorage.setItem(`carrito`, JSON.stringify(carrito))
        })
    })
cart.addEventListener(`click`, ()=>{
    openCart();
})


})