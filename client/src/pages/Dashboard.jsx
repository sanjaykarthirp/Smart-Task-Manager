import React, { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { Plus, Filter, SortDesc } from 'lucide-react';

const Dashboard = () => {
    const { tasks, loading, fetchTasks, addTask, updateTask, deleteTask } = useContext(TaskContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        sort: 'createdAt'
    });

    useEffect(() => {
        fetchTasks(filters);
    }, [fetchTasks, filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleOpenModal = (task = null) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const handleSaveTask = async (taskData) => {
        if (currentTask) {
            return await updateTask(currentTask._id, taskData);
        } else {
            return await addTask(taskData);
        }
    };

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'Completed').length,
        pending: tasks.filter(t => t.status === 'Pending').length,
        overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Completed').length
    };

    return (
        <div className="dashboard-page">
            <Navbar />
            
            <main className="container dashboard-container">
                {/* Stats Section */}
                <section className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Tasks</h3>
                        <p className="stat-value">{stats.total}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Completed</h3>
                        <p className="stat-value text-success">{stats.completed}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Pending</h3>
                        <p className="stat-value text-warning">{stats.pending}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Overdue</h3>
                        <p className="stat-value text-danger">{stats.overdue}</p>
                    </div>
                </section>

                <div className="dashboard-header">
                    <h2>My Tasks</h2>
                    <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                        <Plus size={18} /> Add Task
                    </button>
                </div>

                {/* Filters Section */}
                <section className="filters-section card">
                    <div className="filter-group">
                        <Filter size={16} className="text-secondary" />
                        <select className="form-control" name="status" value={filters.status} onChange={handleFilterChange}>
                            <option value="">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <select className="form-control" name="priority" value={filters.priority} onChange={handleFilterChange}>
                            <option value="">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    
                    <div className="filter-group">
                        <SortDesc size={16} className="text-secondary" />
                        <select className="form-control" name="sort" value={filters.sort} onChange={handleFilterChange}>
                            <option value="createdAt">Newest First</option>
                            <option value="dueDate">Due Date (Asc)</option>
                        </select>
                    </div>
                </section>

                {/* Task List */}
                <section className="tasks-grid">
                    {loading ? (
                        <div className="loader">Loading tasks...</div>
                    ) : tasks.length === 0 ? (
                        <div className="empty-state">
                            <p>No tasks found. Create one to get started!</p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard 
                                key={task._id} 
                                task={task} 
                                onEdit={handleOpenModal}
                                onDelete={deleteTask}
                            />
                        ))
                    )}
                </section>
            </main>

            <TaskModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveTask}
                initialData={currentTask}
            />
        </div>
    );
};

export default Dashboard;
