import axios from "axios";
const baseURL = "http://localhost:3000/media";

export  const getData = async function() {
      try { 
             return await axios.get(baseURL);
    } catch (error) {
        console.error(error);
      }
  }