import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const History = () => {
  const [todayHistory, setTodayHistory] = useState([]);

  useEffect(() => {
    loadHistory();
    const interval = setInterval(loadHistory, 1000); // Auto-refresh every 1 sec
    return () => clearInterval(interval);
  }, []);

  const loadHistory = () => {
    const history = JSON.parse(localStorage.getItem('waterHistory')) || [];
    const today = new Date().toLocaleDateString();
    const filtered = history.filter((entry) => entry.date === today);
    setTodayHistory(filtered.reverse()); // Latest on top
  };

  return (
    <motion.div
      className="mt-6 text-left bg-white rounded-xl shadow-md p-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-3 text-blue-700">
        📅 Today's History
      </h2>

      {todayHistory.length === 0 ? (
        <p className="text-gray-500 italic">No records yet.</p>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-3">
            Total Records: {todayHistory.length}
          </p>
          <div className="max-h-64 overflow-y-auto pr-1 custom-scroll">
            <ul className="space-y-2">
              {todayHistory.map((entry, index) => (
                <motion.li
                  key={index}
                  className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md shadow-sm hover:shadow-md transition"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  💧 <span className="font-semibold text-blue-800">
                    {entry.amount} ml
                  </span>{' '}
                  at{' '}
                  <span className="text-sm text-gray-700">{entry.time}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default History;
