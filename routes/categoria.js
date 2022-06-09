import { Router } from 'express'
import { CategoriaDAO } from '../dao/CategoriaDAO.js'

export const routerCategoria = Router()

routerCategoria.get('/categoria/getAll', async (_, res) => {
	try {
		const categorias = await CategoriaDAO.getAllCategorias()
		res.json(categorias)
	} catch (error) {
		console.error(error)
		res.status(500).json({
			error: error.message
		})
	}
})

routerCategoria.get('/categoria/getAllConProductos', async (_, res) => {
	try {
		const categorias = await CategoriaDAO.getAllCategoriasConProductos()
		res.json(categorias)
	} catch (error) {
		console.error(error)
		res.status(500).json({
			error: error.message
		})
	}
})

routerCategoria.post('/categoria/create', async (req, res) => {
	const categoria = req.body
	try {
		const mensaje = await CategoriaDAO.createCategoria(categoria)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			error: error.message
		})
	}
})