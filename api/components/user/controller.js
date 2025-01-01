import DummyStore from "../../../store/dummy.js";
import IdHelpers from "../../../helpers/id.helpers.js";

import authInstance from "../auth/controller.js";
import permissionsInstance from "../permissions/controller.js";

class UserController {
    constructor(store, auth, permissions) {
        this.TABLE = "user";
        this.store = store;
        this.auth = auth;
        this.permissions = permissions;
    }

    async getAll(req, res) {
        try {
            const users = await this.store.list(this.TABLE);
        return users;
        } catch (error) {
            throw new Error(error.message);
            
        }
        
    }

    async getOne(req, res) {
        const id = req.params.id;
        const user = await this.store.get(this.TABLE, id);
        return user;
    }

    async create(req, res) {
        const user = {
            id: req.body.id || IdHelpers.generateID(),
            name: req.body.name,
            username: req.body.username
        };
        
        if (req.body.password || req.body.username) {
            await this.auth.createAuth(
                {
                    id: user.id,
                    username: user.username,
                    password: req.body.password
                }
            );

            await this.permissions.createPermission({ user_id: user.id });
        }

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
const userInstance = new UserController(store, authInstance, permissionsInstance);

// Ahora puedes exportar userInstance o la clase User para usarla en otras partes de tu aplicación
export default userInstance;
