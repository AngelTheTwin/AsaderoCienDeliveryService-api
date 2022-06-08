import { Router } from 'express'
import { ProductoDAO } from '../dao/ProductoDAO.js'

export const routerProducto = Router()

routerProducto.get('/producto/getAll', async (_, res) => {
	try {
		const productos = await ProductoDAO.getAllProductos()
		res.json(productos)
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerProducto.get('/producto/getAllGroupedByCategoria', async (_, res) => {
	try {
		const productos = await ProductoDAO.getAllProductosGroupedByCategoria()
		res.json(productos)
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerProducto.post('/producto/create', async (req, res) => {
	const newProducto = req.body
	try {
		const mensaje = await ProductoDAO.createProducto(newProducto)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerProducto.put('/producto/update', async (req, res) => {
	const producto = req.body
	try {
		const mensaje = await ProductoDAO.updateProducto(producto)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerProducto.delete('/producto/delete', async (req, res) => {
	const producto = req.body
	try {
		const mensaje = await ProductoDAO.deleteProducto(producto)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})