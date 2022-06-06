const express = require('express')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const { ensureAuthenticated } = require('../controllers/checkToken.js')
const { createToken } = require('../controllers/createToken')
const fileUpload = require('express-fileupload')
const dbError = require('../utils/dbError')

const router = express.Router()
const prisma = new PrismaClient()

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                username,
            },
        });

        if (usuario?.password == password) {
            res.json({
                username: usuario?.username,
                token: createToken(usuario),
            });
        } else {
            res.json({
                error: 'Credenciales incorrectas',
            });
        }
    } catch (e) {
        dbError(e, res);
        return;
    }
})

router.get('/users', ensureAuthenticated, async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany()
        res.json(usuarios)
    } catch (error) {
        dbError(error)
        return
    }
})

module.exports = router

