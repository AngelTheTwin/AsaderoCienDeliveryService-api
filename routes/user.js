import express from 'express'
import * as UsuarioDAO from '../dao/UsuarioDAO.js'
import { createToken, ensureAuthenticated } from '../controllers/Authentication.js'

export const routerUsuario = express.Router()

routerUsuario.post('/usuario/login', async (req, res) => {
	const usuario = req.body
	try {
		const loggedUsuario = await UsuarioDAO.login(usuario)
		if (usuario.contraseña != loggedUsuario.contraseña) {
			res.status(401).json({
				mensaje: 'Credenciales Incorrectas',
			})
			return
		}
		res.json({
			...loggedUsuario,
			token: createToken(usuario)
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			error: error
		})
	}
})

routerUsuario.get('/usuario/getall', ensureAuthenticated, async (_, res) => {
	try {
		const usuarios = await UsuarioDAO.getAllUsuarios()
		res.json(usuarios)
	} catch (error) {
		console.error(error)
		res.status(500).json({
			error: error
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
		res.status(500).json({ error })
	}
})

routerUsuario.put('/usuario/update', async (req, res) => {
	const usuario = req.body
	try {
		const mensaje = await UsuarioDAO.updateUsuario(usuario)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error })
	}
})

routerUsuario.delete('/usuario/delete', async (req, res) => {
	const usuario = req.body
	try {
		const mensaje = await UsuarioDAO.deleteUsuario(usuario)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error })
	}
})