import { sessionRepository } from "../services/IndexRepository.js";
import { generateToken } from "../utils/MethodesJWT.js";
import jwt from "jsonwebtoken";
import { logInfo, errorLogger } from '../utils/Logger.js'


export const loginUser = async (req, res) => {
    try {

        const user = await sessionRepository.loginUser(req.body);
        // if (user == null) {
        //   errorLogger.error("Failed to login");
        //   return res.status(400).json({"newAccess":false});
        // }
        logInfo.info(`${user.email} Find!!!!!!`)
        const access_token = generateToken(user);
        logInfo.info(`${user.email} logged in`);


        user.access = true;
        res
            .cookie("keyCookieJobsRoad", (user.token = access_token), {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            })
            .send({ user: user, token: access_token });


    } catch (error) {
        errorLogger.fatal("Failed to login: " + error);
        const message = {
            message: "email o password no coinciden",
        };
        // const URI = {
        //   URI: "/api/session/login",
        // };
        res.status(401).json({ message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const user = await sessionRepository.registerUser(req.body);
        logInfo.info("User Registered");
        const message = {
            message:
                "Sigue las instrucciones enviadas a tu email para activar tu cuenta. De otra manera, no podrás ingresar.",
        };
        const URI = {
            URI: "/api/session/register",
        };
        res.status(200).send({ message: message, URI: URI, success: true });
    } catch (error) {
        errorLogger.fatal("Error to register user: " + error);
        const message = {
            message: "Datos ingresados no son validos"
        };
        const URI = {
            URI: "/api/session/register",
        };
        res.status(500).send({ message: message, URI: URI, success: false });
    }
};

export const reSendToken = async (req, res) => {
    try {
        const email = req.params.email;
        if (!email) {
            errorLogger.fatal("You Need email");
            res.status(500).json({ message: "Please, insert mail" });
        }

        const sent = await sessionRepository.sendToken(email)
        if (sent) {
            res.status(200).send({ "Message": "Email Sent Succesfully" });
        }
    } catch (error) {
        req.logger.fatal("Error to send your activation link");
        const message = {
            message: error,
        };
        const URI = {
            URI: "/api/session/login",
        };
        res.status(500).json({ message, URI });
    }
};

export const getUserCurrent = async (req, res) => {
    try {
        const user = await sessionRepository.getUserCurrent(req.user.user);
        logInfo.info("User obtained");
        return res.send({ status: "success", payload: user });
    } catch (error) {
        req.logger.fatal("Error to obtain user");
        const message = {
            message: error,
        };
        const URI = {
            URI: "/api/session/login",
        };
        res.status(500).json({ message, URI });
    }
};

export const verifyUser = async (req, res) => {
    try {
        const token = req.params.token;
        //Check token expiration date
        jwt.verify(token, "secret", async (err, decoded) => {
            if (err) {
                errorLogger.fatal("Invalid verification token");
                res.status(500).json({ message: "Invalid verification token" });
            }

            await sessionRepository.verifyUser(decoded);
            res.status(200).send({ validated: true });
        });
    } catch (error) {
        errorLogger.fatal("Error to verify user");
        const message = {
            message: error,
        };
        const URI = {
            URI: "/api/session/verify/:token",
        };
        res.status(500).send({ message, URI })
    }
};

export const resetPassword = async (req, res) => {
    try {
        res.render("resetearPassword", {});
    } catch (error) {
        errorLogger.fatal("Error to reset password");
        const message = {
            message: error,
        };
        const URI = {
            URI: "/api/session/login",
        };
        res.status(500).json({ message, URI });
    }
};

export const restart = async (req, res) => {
    const email = req.body.email;
    await sessionRepository.validUserSentEmailPassword(email);
    const message = {
        message: "Se ha enviado un Email con instrucciónes para cambiar su contraseña",
    };
    const URI = {
        URI: "/api/session/login",
    };
    res.status(200).json({ message, URI });
};

export const resetPasswordForm = async (req, res) => {
    const token = req.params.token;
    jwt.verify(token, "secret", async (err, decoded) => {
        if (err) {
            errorLogger.fatal("errorLogger");
            const message = {
                message: err,
            };
            const URI = {
                URI: "/api/session/login",
            };
            res.status(500).json({ message, URI, formReset: false });
        }
        res.status(200).json({ formReset: true });
    });
};

export const validPassword = async (req, res) => {
    try {
        const password = req.body.newPassword;
        const email = req.body.email;
        const confirmPassword = req.body.confirmPassword;
        await sessionRepository.resetPasswordForm(email, password, confirmPassword);
        const message = {
            message: "La contraseña ha sido cambiada con exito."
        }
        const URI = {
            URI: "/api/session/login",
        };
        res.status(200).json({ message, URI });
    } catch (error) {
        errorLogger.fatal("Error to validate password");
        const message = {
            message: error,
        };
        const URI = {
            URI: "/api/session/login",
        };
        res.status(500).json({ message, URI });
    }
};

export const getProfile = async (req, res) => {
    const { user } = req.user;
    const userDB = await sessionRepository.getUserByEmail(user.email);
    res.status(200).json({ profile: userDB });
};

export const logoutUser = async (req, res) => {
    res.clearCookie("keyCookieJobsRoad").json({ logout: true });
    logInfo.info("User Disconect");
};
