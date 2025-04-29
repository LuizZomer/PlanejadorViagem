import { JwtPayload } from "jwt-decode";

interface IUser {
    externalId: number;
    username: string
} 

interface JwtDecodedWithUser extends JwtPayload {
    externalId: number;
    username: string
}