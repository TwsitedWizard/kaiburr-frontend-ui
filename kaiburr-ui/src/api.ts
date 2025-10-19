import axios from 'axios';
import { Task } from './types'; 

const apiClient = axios.create({
    baseURL: 'http://localhost:30080', //Kubernetes NodePort URL
});

export const getTasks = () => apiClient.get<Task[]>('/tasks/');
export const createTask = (task: Omit<Task, 'id' | 'taskExecutions'>) => apiClient.put<Task>('/tasks/', task);
export const deleteTask = (id: string) => apiClient.delete(`/tasks/${id}`);
export const executeTask = (id: string) => apiClient.put<string>(`/tasks/execute/${id}`);
export const findTasksByName = (name: string) => apiClient.get<Task[]>(`/tasks/find/by-name/${name}`);