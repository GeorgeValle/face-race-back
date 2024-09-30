import {
   UserDAO,ClientDAO
} from "../daos/Factory.js";

import UserRepository from "./UserRepository.js";
import SessionRepository from "./SessionRepository.js";
import ClientRepository from "./ClientRepository.js";



export const userRepository = new UserRepository(
   UserDAO,
);
export const sessionRepository = new SessionRepository(UserDAO);


export const clientRepository = new ClientRepository(ClientDAO)