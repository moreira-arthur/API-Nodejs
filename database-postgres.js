import { randomUUID } from 'node:crypto'
import { sql } from './db.js'

/**
 * Classe para interagir com o banco de dados PostgreSQL.
 */
export class DatabasePostgres {
    #fotos = new Map()

    /**
     * Lista fotos do banco de dados.
     * 
     * @param {string} [search] - O termo de busca para filtrar fotos.
     * @returns {Array} - Lista de fotos.
     */
    async list(search) {
        let fotos
        if (search) {
            fotos = await sql`select * from fotos where title ilike ${'%' + search + '%'}`
        } else {
            fotos = await sql`select * from fotos`
        }
        return fotos
    }

    /**
     * Cria uma nova foto no banco de dados.
     * 
     * @param {Object} foto - O objeto da foto.
     * @param {string} foto.title - O título da foto.
     * @param {string} foto.description - A descrição da foto.
     * @param {string} foto.resolution - A resolução da foto.
     */
    async create(foto) {
        const fotoId = randomUUID()
        const { title, description, resolution } = foto

        await sql`insert into fotos VALUES (${fotoId}, ${title}, ${description}, ${resolution})`
    }

    /**
     * Atualiza uma foto existente no banco de dados.
     * 
     * @param {string} id - O ID da foto a ser atualizada.
     * @param {Object} foto - O objeto da foto.
     * @param {string} foto.title - O título da foto.
     * @param {string} foto.description - A descrição da foto.
     * @param {string} foto.resolution - A resolução da foto.
     */
    async update(id, foto) {
        const { title, description, resolution } = foto
        await sql`update fotos set title = ${title}, description = ${description}, resolution = ${resolution}
                    where id = ${id}`
    }

    /**
     * Deleta uma foto existente no banco de dados.
     * 
     * @param {string} id - O ID da foto a ser deletada.
     */
    async delete(id) {
        await sql`delete from fotos where id = ${id}`
    }
}