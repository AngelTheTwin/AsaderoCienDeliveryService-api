import { Router } from 'express'
import { ensureAuthenticated } from '../controllers/Authentication.js'
import { MetodoPagoDAO } from '../dao/MetodoPagoDAO.js'

export const routerMetodoPago = Router()

routerMetodoPago.get('/metodoPago/getAllByUsuario', ensureAuthenticated, async (req, res) => {
	const usuario = req.user
	try {
		const metodosPago = await MetodoPagoDAO.getAllByUsuario(usuario)
		res.json(metodosPago)
	} catch (error) {
		console.error(error)
		res.status(500).json({
			error: error.message
		})
	}
})

routerMetodoPago.post('/metodoPago/create', ensureAuthenticated, async (req, res) => {
	const usuario = req.user
	const metodoPago = req.body
	try {
		const mensaje = await MetodoPagoDAO.createMetodoPago(usuario, metodoPago)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			error: error.message
		})
	}
})

routerMetodoPago.put('/metodoPago/update', ensureAuthenticated, async (req, res) => {
	const metodoPago = req.body
	try {
		const mensaje = await MetodoPagoDAO.updateMetodoPago(metodoPago)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			error: error.message
		})
	}
})

routerMetodoPago.delete('/metodoPago/delete', ensureAuthenticated, async (req, res) => {
	const metodoPago = req.body
	try {
		const mensaje = await MetodoPagoDAO.deleteMetodoPago(metodoPago)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			error: error.message
		})
	}
})