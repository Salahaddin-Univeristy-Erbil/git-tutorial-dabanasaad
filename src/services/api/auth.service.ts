import apiClient from '../axios.instance';

export const authService = {
  async login(email: string, password: string, remember: boolean = false) {
    // 1️⃣ Fetch CSRF cookie first
    await apiClient.get('/sanctum/csrf-cookie');

    // 2️⃣ Send login request (cookies will be sent automatically)
    const response = await apiClient.post('api/login', {
      email,
      password,
      remember,
    });

    return response.data;
  },

  async register(data: {
    name: string;
    email: string;
    gender: string;
    password: string;
    password_confirmation: string;
  }) {
    // 1️⃣ Fetch CSRF cookie first
    await apiClient.get('/sanctum/csrf-cookie');

    // 2️⃣ Send registration request
    const response = await apiClient.post('/register', data);

    return response.data;
  },

  async logout() {
    // Logout using cookies
    const response = await apiClient.post('/logout');
    return response.data;
  },
};
