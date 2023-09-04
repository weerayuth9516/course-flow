import { Router } from "express";
import { supabase } from "../utils/db.js";
import "dotenv/config";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const results = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  });
  await supabase
    .from("users")
    .insert(results.data)
    .eq("user_id", results.data.id);
  //   if (results.error === null) {
  //     const response = await supabase.from("users").insert([
  //       {
  //         user_id: results.data.user.id,
  //         user_name: "Jirayut",
  //         user_lastname: "Roodprayun",
  //       },
  //     ]);
  //     console.log(response);
  //     return res.send("Created.");
  //   }
  console.log(results);
  return res.send("Created.");
});

authRouter.get("/login", async (req, res) => {
  const results = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  });
  console.log(results);
  return res.json({});
});

export default authRouter;
