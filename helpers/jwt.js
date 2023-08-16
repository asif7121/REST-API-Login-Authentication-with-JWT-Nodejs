import jwt from 'jsonwebtoken';
import config from '../config/config.js';
export default function GenerateJwt(payload){
    const token = jwt.sign(payload,config.JWT_SECRET,
    {expiresIn: config.JWT_TOKEN_EXPIRE})
    return token
}