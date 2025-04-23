import { api } from "../axios"

export const verifyToken = async(token: string) => {
    const res = await api.get('/auth')

    return res.data
}