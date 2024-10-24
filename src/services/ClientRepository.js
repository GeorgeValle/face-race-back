import ClientDTO from '../dto/ClientDTO.js';


export default class ClientRepository {
    constructor(clientDAO) {
        this.clientDAO = clientDAO;

    }
    async createClient(data) {
        try {
            const client = await this.clientDAO.saveDataDAO(data);
            return client;
        } catch (error) {
            throw error;
        }
    }
    async getClientById(id) {
        try {
            const client = await this.clientDAO.getByIdDAO(id);
            return client;
        } catch (error) {
            throw error;
        }
    }
    async getClients() {
        try {
            const clients = await this.client.getAllDAO();
            return clients;
        } catch (error) {
            throw error;
        }
    }
    async getClientByEmail(email) {
        try {
            const client = await this.clientDAO.getByFieldDAO(email);
            return client;
        } catch (error) {
            throw error;
        }
    }

    async getClientByDNI(dni){
        try{
            const client = await this.clientDAO.getByFieldDAO(dni);
            
    
            return client[0];
        }catch(error){
            throw error;
        }
    }
    async updateClientById(id, data) {
        try {
            const client = await this.clientDAO.updateByIdDAO(data, {_id:id});
            return client;
        } catch (error) {
            throw error;
        }
    }

    async updateClientByDNI(dni, data){
        try {
            //const updatedClient = await this.clientDAO.updateByFieldDAO(dni, data);
            const updatedClient = await this.clientDAO.updateOneDao(data,{dni: dni});
            return updatedClient
        }catch(error){
            throw error;
        }
    }
    async deleteClient(id) {
        try {
            const client = await this.clientDAO.deleteByIdDAO(id);
            return client;
        } catch (error) {
            throw error;
        }
    }

    async deleteClientByDNI(dni){
        try{
            const client = await this.clientDAO.deleteByFieldDAO(dni);
            return client;
        }catch(error){
            throw error;
        }
    }

}