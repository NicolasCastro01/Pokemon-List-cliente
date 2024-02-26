import axios from "axios";
import { API_URL } from "../config";

const httpClient = axios.create({ baseURL: API_URL, withCredentials: true });

export { httpClient };

