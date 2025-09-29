import axios from "axios";
import Cookies from "js-cookie";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const nextServer = axios.create({ baseURL, withCredentials: true });

export default nextServer;