import axios from "axios";

// const resolvedBaseUrl = "http://127.0.0.1:8000" ;
const resolvedBaseUrl = "https://smart-video-summarizer-cjst.onrender.com";

const api = axios.create({
  baseURL: resolvedBaseUrl,
});

export default api;
