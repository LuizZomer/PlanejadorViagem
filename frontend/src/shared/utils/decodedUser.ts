import {jwtDecode} from 'jwt-decode'
import { JwtDecodedWithUser } from '../types/user/user'

export const decodedUser = (token: string) => {
    const user = jwtDecode(token) as JwtDecodedWithUser

    return user
}