import axios from 'axios';
import { UNSAFE_NavigationContext } from 'react-router-dom';

const api = axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
    },

});

export const login =  async (data) => {
    let response;
    try {
        response = await api.post('/login', data)
    } catch (error) {
        return error;
    }

   return response;
};

export const signup =  async (data) => {
    let response;
    try {
        response = await api.post('/register', data)
    } catch (error) {
        return error;
    }

   return response;
};

export const signout =  async () => {
    let response;
    try {
        response = await api.post('/logout')
    } catch (error) {
        return error;
    }

   return response;
};

export const getAllProjects =  async () => {
    let response;
    try {
        response = await api.get('/project/all')
    } catch (error) {
        return error;
    }

   return response;
};

export const submitProject =  async (data) => {
    let response;
    try {
        response = await api.post('/project', data)
    } catch (error) {
        return error;
    }

   return response;
};

export const addInvestor =  async (data) => {
    let response;
    try {
        response = await api.post('/investor', data)
    } catch (error) {
        return error;
    }

   return response;
};

export const getProjectById =  async (id) => {
    let response;
    try {
        response = await api.get(`/project/${id}`)
    } catch (error) {
        return error;
    }

   return response;
};

export const getMyProjectsById =  async (id) => {
    let response;
    try {
        response = await api.get(`/myproject/${id}`,{ validateStatus:false})
    } catch (error) {
        return error;
    }

   return response;
};

export const getExpensesById =  async (id) => {
    let response;
    try {
        response = await api.get(`/expense/${id}`,{ validateStatus:false})
    } catch (error) {
        return error;
    }

   return response;
};

export const getInvestorsById =  async (id) => {
    let response;
    try {
        response = await api.get(`/investor/${id}`,{ validateStatus:false})
    } catch (error) {
        return error;
    }

   return response;
};

export const postExpense =  async (data) => {
    let response;
    try {
        response = await api.post('/expense', data)
    } catch (error) {
        return error;
    }

   return response;
};

export const deleteProject =  async (id) => {
    let response;
    try {
        response = await api.delete(`/project/${id}`)
    } catch (error) {
        return error;
    }

   return response;
};

// auto token refresh

// /protected-resource -> 401
// /refresh -> authenthicated state
// /protected-resource

api.interceptors.response.use(
    (config) => config,
    async (error) => {
      const originalReq = error.config;
  
      if (
        (error.response.status === 401 || error.response.status === 500) &&
        originalReq &&
        !originalReq._isRetry
      ) {
        originalReq.isRetry = true;
  
        try {
          await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`, {
            withCredentials: true,
          });
  
          return api.request(originalReq);
        } catch (error) {
          return error;
        }
      }
    }
  );