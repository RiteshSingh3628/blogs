import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL
// const isFeaturedEnabled = import.meta.env.VITE_FEATURE_FLAG === 'true';

const API = axios.create({
    baseURL:baseUrl,
    headers: {
        'Content-Type':'application/json',
    }    
})



API.interceptors.request.use(
  (config) => {
    // If you have JWT auth
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);


// authentication API
export const authApi = {
    login: (data)=> API.post("/auth/login",data),
    logout:null,
    signup:null,
    google:null,
    facebook:null,
}
// blogs api
export const blogApi = {
    getAllBlog:()=> API.get("/blog/"),
    singleBlog:(slug)=>API.get(`/blog/${slug}`)
}

export const categoryApi = {
    getAllCategory: ()=> API.get("/category/"),
}

export default {
    authApi,
    blogApi,
    categoryApi

}
