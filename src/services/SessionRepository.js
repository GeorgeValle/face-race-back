import { createHash, isValidPassword } from "../utils/MethodesJWT.js";
import UserDTO from "../dto/UserDTO.js";
import ProfileDTO from "../dto/ProfileDTO.js";
import CustomError from "../utils/CustomError.js"
import { logInfo } from '../utils/Logger.js'
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import config from "../config/Envs.js";
import {generateUserErrorInfo} from '../utils/info.js'

const transporter = nodemailer.createTransport({
  tls: {
    rejectUnauthorized: false
  },
  service: "gmail",
  auth: {
    user: config.USER_MAIL,
    pass: config.PASS_MAIL,
  },
});

export default class SessionRepository {
  constructor(userDAO) {
    this.userDAO = userDAO;
  }

  async loginUser(user) {
    try {
      //to do clear this console log
      console.log("reposity: "+user.email)
      //const userDB = await this.userDAO.getUserByEmail(user.email);
      if (!user){throw error('not user')}
      const userDB = await this.userDAO.getOneByFieldDAO({ email: user.email });
      if (!userDB){throw error('Invalid Email')}
    
      if (!userDB) {
        CustomError.createError({
          name: "Error",
          message: "User not found by create error",
          code: EErrors.USER_NOT_FOUND,
          info: generateUserErrorInfo(user.email),
        });
      }
      if (userDB.status === "not verified") {
        CustomError.createError({
          name: "Error",
          message: "User not verified",
          code: EErrors.USER_NOT_VERIFIED,
        });
      }
      
      if ( !isValidPassword(userDB, user.password)) {
        CustomError.createError({
          name: "ErrorPassword",
          cause: "check entered characters",
          message: "Password not valid",
          code: EErrors.PASSWORD_NOT_VALID,
          info: loginPasswordErrorInfo(user.email),
        });
      }
      logInfo.info(`user login getting: ${userDB.email}, password :${userDB.password}`);
      //const date = new Date().toLocaleString();

      //userDB.lastLogin = date;
      //await this.userDAO.updateByIdDAO(userDB, userDB._id);

      // const notUpdate = await this.userDAO.updateOneDao({lastLogin:date},{email:decoded.email});
      // if(!notUpdate){
      //   CustomError.createError({
      //     name: "Error",
      //     message: "Last Login not updated",
      //     code: EErrors.LAST_LOGIN_NOT_UPDATED,
      //     info: generateUserErrorInfo(user.email),
      //   });
      // }
      // console.log(notUpdate)

      //Change date on lastLogin  
      const date = new Date().toLocaleDateString()
      const lastLoginUpdated = await this.userDAO.updateOneDao({ lastLogin: date }, { email: userDB.email });
      if (lastLoginUpdated == 0) {
        CustomError.createError({
          name: "Error",
          message: "Last Login not updated",
          code: EErrors.LAST_LOGIN_NOT_UPDATED,
          info: lastLoginUserErrorInfo(lastLoginUpdated),
        });
      }
      logInfo.info(`lastLogin updated: ${userDB.email}`);


      return new ProfileDTO(userDB);

    } catch (e) {
      throw new Error(e);
    }
  }

