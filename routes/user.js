import { Router } from 'express'
import { UsuarioDAO } from '../dao/UsuarioDAO.js'
import { createToken, ensureAuthenticated } from '../controllers/Authentication.js'

export const routerUsuario = Router()

routerUsuario.post('/usuario/login', async (req, res) => {
	const usuario = req.body
	try {
		const loggedUsuario = await UsuarioDAO.login(usuario)
		if (!loggedUsuario) {
			res.status(401).json({
				mensaje: 'Credenciales Incorrectas',
			})
			return
		}
		res.json({
			...loggedUsuario,
			token: createToken(loggedUsuario)
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			error: error.message
		})
	}
})

routerUsuario.get('/usuario/getall', ensureAuthenticated, async (req, res) => {
	try {
		const usuarios = await UsuarioDAO.getAllUsuarios()
		res.json(usuarios)
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerUsuario.post('/usuario/create', async (req, res) => {
	const nuevoUsuario = req.body
	try {
		const mensaje = await UsuarioDAO.createUsuario(nuevoUsuario)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerUsuario.put('/usuario/update', async (req, res) => {
	const usuario = req.body
	try {
		const mensaje = await UsuarioDAO.updateUsuario(usuario)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerUsuario.delete('/usuario/delete', async (req, res) => {
	const usuario = req.body
	try {
		const mensaje = await UsuarioDAO.deleteUsuario(usuario)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})