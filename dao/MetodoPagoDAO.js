import { client } from './MongoConnection.js'
import { ObjectId } from 'mongodb'

const getAllByUsuario = (usuario) => {
	const _id = new ObjectId(usuario._id)
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			let { metodosPago } = await client.db().collection('Usuario').findOne({
				_id,
				metodosPago: { $exists: true },
			}, {
				projection: {
					_id: false,
					metodosPago: true
				}
			}) || { metodosPago: [] }
			metodosPago = metodosPago.filter(metodoPago => metodoPago.estado === 'activo')
			resolve(metodosPago)
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const createMetodoPago = (usuario, metodoPago) => {
	const _id = new ObjectId(usuario._id)
	const _idMetodoPago = new ObjectId()

	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Usuario').updateOne({ _id }, {
				$push: {
					metodosPago: {
						$each: [
							{
								...metodoPago,
								_id: _idMetodoPago,
								estado: 'activo'
							}
						], 
						$position: 0
					}
				}
			})
			resolve('Método de Pago agregado con éxito.')
		} catch (error) {
			reject(error)
		} finally {
			client.close()
		}
	})
}

const updateMetodoPago = (metodoPago) => {
	const _id = new ObjectId(metodoPago._id)
	delete metodoPago._id

	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Usuario').updateOne({
				"metodosPago._id": _id,
			}, {
				$set: {
					"metodosPago.$": {
						_id,
						...metodoPago
					}
				}
			})
			resolve('Método de Pago actualizado con éxito.')
		} catch (error) {
			reject(error)
		} finally {
			client.close()
		}
	})
}

const deleteMetodoPago = (metodoPago) => {
	const _id = new ObjectId(metodoPago._id)
	delete metodoPago._id

	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Usuario').updateOne({
				'metodosPago._id': _id,
			}, {
				$set: {
					'metodosPago.$': {
						_id,
						...metodoPago,
						estado: 'inactivo',
					}
				}
			})
			resolve('Método de Pago eliminado con éxito.')
		} catch (error) {
			reject(error)
		} finally {
			client.close()
		}
	})
}

export const MetodoPagoDAO = {
	getAllByUsuario,
	createMetodoPago,
	updateMetodoPago,
	deleteMetodoPago,
}