import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/sign-in",
  passport.authenticate("sign-in", {
    successRedirect: "/private",
    failureRedirect: "/error-login",
    failureMessage: true    
  }),
  (req, res) => {    
    res.redirect("/private");
  }
);

router.post(
  "/sign-up",
  passport.authenticate("sign-up", {
    successRedirect: "/private",
    failureRedirect: "/error-login",
    failureMessage: true    
  }),
  (req, res) => {    
    res.redirect("/private");
  }
);

router.post("/sign-out", (req, res, next) => {
  const { user } = req;
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.json({ message: `Goodbye ${user.email}.` });
  });
});

export default router;
