import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

const useGetuser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getCurrentUser = async (id) => {
    try {
      if (id !== null) {
        setIsError(false);
        setIsLoading(true);
        const userDataFromServer = await axios.get(
          `http://localhost:4001/users/${id}`
        );
        setUser(userDataFromServer.data.data[0]);
        console.log(userDataFromServer.data.data[0]);
      } else {
        setUser({});
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const updateAvatarProfilById = async (id, data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.put(`http://localhost:4001/users/avatar/${id}`, data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const updateUserProfileById = async (id, data) => {
    try {
      let results;
      setIsError(false);
      setIsLoading(true);
      console.log(data.avatarObj.size);
      if (data.avatarObj.size > 2097152) {
        alert("File too large");
      } else {
        const typeFile = data.avatarObj.name.substring(
          data.avatarObj.name.lastIndexOf(".") + 1
        );

        if (
          typeFile.toLowerCase() === "jpg" ||
          typeFile.toLowerCase() === "png" ||
          typeFile.toLowerCase() === "jpeg"
        ) {
          results = await supabase.storage
            .from("user_avatars")
            .upload(`${data.avatarObj.name}`, data.avatarObj, {
              cacheControl: "3600",
              upsert: true,
              contentType: `${data.avatarObj.type}`,
            });
          if (results.error === null) {
            data = { ...data, user_avatar: `${data.avatarObj.name}` };
            await axios.put(`http://localhost:4001/users/${id}`, data);
            setIsLoading(false);
            navigate("/");
          } else {
            console.log(results.error);
          }
        } else {
          alert("Type File invalid.");
        }
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };
  return {
    user,
    setUser,
    getCurrentUser,
    updateUserProfileById,
    updateAvatarProfilById,
    isError,
    isLoading,
  };
};
export default useGetuser;
