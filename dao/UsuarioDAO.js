import { client } from "./MongoConnection.js";
import { ObjectId } from 'mongodb'

const getAllUsuarios = () => {
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			const usuarios = await client.db().collection('Usuario').find({ estado: 'activo' }).toArray()
			resolve(usuarios)
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const login = (user) => {
	return new Promise(async (resolve, reject) => {
		if (!isLoginValid(user)) {
			reject('El usuario debe contener correo y contraseña.')
		}
		try {
			await client.connect()
			const loggedUsuario = await client.db().collection('Usuario').findOne({
				...user,
				estado: 'activo',
			})
			if (!loggedUsuario) {
				resolve()
			}
			resolve(loggedUsuario)
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const createUsuario = (nuevoUsuario) => {
	return new Promise(async (resolve, reject) => {
		if (!isUsuarioValid(nuevoUsuario)) {
			reject('El usuario no tiene todos los campos necesarios.')
		}
		try {
			await client.connect()
			await client.db().collection('Usuario').insertOne({
				...nuevoUsuario,
				estado: 'activo',
			})
			resolve('Usuario registrado con éxito')
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const updateUsuario = (usuario) => {
	const _id = new ObjectId(usuario._id)
	delete usuario._id
	delete usuario.token
	
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Usuario').updateOne({ _id }, {
				$set: { ...usuario }
			})
			resolve('Usuario actualizado con éxito')
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const deleteUsuario = (usuario) => {
	const _id = new ObjectId(usuario._id)
	
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Usuario').updateOne({ _id }, {
				$set: { 
					estado: 'inactivo'
				}
			})
			resolve('Usuario eliminado con éxito')
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

function isLoginValid(usuario) {
	return usuario.hasOwnProperty('correo') &&
	usuario.hasOwnProperty('contraseña')
}

function isUsuarioValid(usuario) {
	return usuario.hasOwnProperty('nombre') &&
	usuario.hasOwnProperty('correo') &&
	usuario.hasOwnProperty('contraseña') &&
	usuario.hasOwnProperty('telefono') &&
	usuario.hasOwnProperty('tipoUsuario')
}

export const UsuarioDAO = {
	getAllUsuarios,
	login,
	createUsuario,
	updateUsuario,
	deleteUsuario
}