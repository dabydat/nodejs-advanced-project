import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config.js';

class JwtHelper {
    generateToken(payload) {
        const token = jwt.sign(payload, JWT_CONFIG.SECRET, { expiresIn: '1h' });
        return token;
    }

    isTokenExpired(token) {
        const decoded = jwt.decode(token);
        const now = Date.now() / 1000; // Convertir a segundos
        return decoded.exp < now;
    }
}

const jwtInstance = new JwtHelper();

export default jwtInstance;