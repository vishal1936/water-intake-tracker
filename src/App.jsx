import React from 'react';
import AddWater from './components/AddWater';
import ProgressBar from './components/ProgressBar';
import History from './components/History';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset today\'s data?')) {
      localStorage.setItem('waterTotal', 0);
      localStorage.setItem('waterHistory', JSON.stringify([]));
      window.location.reload(); // App को refresh कर दो
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">💧 Water Intake Tracker</h1>

      {/* Reset Button */}
      {/* <img
  src="https://cdn-icons-png.flaticon.com/512/728/728093.png"
  alt="water"
  className="w-12 mx-auto mb-2 animate-bounce"
/> */}

      

      <ProgressBar />
      <AddWater />
      <button
        onClick={handleReset}
        className="mb-4 bg-red-500 text-white px-3 py-1 rounded"
      >
        🔄 Reset Today's Data
      </button>
      <History />
      <ToastContainer position="top-right" autoClose={2000} />


    </div>
  );
}

export default App;
