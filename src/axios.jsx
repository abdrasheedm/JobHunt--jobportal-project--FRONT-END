import axios from "axios";
import { useContext } from "react";
import { BASEURL } from "./Constants";

console.log(BASEURL);


const instance = axios.create({
    baseURL:`${BASEURL}/api/`
})

export default instance