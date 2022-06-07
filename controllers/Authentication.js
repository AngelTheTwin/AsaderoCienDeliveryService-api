import jwt from 'jwt-simple'
import moment from 'moment'

const apikey = process.env.API_KEY;

export const ensureAuthenticated = function (req, res, next) {
	if (!req.headers.authorization) {
		return res
			.status(401)
			.send({ error: "Tu petición no tiene cabecera de autorización" });
	}

	var token = req.headers.authorization.split(" ")[1];
	try {
		var payload = jwt.decode(token, apikey);
	} catch (error) {
		res.status(401).json({
			error: "Error al decodificar su token de autenticación",
		});
		return
	}

	if (payload.exp <= moment().unix()) {
		return res.status(401).send({ error: "El token ha expirado" });
	}

	req.user = payload.sub;
	next();
};

export const createToken = function (user) {
	var payload = {
		sub: user,
		iat: moment().unix(),
		exp: moment().add(30, "days").unix(),
	};
	return jwt.encode(payload, apikey);
};
