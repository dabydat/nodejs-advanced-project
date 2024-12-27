import DummyStore from "../../../store/dummy.js";
import IdHelpers from "../../../helpers/id.helpers.js";

class User {
    constructor(store) {
        this.TABLE = "user";
        this.store = store;
    }

    async getAll(req, res) {
        const users = await this.store.list(this.TABLE);
        return users;
    }

    async getOne(req, res) {
        const id = req.params.id;
        const user = await this.store.get(this.TABLE, id);
        return user;
    }

    async create(req, res) {
        const user = {
            id: req.body.id || IdHelpers.generateID(),
            name: req.body.name
        };
        await this.store.upsert(this.TABLE, user);
        return user;
    }

    async removeOne(req, res) {
        const id = req.params.id;
        await this.store.remove(this.TABLE, id);
        return true;
    }
}

// Creación de una instancia de DummyStore
const store = new DummyStore();
// Creación de una instancia de User utilizando la inyección de dependencias
const userInstance = new User(store);

// Ahora puedes exportar userInstance o la clase User para usarla en otras partes de tu aplicación
export default userInstance;
