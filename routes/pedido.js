import { Router } from 'express'
import { ensureAuthenticated } from '../controllers/Authentication.js'
import { PedidoDAO } from '../dao/PedidoDAO.js'

export const routerPedido = Router()

routerPedido.get('/pedido/getAll', async (_, res) => {
	try {
		const pedidos = await PedidoDAO.getAllPedidos()
		res.json(pedidos)
	} catch (error) {
		console.error({ error })
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerPedido.get('/pedido/getAllByUsuario', ensureAuthenticated,  async (req, res) => {
	const usuario = req.user
	try {
		const pedidos = await PedidoDAO.getAllPedidosByUsuario(usuario)
		res.json(pedidos)
	} catch (error) {
		console.error({ error })
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerPedido.get('/pedido/getAllByRepartidor', ensureAuthenticated,  async (req, res) => {
	const usuario = req.user
	try {
		const pedidos = await PedidoDAO.getAllPedidosByRepartidor(usuario)
		res.json(pedidos)
	} catch (error) {
		console.error({ error })
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerPedido.post('/pedido/create',ensureAuthenticated, async (req, res) => {
	const usuario = req.user
	const newPedido = req.body
	try {
		const mensaje = await PedidoDAO.createPedido(usuario, newPedido)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerPedido.put('/pedido/update', async (req, res) => {
	const pedido = req.body
	try {
		const mensaje = await PedidoDAO.updatePedido(pedido)
		res.json({ mensaje })
	} catch (error) {
		console.log(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerPedido.delete('/pedido/delete', async (req, res) => {
	const pedido = req.body
	try {
		const mensaje = await PedidoDAO.deletePedido(pedido)
		res.json({ mensaje })
	} catch (error) {
		console.log(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})