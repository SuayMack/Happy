import express from 'express'
import path from 'path'
import cors from 'cors'

import 'express-async-errors'

import './database/connection'

import routes from './routes'
import errorHandler from './errors/handler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

app.listen(3333)

/* Rota = conjunto
// Recurso = usuário

// Métodos HTTP = GET, POST PUT DELETE
// Parâmetros

// GET = Buscando uma informação (Lista, Item)
// POST = Criando uma informação (Lista, Item)
// PUT = Editando uma informação (Lista, Item)
// DELETE = Deletando uma informação (Lista, Item)

// 3 tipos de parâmetros: ex: buscar usuários
// Query Params: http://localhost:3333/users?search=priscila
// Route Params: http://localhost:3333/1 (usuario com id 1)
// Body Params: http://localhost:3333/users*/