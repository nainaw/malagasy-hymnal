
import React from 'react';
import { Hymn, Theme } from '../types';

interface HymnListProps {
  hymns: Hymn[];
  onSelectHymn: (hymn: Hymn) => void;
  theme: Theme;
}

const themeClasses = {
  dark: {
    button: 'bg-slate-800 hover:bg-slate-700 focus:ring-cyan-500',
    id: 'text-cyan-400',
    title: 'text-slate-100',
  },
  light: {
    button: 'bg-slate-100 hover:bg-slate-200 focus:ring-blue-500',
    id: 'text-blue-600',
    title: 'text-slate-800',
  },
  sepia: {
    button: 'bg-amber-100 hover:bg-amber-200 focus:ring-orange-600',
    id: 'text-orange-700',
    title: 'text-amber-900',
  },
};

export const HymnList: React.FC<HymnListProps> = ({ hymns, onSelectHymn, theme }) => {
  const classes = themeClasses[theme];

  return (
    <div className="pt-4 pb-20 px-4">
      <ul className="space-y-3">
        {hymns.map((hymn) => (
          <li key={hymn.id}>
            <button
              onClick={() => onSelectHymn(hymn)}
              className={`w-full text-left p-4 rounded-lg transition-colors focus:outline-none focus:ring-2 ${classes.button}`}
            >
              <div className="flex items-center space-x-4">
                <span className={`${classes.id} font-bold text-lg w-10 text-center`}>{hymn.id}</span>
                <span className={`${classes.title} font-medium`}>{hymn.title}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
