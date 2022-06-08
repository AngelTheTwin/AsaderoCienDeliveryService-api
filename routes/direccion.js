import { Router } from 'express'
import { DireccionDAO } from '../dao/DireccionDAO.js'
import { ensureAuthenticated } from '../controllers/Authentication.js'

export const reouterDireccion = Router()

reouterDireccion.get('/direccion/getAllByUsuario', ensureAuthenticated, async (req, res) => {
	const usuario = req.user
	try {
		const direcciones = await DireccionDAO.getAllDireccionesByUsuario(usuario)
		res.json(direcciones)
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})

reouterDireccion.post('/direccion/create', ensureAuthenticated, async (req, res) => {
	const usuario = req.user
	const direccion = req.body
	try {
		const mensaje = await DireccionDAO.createDireccion(usuario, direccion)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})

reouterDireccion.put('/direccion/update', ensureAuthenticated, async (req, res) => {
	const direccion = req.body
	try {
		const mensaje = await DireccionDAO.updateDireccion(direccion)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})

reouterDireccion.delete('/direccion/delete', ensureAuthenticated, async (req, res) => {
	const direccion = req.body
	try {
		const mensaje = await DireccionDAO.deleteDireccion(direccion)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})