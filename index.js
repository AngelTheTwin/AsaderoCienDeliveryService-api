const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const cors = require('cors')

const app = express()

// Set Port
const DEFAULT_PORT = 1806
app.set('port', process.env.PORT || DEFAULT_PORT)

// Middleware
app.use(express.json())
app.use(fileUpload())
app.use(cors())

// Routes
const routes = path.join(__dirname, '/routes')
app.use(require(path.join(routes, 'user.js')))

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

