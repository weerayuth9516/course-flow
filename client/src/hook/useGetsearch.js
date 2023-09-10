import { useState } from "react";
import axios from "axios";

function useGetsearch() {
  const [searchList, setSearchList] = useState([]);
  const [inputText, setInputText] = useState("");

  const getSearchList = async (input, limit) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/courses?title=${input}&limit=${limit}`
      );
      setSearchList(response.data.data);
    } catch (error) {
      console.log("request error");
    }
  };
  return { searchList, setSearchList, inputText, setInputText, getSearchList };
}

export default useGetsearch;
