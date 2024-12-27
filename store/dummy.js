const db = {
    'user': [
        {
            id: '1',
            name: 'Carlos'
        },
        {
            id: '2',
            name: 'Amanda'
        },
        {
            id: '3',
            name: 'Fernando'
        },
        {
            id: '4',
            name: 'Fernanda'
        },
        {
            id: '5',
            name: 'Erika'
        },
        {
            id: '6',
            name: 'Alejandro'
        }
    ],
    'product': [
        {
            id: '1',
            name: 'Product 1'
        },
        {
            id: '2',
            name: 'Product 2'
        }
    ],
    'order': [
        {
            id: '1',
            name: 'Order 1'
        },
        {
            id: '2',
            name: 'Order 2'
        }
    ],
};

class DummyStore {
    constructor() {
        this.db = db;
    }

    // Método asincrónico para obtener la lista de datos
    async list(table) {
        // if (!this.db[table]) throw new Error('Table not found');        
        return this.db[table];
    }

    // Método asincrónico para obtener los datos por ID
    async get(table, id) {
        const collection = await this.list(table);
        return collection.filter(item => item.id === id)[0] ?? null;
    }

    // Método asincrónico para insertar o actualizar datos
    async upsert(table, data) {
        const collection = await this.list(table) ?? [];
        const index = collection.findIndex(item => item.id === data.id);
        if (index > -1) {
            collection[index] = data;
            return data;
        }
        collection.push(data);
        this.db[table] = collection;
        return data;
    }

    // Método asincrónico para eliminar datos
    async remove(table, id) {
        const collection = await this.list(table) ?? [];
        const index = collection.findIndex(item => item.id === id);
        if (index > -1) {
            collection.splice(index, 1);
            this.db[table] = collection;
            return true;
        }
        return false
    }
}




export default DummyStore;