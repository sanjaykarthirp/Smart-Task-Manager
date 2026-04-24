import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        dueDate: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
            });
        } else {
            setFormData({
                title: '',
                description: '',
                status: 'Pending',
                priority: 'Medium',
                dueDate: ''
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await onSave(formData);
        if (success) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content card">
                <div className="modal-header">
                    <h2>{initialData ? 'Edit Task' : 'Add New Task'}</h2>
                    <button className="btn-icon" onClick={onClose}><X size={20} /></button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Title *</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="title"
                            value={formData.title} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea 
                            className="form-control" 
                            name="description"
                            value={formData.description} 
                            onChange={handleChange} 
                            rows="3"
                        />
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group half">
                            <label className="form-label">Status</label>
                            <select 
                                className="form-control" 
                                name="status"
                                value={formData.status} 
                                onChange={handleChange}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        
                        <div className="form-group half">
                            <label className="form-label">Priority</label>
                            <select 
                                className="form-control" 
                                name="priority"
                                value={formData.priority} 
                                onChange={handleChange}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Due Date</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            name="dueDate"
                            value={formData.dueDate} 
                            onChange={handleChange} 
                        />
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
