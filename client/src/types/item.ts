export interface Item {
    id: string
    name: string
    type: 'folder' | 'file'
    children?: Item[]
}