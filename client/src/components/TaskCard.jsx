import React from 'react';
import { Calendar, Clock, Edit2, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
    
    const formatDate = (dateString) => {
        if (!dateString) return 'No due date';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed';

    return (
        <div className={`card task-card ${isOverdue ? 'overdue' : ''}`}>
            <div className="task-header">
                <h3 className={`task-title ${task.status === 'Completed' ? 'completed-text' : ''}`}>
                    {task.title}
                </h3>
                <div className="task-actions">
                    <button className="btn-icon text-primary" onClick={() => onEdit(task)}>
                        <Edit2 size={16} />
                    </button>
                    <button className="btn-icon text-danger" onClick={() => onDelete(task._id)}>
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
            
            <p className="task-desc">{task.description}</p>
            
            <div className="task-footer">
                <div className="task-badges">
                    <span className={`badge status-${task.status.toLowerCase()}`}>
                        {task.status}
                    </span>
                    <span className={`badge priority-${task.priority.toLowerCase()}`}>
                        {task.priority} Priority
                    </span>
                </div>
                
                <div className={`task-date ${isOverdue ? 'text-danger' : 'text-secondary'}`}>
                    <Calendar size={14} />
                    <span>{formatDate(task.dueDate)}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
