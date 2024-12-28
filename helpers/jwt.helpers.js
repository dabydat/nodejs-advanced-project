import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config.js';
class JwtHelper {
    generateToken(payload) {
        console.log(payload);
        
        const token = jwt.sign(payload, JWT_CONFIG.SECRET, { expiresIn: '1h' });
        return token;
    }

    decodeToken(token) {
        const decoded = jwt.decode(token);
        return decoded;
    }

    isTokenExpired(token) {
        const decoded = jwt.decode(token);
        const now = Date.now() / 1000; // Convertir a segundos
        return decoded.exp < now;
    }

    isTokenValid(token) {
        try {
            jwt.verify(token, JWT_CONFIG.SECRET);
            return true;
        } catch (error) {
            return false;
        }
    }
}

const jwtInstance = new JwtHelper();

export default jwtInstance;