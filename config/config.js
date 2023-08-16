import dotenv from 'dotenv'
dotenv.config();
const config = {
    JWT_SECRET: process.env.JWT_TOKEN_SECRET,
    JWT_TOKEN_EXPIRE:'1d'
    
}
export default config