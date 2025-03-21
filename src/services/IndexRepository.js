import {
   UserDAO,ClientDAO,SupplierDAO,ItemDAO,AppointmentDAO
} from "../daos/Factory.js";

import UserRepository from "./UserRepository.js";
import SessionRepository from "./SessionRepository.js";
import ClientRepository from "./ClientRepository.js";
import SupplierRepository from "./SupplierRepository.js";
import ItemRepository from "./ItemRepository.js"
import AppointmentRepository from "./AppointmentRepository.js"



export const userRepository = new UserRepository(UserDAO,);

export const sessionRepository = new SessionRepository(UserDAO);

export const clientRepository = new ClientRepository(ClientDAO);

export const supplierRepository = new SupplierRepository(SupplierDAO);

export const itemRepository = new ItemRepository(ItemDAO);

export const appointmentRepository = new AppointmentRepository(AppointmentDAO);