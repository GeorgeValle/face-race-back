import {
   UserDAO,ClientDAO,SupplierDAO,ItemDAO,AppointmentDAO, SaleDAO, PurchaseDAO, ReconditioningDAO
} from "../daos/Factory.js";

import UserRepository from "./UserRepository.js";
import SessionRepository from "./SessionRepository.js";
import ClientRepository from "./ClientRepository.js";
import SupplierRepository from "./SupplierRepository.js";
import ItemRepository from "./ItemRepository.js"
import AppointmentRepository from "./AppointmentRepository.js"
import SaleRepository from "./SaleRepository.js";
import PurchaseRepository from "./PurchaseRepository.js";
import ReconditioningRepository from "./ReconditioningRepository.js"



export const userRepository = new UserRepository(UserDAO,);

export const sessionRepository = new SessionRepository(UserDAO);

export const clientRepository = new ClientRepository(ClientDAO);

export const supplierRepository = new SupplierRepository(SupplierDAO);

export const itemRepository = new ItemRepository(ItemDAO);

export const appointmentRepository = new AppointmentRepository(AppointmentDAO);

export const saleRepository = new SaleRepository(SaleDAO);

export const purchaseRepository = new PurchaseRepository(PurchaseDAO);

export const reconditioningRepository = new ReconditioningRepository(ReconditioningDAO);