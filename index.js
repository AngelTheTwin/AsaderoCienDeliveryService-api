import 'dotenv/config' 
import cors from 'cors'
import express from 'express'
import { routerUsuario } from './routes/user.js'
import { routerProducto } from './routes/producto.js'
import { reouterDireccion } from './routes/direccion.js'
import { routerMetodoPago } from './routes/metodoPago.js'
import { routerCategoria } from './routes/categoria.js'
import { routerPedido } from './routes/pedido.js'

const app = express()

// Set Port
const DEFAULT_PORT = 1806
app.set('port', process.env.PORT || DEFAULT_PORT)

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use(routerUsuario)
app.use(routerProducto)
app.use(reouterDireccion)
app.use(routerMetodoPago)
app.use(routerCategoria)
app.use(routerPedido)

// Default route
app.get('/', (_, res) => {
    res.send('Server ON')
})

// Start Service
let port = app.get('port')
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    console.log(`http://localhost:${port}`)
})