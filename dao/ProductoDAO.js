import { client } from './MongoConnection'

export const getAllProductos = () => {
	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			const produtos = await client.db().collection('Producto').find().toArray()
			resolve(produtos)
		} catch (error) {
			reject(error)
		} finally {
			client.close()
		}
	})
}

export const getAllProductosGroupedByCategoria = () => {
	const pipeline = [
		{
			$group: {
				'_id': '$categoria',
				'productos': { $addToSet: '$$ROOT' }
			}
		}
	]

	return new Promise(async (resolve, reject) => {
		try {
			await client.connect()
			const produtos = await client.db().collection('Producto').aggregate(pipeline).toArray()
			resolve(produtos)
		} catch (error) {
			reject(error)
		} finally {
			client.close()
		}
	})
}