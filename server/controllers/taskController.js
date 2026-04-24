import Task from '../models/Task.js';

// @desc    Get logged in user tasks
// @route   GET /api/tasks
export const getTasks = async (req, res) => {
    try {
        const { status, priority, sort } = req.query;
        let query = { user: req.user._id };

        if (status) query.status = status;
        if (priority) query.priority = priority;

        let taskQuery = Task.find(query);

        if (sort === 'dueDate') {
            taskQuery = taskQuery.sort({ dueDate: 1 }); // 1 for ascending
        } else {
            taskQuery = taskQuery.sort({ createdAt: -1 }); // default newest first
        }

        const tasks = await taskQuery;
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new task
// @route   POST /api/tasks
export const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        const task = new Task({
            user: req.user._id,
            title,
            description,
            status,
            priority,
            dueDate
        });

        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
export const updateTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        task.title = title || task.title;
        task.description = description !== undefined ? description : task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.dueDate = dueDate || task.dueDate;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
