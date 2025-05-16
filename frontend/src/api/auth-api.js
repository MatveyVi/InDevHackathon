import api from "../api";

export const login = async (phone, password) => {
    const res = await api.post('/user/login', {
        phone,
        password
    });

    const { token } = res.data;
    localStorage.setItem('token', token);
};
export const register = async (phone, name, password) => {
    console.log("AUTHAPI")
    const res = await api.post('/user/register', {
      phone,
      name,
      password,
    });
  
    return res.data;
  };

