import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUserCurrent,
  verifyUser,
  resetPassword,
  resetPasswordForm,
  restart,
  validPassword,
  getProfile,
  logoutUser,
  reSendToken
} from "../controllers/sessionController.js";
import passport from "passport";
const router = Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/login", (req, res) => {
  // if (Object.keys(req.cookies).length != 0) return res.redirect("/profile");
  // res.render("login", {});
  if (Object.keys(req.cookies).length != 0) return res.status(200).json({message:"Login Successfully",newAccess:true});
  //res.render("login", {});
});

// router.get(
//   "/logout",
//   passport.authenticate("jwt", { session: false }),logoutUser
// );

router.post(
  "/logout", logoutUser
)

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);

router.get("/verify/:token", verifyUser);

router.get("/reverify/:email", reSendToken);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  getUserCurrent
);

router.get("/resetPassword", resetPassword);

router.post("/restart", restart);

router.get("/resetPasswordForm/:token", resetPasswordForm);

router.post("/validPassword", validPassword);

export default router;
