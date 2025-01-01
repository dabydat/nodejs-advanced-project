import DummyStore from "../../../store/dummy.js";
import IdHelpers from "../../../helpers/id.helpers.js";

class PermissionsController {
    constructor(store) {
        this.TABLE = "permissions";
        this.store = store;
    }

    async getAll() {
        try {
            const permissions = await this.store.list(this.TABLE);
            return permissions;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createPermission(data) {
        const permissionsData = {
            id: IdHelpers.generateID(),
            user_id : data.user_id,
            permissions: ['selfUpdate']
        }

        return this.store.upsert(this.TABLE, permissionsData);
    }

    async verifyPermission(data) {
        const permissions = await this.store.query(this.TABLE, { user_id: data.user_id });
        if (permissions.length === 0) return false;
        return permissions[0].permissions.includes(data.permission);
    }
}

// Creación de una instancia de DummyStore
const store = new DummyStore();
// Creación de una instancia de Permissions utilizando la inyección de dependencias
const permissionsInstance = new PermissionsController(store);
// Ahora puedes exportar permissionsInstance o la clase Permissions para usarla en otras partes de tu aplicación
export default permissionsInstance;