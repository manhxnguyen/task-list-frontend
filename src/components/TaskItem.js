import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(task.id, { title, description });
    setIsEditing(false);
  };

  const toggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
        className="h-5 w-5"
      />
      <div className="flex-1">
        <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        <p className={`text-gray-600 ${task.completed ? 'line-through' : ''}`}>
          {task.description}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;