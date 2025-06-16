import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export async function getRootFolders() {
    try {
        const res = await axios.get(`${BASE_URL}/folders`)
        return res.data
    } catch {
        console.error('Failed to fetch folders')
    }
}

export async function getFolderById(id: string) {
    try {
        const res = await axios.get(`${BASE_URL}/folders/${id}`)
        return res.data
    } catch (error) {
        console.error(`Failed to fetch folder with id: ${id}`, error)
    }
}