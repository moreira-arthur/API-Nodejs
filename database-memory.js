import { randomUUID } from 'node:crypto'

/**
 * Classe para interagir com um banco de dados em memória.
 */
export class DatabaseMemory {
    #fotos = new Map()
    
    /**
     * Lista fotos do banco de dados em memória.
     * 
     * @param {string} [search] - O termo de busca para filtrar fotos.
     * @returns {Array} - Lista de fotos.
     */
    list(search) {
        return Array.from(this.#fotos.entries()
            .filter(foto => {
                if (search) {
                    return foto[1].title.includes(search)
                }
                return true
            })
            .map((fotoArray) => {
                const id = fotoArray[0]
                const data = fotoArray[1]

                return {
                    id,
                    ...data,
                }
            })
        )
    }

    /**
     * Cria uma nova foto no banco de dados em memória.
     * 
     * @param {Object} foto - O objeto da foto.
     * @param {string} foto.title - O título da foto.
     * @param {string} foto.description - A descrição da foto.
     * @param {string} foto.resolution - A resolução da foto.
     */
    create(foto) {
        const fotoId = randomUUID()
        this.#fotos.set(fotoId, foto)
    }
    
    /**
     * Atualiza uma foto existente no banco de dados em memória.
     * 
     * @param {string} id - O ID da foto a ser atualizada.
     * @param {Object} foto - O objeto da foto.
     * @param {string} foto.title - O título da foto.
     * @param {string} foto.description - A descrição da foto.
     * @param {string} foto.resolution - A resolução da foto.
     */
    update(id, foto) {
        this.#fotos.set(id, foto)
    }

    /**
     * Deleta uma foto existente no banco de dados em memória.
     * 
     * @param {string} id - O ID da foto a ser deletada.
     */
    delete(id) {
        this.#fotos.delete(id)
    }
}