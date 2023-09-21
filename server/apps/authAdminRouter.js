import { Router } from "express";
import { supabase } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const authAdminRouter = Router();

authAdminRouter.post("/register", async (req, res) => {
  try {
    const emailChecker = await supabase
      .from("admins")
      .select("*")
      .eq("admin_email", req.body.email);
    if (emailChecker.data[0]) {
      return res.json({ message: "Email already sign in" });
    } else {
      const adminData = {
        admin_email: req.body.email,
        admin_username: req.body.username,
        admin_password: req.body.password,
        admin_name: req.body.name,
      };
      const salt = await bcrypt.genSalt(10);
      adminData.admin_password = await bcrypt.hash(
        adminData.admin_password,
        salt
      );
      const resultSupabase = await supabase
        .from("admins")
        .insert([adminData])
        .select();
      if (resultSupabase.statusText === "Created") {
        return res.json({ message: "Register Successfully" });
      } else {
        const returnStatus = supabase.status;
        return res.status(returnStatus).json({
          message: resultSupabase.statusText,
          error: resultSupabase.error.details,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

authAdminRouter.post("/login", async (req, res) => {
  const role = req.body.role;
  console.log(req.body);
  try {
    if (role === "admin") {
      const supabaseResult = await supabase
        .from("admins")
        .select("*")
        .eq("admin_username", req.body.username);
      console.log(supabaseResult);
      if (supabaseResult.data.length !== 0) {
        const isValidPassword = await (req.body.password,
        supabaseResult.data[0].admin_password);

        if (role !== "admin") {
          return res.status(404).json({
            message: "user not found",
          });
        }

        if (!isValidPassword) {
          return res.status(200).json({
            message: { password: "Password Invalid" },
          });
        } else {
          const token = jwt.sign(
            {
              admin_username: supabaseResult.data[0].admin_username,
              admin_password: supabaseResult.data[0].admin_password,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "1d",
            }
          );
          return res.json({
            message: "Login Succesfully",
            token,
          });
        }
      } else {
        try {
          const supabaseResult = await supabase
            .from("users")
            .select("*")
            .eq("user_email", req.body.email);
          if (supabaseResult.data.length !== 0) {
            const isValidPassword = await bcrypt.compare(
              req.body.password,
              supabaseResult.data[0].user_password
            );
            if (!isValidPassword) {
              return res.status(200).json({
                message: { password: "Password Invalid" },
              });
            } else {
              const avatarPath = supabaseResult.data[0].user_avatar
                ? await supabase.storage
                    .from("user_avatars")
                    .getPublicUrl(supabaseResult.data[0].user_avatar)
                : null;
              const token = jwt.sign(
                {
                  user_id: supabaseResult.data[0].user_id,
                  user_email: supabaseResult.data[0].user_email,
                  user_name: supabaseResult.data[0].user_name,
                  user_education: supabaseResult.data[0].user_education,
                  user_dob: supabaseResult.data[0].user_dob,
                  user_avatar: avatarPath ? avatarPath.data.publicUrl : null,
                },
                process.env.SECRET_KEY,
                {
                  expiresIn: "1d",
                }
              );
              return res.json({
                message: "Login Succesfully",
                token,
              });
            }
          } else {
            return res.status(200).json({
              message: { email: "Email Invalid" },
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  console.log("Sending response");
});

export default authAdminRouter;
