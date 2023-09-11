import { Router } from "express";
import { supabase } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const userData = {
      user_email: req.body.email,
      user_password: req.body.password,
      user_education: req.body.education,
      user_dob: req.body.birthDate,
      user_name: req.body.name,
    };
    const salt = await bcrypt.genSalt(10);
    userData.user_password = await bcrypt.hash(userData.user_password, salt);
    const resultSupabase = await supabase
      .from("users")
      .insert([userData])
      .select();
    if (resultSupabase.statusText === "Created") {
      return res.json({ message: "Register Successfully." });
    } else {
      const returnStatus = supabase.status;
      return res.status(returnStatus).json({
        message: resultSupabase.statusText,
        error: resultSupabase.error.details,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const supabaseResult = await supabase
      .from("users")
      .select("*")
      .eq("user_email", req.body.email);
    if (supabaseResult.statusText === "OK") {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        supabaseResult.data[0].user_password
      );
      if (!isValidPassword) {
        return res.json({
          message: "Password Invalid",
        });
      } else {
        const avatarPath = await supabase.storage
          .from("user_avatars")
          .getPublicUrl(supabaseResult.data[0].user_avatar);
        const token = jwt.sign(
          {
            user_id: supabaseResult.data[0].user_id,
            user_email: supabaseResult.data[0].user_email,
            user_name: supabaseResult.data[0].user_name,
            user_education: supabaseResult.data[0].user_education,
            user_dob: supabaseResult.data[0].user_dob,
            user_avatar: avatarPath.data.publicUrl,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "90000",
          }
        );
        return res.json({
          message: "Login Succesfully",
          token,
        });
      }
    } else {
      return res.json({
        message: "Email Invalid",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default authRouter;
