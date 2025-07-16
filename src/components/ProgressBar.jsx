import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ goal }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedTotal = parseInt(localStorage.getItem('waterTotal')) || 0;
    setTotal(storedTotal);

    const handleStorageChange = () => {
      const updatedTotal = parseInt(localStorage.getItem('waterTotal')) || 0;
      setTotal(updatedTotal);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const percent = Math.min((total / goal) * 100, 100).toFixed(1);

  // Dynamic progress bar color
  let barColor = 'bg-blue-500';
  if (percent >= 100) barColor = 'bg-green-500';
  else if (percent < 30) barColor = 'bg-red-400';

  return (
    <motion.div
      className="mb-6 bg-white p-4 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-2 text-center text-lg font-semibold text-blue-800">
        🚰 Daily Progress
      </div>

      <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${barColor}`}
          style={{ width: `${percent}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>

      <div className="mt-2 text-center">
        <span className="font-medium">
          {total} / {goal} ml ({percent}%)
        </span>
        <p className="text-sm text-gray-600 mt-1">
          💡 Tip: You're {goal - total <= 0 ? 0 : goal - total} ml away from your goal!
        </p>
      </div>
    </motion.div>
  );
};

export default ProgressBar;