  async registerUser(user) {

    const userFound = await this.userDAO.getByFieldDAO({ email: user.email })

    if (userFound == true && userFound.status == "not verified") throw new Error("Email registrado: Necesitas reenviar el Email de activación");
    if (userFound == true) throw new Error("Ya existe el usuario");
    
    const token = jwt.sign({ email: user.email }, "secret", {
      expiresIn: "72h",
    });
    const verificationLink = `${config.SESSION}/verify/${token}`;
    const mailOptions = {
      from: config.USER_MAIL,
      to: user.email,
      subject: "Verificá tu email de nuevo usuario",
      html: `Click En el siguiente enlace para verificar tu e-mail de usuario: ${verificationLink}`,
    };
    user.password = createHash(user.password);
    if (user.email === config.EMAIL_ADMIN) {
      user.role = "Admin";
    } else {
      user.role = "Normal";
    }

    if (!user.name) throw new Error("Falta el nombre");

    if (!user.surname) throw new Error("Falta el apellido");

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw new Error(err);
    });
    return await this.userDAO.saveDataDAO(user);
  }

  async getUserCurrent(user) {
    return new UserDTO(user);
  }

  async verifyUser(decoded) {

    const user = await this.userDAO.getByFieldDAO({ email: decoded.email });
    if (!user) {
      CustomError.createError({
        name: "Error",
        message: "User not found when verify email",
        code: EErrors.USER_NOT_FOUND,
        info: generateUserErrorInfo(user),
      });
    }

    //Change user status X "verified"
    const userVerified = await this.userDAO.updateOneDao({ status: "verified" }, { email: decoded.email });
    if (userVerified == 0) {
      CustomError.createError({
        name: "Error",
        message: "User not verified",
        code: EErrors.USER_NOT_FOUND,
        info: generateUserErrorInfo(userVerified),
      });
    }
    logInfo.info(`user verify: ${decoded.email}`);

  }

  async sendToken(OneEmail) {
    const user = await this.userDAO.getByFieldDAO({ email: OneEmail });
    if (user.status === "verified")
      throw new Error("User already verified");
    const token = jwt.sign({ email: OneEmail }, "secret", {
      expiresIn: "72h",
    });
    const verificationLink = `${config.SESSION}/verify/${token}`;
    const mailOptions = {
      from: config.USER_MAIL,
      to: OneEmail,
      subject: "Verify your email",
      html: `Click on the following link to verify your email: ${verificationLink}`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw new Error(err);
    });
    return true;
  }

  async resetPasswordForm(oneEmail, password, confirmPassword) {
    const user = await this.userDAO.getByFieldDAO({ email: oneEmail });
    if (!user) {
      CustomError.createError({
        name: "Error",
        message: "User not found by create error",
        code: EErrors.USER_NOT_FOUND,
        info: generateUserErrorInfo(user),
      });
    }
    if (password !== confirmPassword) {
      return CustomError.createError({
        name: "Error",
        message: "Passwords do not match",
        code: EErrors.PASSWORD_NOT_VALID,
        info: generateUserErrorInfo(user),
      });
    }
    if (isValidPassword(user, password)) {
      return CustomError.createError({
        name: "Error",
        message: "The password entered cannot be the same as the previous one",
        code: EErrors.PASSWORD_NOT_VALID,
        info: generateUserErrorInfo(user),
      });
    }
    const newPassword = createHash(password);
    user.password = newPassword;
    await this.userDAO.updateUser(user._id, user);
    return user;
  }

  async validUserSentEmailPassword(oneEmail) {
    const user = await this.userDAO.getByFieldDAO({ email: oneEmail });
    if (user) {
      const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
      const mailOptions = {
        from: config.USER_MAIL,
        to: email,
        subject: "Restore Password",
        html: `Click on the following link to reset your password: ${config.SESSION}/resetPasswordForm/${token}`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw new Error("Error to send email");
      });
    }
    return user;
  }

  async getUserByEmail(oneEmail) {
    try {
      const user = await this.userDAO.getByFieldDAO({ email: oneEmail });
      if (!user) {
        CustomError.createError({
          name: "Error",
          message: "User not found by create error",
          code: EErrors.USER_NOT_FOUND,
          info: generateUserErrorInfo(user),
        });
      }
      return user;
    } catch (e) {
      throw e;
    }
  }
  async setDateController(user) {
    const userDB = await this.userDAO.getByFieldDAO(user.email);
    const date = new Date();
    userDB.lastLogin = date;
    await this.userDAO.updateByIdDAO(userDB, userDB._id);
    return userDB;
  }
}
