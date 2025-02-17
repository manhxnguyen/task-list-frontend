import axios from 'axios';

const API_URL = 'http://localhost:3002/api/v1';

export const taskService = {
  getTasks: async (filter) => {
    const response = await axios.get(`${API_URL}/tasks`, {
      params: { filter }
    });
    return response.data;
  },

  createTask: async (task) => {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  },

  updateTask: async (id, task) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
  }
};