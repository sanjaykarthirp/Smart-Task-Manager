import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const TaskContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTasks = useCallback(async (filters = {}) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const res = await axios.get(`${API_URL}/tasks?${queryParams}`);
            setTasks(res.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    }, []);

    const addTask = async (taskData) => {
        try {
            const res = await axios.post(`${API_URL}/tasks`, taskData);
            setTasks([res.data, ...tasks]);
            toast.success('Task added successfully');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add task');
            return false;
        }
    };

    const updateTask = async (id, taskData) => {
        try {
            const res = await axios.put(`${API_URL}/tasks/${id}`, taskData);
            setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
            toast.success('Task updated successfully');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update task');
            return false;
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/tasks/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
            toast.success('Task deleted successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete task');
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, loading, fetchTasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
