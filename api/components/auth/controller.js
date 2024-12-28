import jwtInstance from "../../../helpers/jwt.helpers.js";
import DummyStore from "../../../store/dummy.js";

class AuthController {

    constructor(store, jwt) {
        this.TABLE = "auth";
        this.store = store;
        this.jwt = jwt
    }

    async login(username, password) {
        const data = await this.store.query(this.TABLE, { username: username });
        if (data.length > 0 && data[0].password === password) {
            return this.jwt.generateToken(data[0]);
        }else{
            throw new Error("Invalid username or password");
        };
        return data;
    }

    createAuth(data) {
        const authData = { id: data.id };
        if (data.username) authData.username = data.username;
        if (data.password) authData.password = data.password;
        return this.store.upsert(this.TABLE, authData);
    }
}

// Creación de una instancia de DummyStore
const store = new DummyStore();
// Creación de una instancia de User utilizando la inyección de dependencias
const authInstance = new AuthController(store, jwtInstance);
// Ahora puedes exportar authInstance o la clase User para usarla en otras partes de tu aplicación
export default authInstance;