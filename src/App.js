import React from 'react';
import './App.css';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <TaskList />
      </main>
    </div>
  );
}

export default App;
