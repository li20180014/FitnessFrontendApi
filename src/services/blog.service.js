import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/blogs";


class BlogService {


  getBlogs() {
    return axios.get(API_URL);
  }

  createPost(title,text,type,imageSrc){
    const token = JSON.stringify(authHeader());
    return axios.post(API_URL, {title,text,type,imageSrc},  
        { headers: authHeader() });
}

deleteBlog(id){
  const token = JSON.stringify(authHeader());
  return axios.delete("http://localhost:8080/api/v1/blogs/"+id,   
      { headers: authHeader() },
      );
}
  
}
export default new BlogService();