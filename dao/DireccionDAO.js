import { client } from './MongoConnection.js'
import { ObjectId } from 'mongodb'

const getAllDireccionesByUsuario = (usuario) => {
	const _id = new ObjectId(usuario._id)

	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			let { direcciones } = await client.db().collection('Usuario').findOne({
				_id,
				direcciones: { $exists: true },
			}, {
				projection: {
					_id: false,
					direcciones: true
				}
			}) || { direcciones: [] }
			direcciones = direcciones.filter(direccion => direccion.estado === 'activo')
			resolve(direcciones)
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const createDireccion = (usuario, direccion) => {
	const _id = new ObjectId(usuario._id)
	delete direccion.isNuevaDireccion

	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Usuario').updateOne({ _id }, {
				$push: {
					direcciones: {
						...direccion,
						_id: new ObjectId(),
						estado: 'activo',
					}
				}
			})
			resolve('Dirección agregada con éxito.')
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const updateDireccion = (direccion) => {
	const _id = new ObjectId(direccion._id)
	delete direccion._id

	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Usuario').updateOne({
				"direcciones._id": _id
			}, {
				$set: {
					"direcciones.$": {
						_id,
						...direccion,
					}
				}
			})
			resolve('Dirección actualizada con éxito.')
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const deleteDireccion = (direccion) => {
	const _id = new ObjectId(direccion._id)
	delete direccion._id

	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Usuario').updateOne({
				"direcciones._id": _id
			}, {
				$set: {
					"direcciones.$": {
						_id,
						...direccion,
						estado: 'inactivo'
					}
				}
			})
			resolve('Dirección eliminada con éxito.')
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

export const DireccionDAO = {
	getAllDireccionesByUsuario,
	createDireccion,
	updateDireccion,
	deleteDireccion,
}