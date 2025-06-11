import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import { useContent } from '../context/ContentContext';

const EditableText = ({ 
  value, 
  onSave, 
  className = '', 
  multiline = false, 
  placeholder = 'Click to edit...',
  type = 'text'
}) => {
  const { isEditing } = useContent();
  const [isLocalEditing, setIsLocalEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleSave = () => {
    onSave(localValue);
    setIsLocalEditing(false);
  };

  const handleCancel = () => {
    setLocalValue(value);
    setIsLocalEditing(false);
  };

  if (!isEditing) {
    return <span className={className}>{value}</span>;
  }

  if (isLocalEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className={`${className} bg-white/10 border border-primary-400 rounded-lg p-2 text-white placeholder-gray-400 resize-none`}
            placeholder={placeholder}
            rows={4}
            autoFocus
          />
        ) : (
          <input
            type={type}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className={`${className} bg-white/10 border border-primary-400 rounded-lg p-2 text-white placeholder-gray-400`}
            placeholder={placeholder}
            autoFocus
          />
        )}
        <div className="flex space-x-2 mt-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            <FiCheck size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCancel}
            className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            <FiX size={16} />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <span className={className}>{value}</span>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsLocalEditing(true)}
        className="absolute -top-2 -right-2 p-1 bg-primary-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FiEdit2 size={12} />
      </motion.button>
    </div>
  );
};

export default EditableText;