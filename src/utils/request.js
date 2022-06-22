import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
const server = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 3000,
  headers: { "X-Custom-Header": "foobar" },
});

//请求拦截器
server.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "";
  },
  (error) => {
    console.log("err" + error);
    ElMessage({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

//响应拦截器
server.interceptors.response.use(
  (response) => {
    //get data form response
    const res = response.data;

    if (res.code !== 2000) {
      ElMessage({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });
    }

    if([50008,50012,50014].includes(res.code)){
        ElMessageBox.confirm("你可能已经登出，你可以取消去继续停留在这个页面，或者去重新登录","确认登出",{
            confirmButtonText:'重新登录',
            cancelButtonText:'取消'
        }).then(()=>{
            
        });
        return Promise.reject(new Error(res.message || 'Error'))
    }
    
    return res;
  },
  (error) => {
    console.log("error" + error);
    ElMessage({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
  }
);

//导出server
export default server;
