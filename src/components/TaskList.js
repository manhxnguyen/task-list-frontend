import React, { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      const data = await taskService.getTasks(filter);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleTaskCreate = async (newTask) => {
    try {
      await taskService.createTask(newTask);
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleTaskUpdate = async (id, updates) => {
    try {
      await taskService.updateTask(id, updates);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto mb-8">
        <TaskForm onSubmit={handleTaskCreate} />
      </div>
      
      <div className="my-4 flex gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded cursor-pointer hover:opacity-90 ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded cursor-pointer hover:opacity-90 ${
            filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded cursor-pointer hover:opacity-90 ${
            filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={handleTaskUpdate}
            onDelete={handleTaskDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;