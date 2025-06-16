import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export async function getRootFolders() {
    try {
        const res = await axios.get(`${BASE_URL}/items`, {
            params: { type: 'folder' }
        })
        return res.data
    } catch {
        console.error('Failed to fetch items')
    }
}

export async function getItemById(id: string) {
    try {
        const res = await axios.get(`${BASE_URL}/items/${id}`)
        return res.data
    } catch (error) {
        console.error(`Failed to fetch item with id: ${id}`, error)
    }
}