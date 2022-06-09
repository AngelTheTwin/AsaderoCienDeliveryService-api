import { client } from './MongoConnection.js'
import { ObjectId } from 'mongodb'

const getAllProductos = () => {
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			const produtos = await client.db().collection('Producto').find({ estado: 'activo' }).toArray()
			resolve(produtos)
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const getAllProductosGroupedByCategoria = () => {
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			const produtos = await client.db().collection('Producto').aggregate([
				{
					$group: {
						'_id': '$categoria',
						'productos': { $addToSet: '$$ROOT' }
					}
				}
			])
			.toArray()
			resolve(produtos)
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const createProducto = (newProducto) => {
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Producto').insertOne({
				...newProducto,
				estado: 'activo'
			})
			resolve('Producto creado con éxito.')
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const updateProducto = (producto) => {
	const _id = new ObjectId(producto._id)
	delete producto._id

	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Producto').updateOne({ _id }, {
				$set: { ...producto }
			})
			resolve('Producto actualizado con éxito.')
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const deleteProducto = (producto) => {
	const _id = new ObjectId(producto._id)

	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Producto').updateOne({ _id }, {
				$set: { estado: 'inactivo' }
			})
			resolve('Producto eliminado con éxito.')
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

export const ProductoDAO = {
	getAllProductos,
	getAllProductosGroupedByCategoria,
	createProducto,
	updateProducto,
	deleteProducto
}