const jwt = require("jwt-simple");
const moment = require("moment");
const apikey = process.env.API_KEY;

exports.ensureAuthenticated = function (req, res, next) {
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

