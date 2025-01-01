import jwtInstance from "../../../helpers/jwt.helpers.js";
import DummyStore from "../../../store/dummy.js";
import bcrypt from "bcrypt";

class AuthController {

    constructor(store, jwt) {
        this.TABLE = "auth";
        this.store = store;
        this.jwt = jwt
    }

    async getAll() {
        try {
            const users = await this.store.list(this.TABLE);
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async login(username, password) {
        const data = await this.store.query(this.TABLE, { username: username });
        const comparePass = await bcrypt.compare(password, data[0].password);
        if (comparePass) return this.jwt.generateToken(data[0]);
        else throw new Error("Invalid username or password");
    }

    async createAuth(data) {
        const authData = { id: data.id };
        if (data.username) authData.username = data.username;
        if (data.password) authData.password = await bcrypt.hash(data.password, 5);
        return this.store.upsert(this.TABLE, authData);
    }
}

// Creación de una instancia de DummyStore
const store = new DummyStore();
// Creación de una instancia de User utilizando la inyección de dependencias
const authInstance = new AuthController(store, jwtInstance);
// Ahora puedes exportar authInstance o la clase User para usarla en otras partes de tu aplicación
export default authInstance;