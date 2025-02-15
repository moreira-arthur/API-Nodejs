// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('good bye')

//     return response.end()
// })

// server.listen(3333)

import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

// Inicialização do Servidor
const server = fastify()

// Inicialização do Banco de Dados
// const database = new DatabaseMemory()
const database = new DatabasePostgres()

/**
 * Rota POST /fotos
 * Cria uma nova foto no banco de dados.
 * 
 * @param {Object} request - O objeto de requisição HTTP.
 * @param {Object} request.body - O corpo da requisição HTTP.
 * @param {string} request.body.title - O título da foto.
 * @param {string} request.body.description - A descrição da foto.
 * @param {string} request.body.resolution - A resolução da foto.
 * @param {Object} reply - O objeto de resposta HTTP.
 * @returns {Object} - Resposta HTTP com status 201.
 */
server.post('/fotos', async (request, reply) => {
    const { title, description, resolution } = request.body

    await database.create({
        title: title,
        description: description,
        resolution: resolution
        /*
        EQUIVALENTE A 
        title,
        description,
        resolution 
        */
    })

    console.log(database.list())

    return reply.status(201).send()
})

/**
 * Rota GET /fotos
 * Lista fotos do banco de dados.
 * 
 * @param {Object} request - O objeto de requisição HTTP.
 * @param {Object} request.query - Os parâmetros de consulta da requisição HTTP.
 * @param {string} request.query.search - O termo de busca para filtrar fotos.
 * @returns {Array} - Lista de fotos.
 */
server.get('/fotos', async (request) => {
    const search = request.query.search

    const fotos = await database.list(search)
    console.log(fotos)
    return fotos
})

/**
 * Rota PUT /fotos/:id
 * Atualiza uma foto existente no banco de dados.
 * 
 * @param {Object} request - O objeto de requisição HTTP.
 * @param {Object} request.body - O corpo da requisição HTTP.
 * @param {string} request.body.title - O título da foto.
 * @param {string} request.body.description - A descrição da foto.
 * @param {string} request.body.resolution - A resolução da foto.
 * @param {Object} request.params - Os parâmetros da rota.
 * @param {string} request.params.id - O ID da foto a ser atualizada.
 * @param {Object} reply - O objeto de resposta HTTP.
 * @returns {Object} - Resposta HTTP com status 204.
 */
server.put('/fotos/:id', async (request, reply) => {
    const { title, description, resolution } = request.body
    const fotoId = request.params.id

    await database.update(fotoId, {
        title: title,
        description: description,
        resolution: resolution
    })

    return reply.status(204).send()
})

/**
 * Rota DELETE /fotos/:id
 * Deleta uma foto existente no banco de dados.
 * 
 * @param {Object} request - O objeto de requisição HTTP.
 * @param {Object} request.params - Os parâmetros da rota.
 * @param {string} request.params.id - O ID da foto a ser deletada.
 * @param {Object} reply - O objeto de resposta HTTP.
 * @returns {Object} - Resposta HTTP com status 204.
 */
server.delete('/fotos/:id', async (request, reply) => {
    const fotoId = request.params.id

    await database.delete(fotoId)

    return reply.status(204).send()
})

// Inicialização do Servidor
server.listen({
    port: process.env.PORT ?? 3333,
})