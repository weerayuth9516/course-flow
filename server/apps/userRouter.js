import { Router } from "express";
import { supabase } from "../utils/db.js";
import "dotenv/config";
const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const results = await supabase.from("users").select("*");
  if (results.statusText === "OK") {
    return res.json({ data: results.data });
  } else {
    return res.status(400).send(`API ERROR : ${results.error}`);
  }
});

userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const results = await supabase.from("users").select("*").eq("user_id", id);
  if (results.statusText === "OK") {
    return res.json({ data: results.data });
  } else {
    return res.status(400).send(`API ERROR : ${results.error}`);
  }
});

userRouter.post("/", async (req, res) => {
  const results = await supabase.from("users").insert([
    {
      user_name: `${req.body.user_name}`,
      user_education: `${req.body.user_education}`,
      user_dob: `${req.body.user_dob}`,
    },
  ]);
  if (results.statusText === "OK") {
    return res.json({ message: "Create users successfully." });
  } else {
    return res.status(400).send(`API ERROR`);
  }
});

userRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const results = await supabase
    .from("users")
    .update({
      user_name: `${req.body.user_name}`,
      user_education: `${req.body.user_education}`,
      user_dob: `${req.body.user_dob}`,
    })
    .eq("user_id", id)
    .select();
  if (results.statusText === "OK") {
    return res.json({ message: "Update users successfully." });
  } else {
    return res.status(400).send(`API ERROR`);
  }
});

userRouter.put("/avatar/:id", async (req, res) => {
  const id = req.params.id;
  let results;
  if (req.body.user_avatar === null) {
    console.log(null);
    results = await supabase
      .from("users")
      .update({
        user_avatar: null,
      })
      .eq("user_id", id)
      .select();
    const resultFromStorageTable = await supabase.storage
      .from("user_avatars/user_avatar")
      .remove([`/${req.body.imgPath}`]);
    console.log(resultFromStorageTable);
  }

  if (results.statusText === "OK") {
    return res.json({ message: "Update users successfully." });
  } else {
    return res.status(400).send(`API ERROR`);
  }
});
userRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const results = await supabase.from("users").delete().eq("user_id", id);
  console.log(results);
  if (results.status === 204) {
    return res.json({ message: "Deleted users successfully." });
  } else {
    return res.status(400).send(`API ERROR`);
  }
});
export default userRouter;
