import { Router } from "express";
import { supabase } from "../utils/db.js";
import "dotenv/config";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const emailChecker = await supabase
    .from("users")
    .select("*")
    .eq("user_email", req.body.email);
  if (emailChecker.data.length === 0) {
    const results = await supabase.auth.signUp({
      email: req.body.email,
      password: req.body.password,
    });
    if (results.error !== null) {
      return res.json({ message: "Register user sucessefully." });
    } else {
      return res.status(400).json({ message: "API INVALID" });
    }
  } else {
    return res.status(400).json({ message: "Email Invalid" });
  }
});

authRouter.post("/login", async (req, res) => {
  const emailReq = req.body.email;
  const passwordReq = req.body.password;
  const emailChecker = await supabase
    .from("users")
    .select("*")
    .eq("user_email", emailReq);
  if (emailChecker.data.length !== 0) {
    const results = await supabase.auth.signInWithPassword({
      email: emailReq,
      password: passwordReq,
    });

    if (results.error !== null) {
      return res.json({
        message: "Password Invalid",
      });
    } else {
      // const se = await supabase.auth.getSession();
      // console.log(se);
      return res.json({ message: "API Invalid" });
    }
  } else {
    return res.json({
      message: "Email Invalid",
    });
  }
});

export default authRouter;
