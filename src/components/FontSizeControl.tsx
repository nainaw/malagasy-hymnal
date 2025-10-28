import React from 'react';
import { PlusIcon, MinusIcon } from './icons';
import { Theme } from '../types';

interface FontSizeControlProps {
  onIncrease: () => void;
  onDecrease: () => void;
  theme: Theme;
}

const themeClasses = {
  dark: {
    button: 'bg-slate-800/70 text-white hover:bg-slate-700 focus:ring-cyan-500',
  },
  light: {
    button: 'bg-white/70 text-slate-800 hover:bg-slate-200 focus:ring-blue-500',
  },
  sepia: {
    button: 'bg-amber-100/70 text-amber-900 hover:bg-amber-200 focus:ring-orange-600',
  },
};

export const FontSizeControl: React.FC<FontSizeControlProps> = ({ onIncrease, onDecrease, theme }) => {
  const classes = themeClasses[theme];
  return (
    <div className="fixed bottom-6 right-6 z-20 flex flex-col space-y-2">
      <button
        onClick={onIncrease}
        aria-label="Increase font size"
        className={`backdrop-blur-md rounded-full p-3 shadow-lg transition-colors focus:outline-none focus:ring-2 ${classes.button}`}
      >
        <PlusIcon className="h-6 w-6" />
      </button>
      <button
        onClick={onDecrease}
        aria-label="Decrease font size"
        className={`backdrop-blur-md rounded-full p-3 shadow-lg transition-colors focus:outline-none focus:ring-2 ${classes.button}`}
      >
        <MinusIcon className="h-6 w-6" />
      </button>
    </div>
  );
};
