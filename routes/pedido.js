import { Router } from 'express'
import { PedidoDAO } from '../dao/PedidoDAO.js'

export const routerPedido = Router()

routerPedido.get('/getAll', async (_, res) => {
	try {
		const pedidos = await PedidoDAO.getAllPedidos()
		res.json({ pedidos })
	} catch (error) {
		console.error({ error })
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerPedido.post('/create', async (req, res) => {
	const newPedido = req.body
	try {
		const mensaje = await PedidoDAO.createPedido(newPedido)
		res.json({ mensaje })
	} catch (error) {
		console.error(error)
		res.status(500).json({ 
			error: error.message
		})
	}
})

routerPedido.put('/update', async (req, res) => {
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

routerPedido.delete('/delete', async (req, res) => {
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