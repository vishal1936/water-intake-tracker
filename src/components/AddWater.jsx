import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const AddWater = () => {
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(
    parseInt(localStorage.getItem('waterTotal')) || 0
  );

  const handleAdd = (ml) => {
    if (!ml || ml <= 0) {
      toast.warn('⚠️ Enter a valid amount!');
      return;
    }

    const newTotal = total + ml;
    setTotal(newTotal);
    localStorage.setItem('waterTotal', newTotal);
    saveHistory(ml);
    setAmount('');
    toast.success(`✅ Added ${ml} ml`);
  };

  const saveHistory = (ml) => {
    const history = JSON.parse(localStorage.getItem('waterHistory')) || [];
    const now = new Date();
    history.push({
      amount: ml,
      time: now.toLocaleTimeString(),
      date: now.toLocaleDateString(),
    });
    localStorage.setItem('waterHistory', JSON.stringify(history));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="my-6 p-4 bg-white rounded-lg shadow-md"
    >
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter ml"
        className="border px-3 py-2 rounded mr-2 w-1/2"
      />
      <button
        onClick={() => handleAdd(Number(amount))}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add
      </button>

      <div className="mt-4 flex justify-center gap-2">
        {[250, 500, 750].map((val) => (
          <button
            key={val}
            onClick={() => handleAdd(val)}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
          >
            +{val} ml
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default AddWater;
