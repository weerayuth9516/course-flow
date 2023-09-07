import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      setIsError(false);
      setIsLoading(true);
      await axios.put(`http://localhost:4001/users/${id}`, data, {
        headers: { "content-type": "multipart/form-data" },
      });

      setIsLoading(false);
      navigate("/");
    } catch (error) {
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
