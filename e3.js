const express = require("express"); //importamos express
const app = express(); //inicializar express
const PORT = 3000;

app.use(express.json())

const productos = [
    { id: 1, nombre: 'Taza de Harry Potter' , precio: 300},
    { id: 2, nombre: 'FIFA 23 PS5' , precio: 1000},
    {  id: 3, nombre: 'Figura Goku Super Saiyan' , precio: 100},
    {  id: 4,  nombre: 'Zelda Breath of the Wild' , precio: 200},
    {  id: 5,  nombre: 'Skin Valorant' , precio: 120},
    {  id: 6, nombre: 'Taza de Star Wars' , precio: 220}
]

app.get("/products",(req,res)=>{
    res.send({
        description: 'Productos',
        items: productos
    }) 
})

// Crear endpoint para poder crear un producto nuevo
app.post("/products",(req,res)=>{
    const newProduct = {
      id: productos.length + 1,
      nombre: req.body.nombre,
      precio: req.body.precio
    }
    productos.push(newProduct)
    res.send(productos)
})

// Crear endpoint para poder actualizar un producto
app.put("/products/id/:id",(req,res)=>{    
    productos.forEach(producto =>{
      if(producto.id == req.params.id) {
        producto.nombre = req.body.nombre
        producto.precio = req.body.precio
      }
    })
    res.send(productos)
})

// Crear endpoint para poder eliminar un producto
app.delete("/products/id/:id",(req,res)=>{
  res.send(productos.filter(producto => producto.id != req.params.id))
})

// Crear filtro por precio de producto
app.get("/products/precio/:precio",(req,res)=>{    
  productos.forEach(producto =>{
    if (producto.precio == req.params.precio) {
      res.send(producto)
    }
  })
})

// Crear filtro que muestre los productos con un precio entre 50 y 250.
app.get("/products/entreprecios", (req, res) => {
  const objProduct = []
  productos.forEach(producto =>{
    if (producto.precio >= 50 && producto.precio <= 250) {
      objProduct.push(producto)
      res.send(objProduct)
    }
  })
})

// Crear un filtro que cuando busque en postman por parámetro el id de un producto me devuelva ese producto
app.get("/products/id/:id",(req,res)=>{    
  productos.forEach(producto =>{
    if (producto.id == req.params.id) {
      res.send(producto)
    }
  })
})

// Crear un filtro que cuando busque en postman por parámetro el nombre de un producto me devuelva ese producto
// const nuevaUrl = "/products/nombre/:nombre".trim()
app.get("/products/nombre/:nombre",(req,res)=>{    
  productos.forEach(producto =>{
    if (producto.nombre == req.params.nombre) {
      res.send(producto)
    }
  })
})

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));