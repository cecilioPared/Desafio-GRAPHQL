import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log("ingreso login");
  res.redirect("sign-in");
});

router.get("/sign-in", (req, res) => {
  let data = req.signedCookies.data;
  if (data) {
    data = JSON.parse(data);
  }  
  res.clearCookie("data").render("sign-in", data);
});

router.get("/sign-up", (req, res) => {
  let data = req.signedCookies.data;
  if (data) {
    data = JSON.parse(data);
  }
  res.clearCookie("data").render("sign-up", data);
});

router.get("/private", (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.user.email;
    res.render("private", { username: username });
  } else {
    res.redirect("/sign-in");
  }
});

router.get("/sign-out", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/sign-in");
  });
});

router.get('/error-login', (req, res) => {  
  res.render("error-login");
});

export default router;
