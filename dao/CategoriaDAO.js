import { client } from './MongoConnection.js'

const getAllCategorias = () => {
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			const categorias = await client.db().collection('Categoria').find().toArray()
			resolve(categorias)
		} catch (error) {
			reject(error)
		} finally {
			await client.close()
		}
	})
}

const getAllCategoriasConProductos = () => {
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			const categorias = await client.db().collection('Categoria').aggregate([
				{
					$lookup: {
						from: 'Producto',
						localField: 'nombre',
						foreignField: 'categoria.nombre',
						as: 'productos'
					}
				}
			])
				.toArray()
			resolve(categorias)
		} catch (error) {
			reject(error)
		} finally {
			client.close()
		}
	})
}

const createCategoria = (categoria) => {
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			await client.db().collection('Categoria').insertOne({ ...categoria })
			resolve('Categoría creada con éxito.')
		} catch (error) {
			reject(error)
		} finally {
			client.close()
		}
	})
}

export const CategoriaDAO = {
	getAllCategorias,
	getAllCategoriasConProductos,
	createCategoria,
}