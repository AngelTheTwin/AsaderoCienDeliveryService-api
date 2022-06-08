import { client } from './MongoConnection.js'
import { ObjectId } from 'mongodb'

const getAllPedidos = () => {
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			const pedidos = await client.db().collection('Pedido').find().toArray()
			resolve(pedidos)
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const createPedido = (pedido) => {
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Pedido').insertOne(pedido)
			resolve('Pedido creado con éxito.')
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const updatePedido = (pedido) => {
	const _id = pedido._id
	delete pedido._id

	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Pedido').updateOne({ _id }, {
				$set: { ...pedido }
			})
			resolve('Pedido actualizado con éxito.')
		} catch (error) {
			reject(error)
		}
	})
}

const deletePedido = (pedido) => {
	const _id = pedido._id

	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Pedido').updateOne({ _id }, {
				$set: { estado: 'inactivo' }
			})
			resolve('Pedido eliminado con éxito.')
		} catch (error) {
			reject(error)
		}
	})
}

export const PedidoDAO = {
	getAllPedidos,
	createPedido,
	updatePedido,
	deletePedido,
}