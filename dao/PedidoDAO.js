import { client } from './MongoConnection.js'
import { ObjectId } from 'mongodb'

const getAllPedidos = () => {
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			const pedidos = await client.db().collection('Pedido').find({estado: 'En proceso'}).toArray()
			resolve(pedidos)
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const getAllPedidosByUsuario = (usuario) => {
	const _id = usuario._id
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			const pedidos = await client.db().collection('Pedido').find({usuario: _id}).toArray()
			resolve(pedidos)
		} catch(error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const getAllPedidosByRepartidor = (usuario) => {
	const _id = usuario._id
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			const pedidos = await client.db().collection('Pedido').find({repartidor: _id}).toArray()
			resolve(pedidos)
		} catch(error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const createPedido = (usuario, pedido) => {
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Pedido').insertOne({
				...pedido,
				estado: 'En proceso',
				fecha: new Date(), 
				usuario: usuario._id
			})
			resolve('Pedido creado con éxito.')
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const updatePedido = (pedido) => {
	const _id = ObjectId(pedido._id)
	delete pedido._id

	return new Promise(async (resolve, reject) => {
		console.log(pedido)
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
	getAllPedidosByUsuario,
	getAllPedidosByRepartidor,
}