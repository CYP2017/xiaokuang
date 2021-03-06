// import Vue from 'vue';
import Vue from 'vue'
import axios from 'axios';

import {
  Message
} from 'element-ui';
import {
  setToken,
  loadToken
} from '@/utils/apiUtils';
import store from '@/store';
import route from '@/router'
import {
  requestPipe
} from '@/utils/repipe';
import i18n from '@/i18n/i18n';

//axios实例创建的service，能进行增加req res拦截器
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000,
  // 默认formData数据格式，
  // headers: {
  //   'Content-Type': 'multipart/form-data'
  // },
  transformRequest: [
    function (data) {
      let ret = "";
      let arr = [];
      for (let it in data) {
        ret +=
          encodeURIComponent(it) +
          "=" +
          encodeURIComponent(data[it]) +
          "&";
      }
      return ret
    }
  ]
})

service.interceptors.request.use(config => {
  let token = loadToken();
  // const loading = Loading.service(options); //此loading为全屏
  config.headers['Authorization'] = token; //每个请求携带token
  return config;
  if (token) {} else {} //请求时只添加token 不做验证
}, error => {
  console.log(error);
  Promise.reject(error);
})

service.interceptors.response.use(
  response => {
    var old = loadToken();

    requestPipe(response);
    // response时验证token，返回token并且与本地不同时，存储
    // if (response.headers.authorization && (response.headers.authorization != old)) {
    //   setToken(response.headers.authorization);
    //   console.log(old, response.headers.authorization, '更新token');
    // }
    if (response.headers.authorization) {

      setToken(response.headers.authorization);
      console.log(old, response.headers.authorization, '更新token');
    }

    // 返回status为-1时,状态为退出,跳转至登录;
    if (response.data.status == -1) {
      console.log('身份已过期');
      store.commit('LOGIN_OUT');
      //console.log(route.history.current.meta.member)
      let a = route.history.current.meta.member || false;
   
      Message({
        center: true,
        // message: '您的身份信息已过期，需重新登录',
        message: i18n.t('message.durDate'),
        duration: 1800,
        type: 'error',
        onClose: () => {
          if (!a) {
            window.location.replace('/login');
          }else{
          	if(route.history.current.name!='Trade'){
				        		 window.location.replace('/');		
				    }
          }

        }
      });
    }
    return response;
  },
  err => {
    // console.log(err);
    // Promise.reject(err);
    console.log('err' + err);
    Message({
      message: '服务器故障',
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(err);
  }
)

export default service;
