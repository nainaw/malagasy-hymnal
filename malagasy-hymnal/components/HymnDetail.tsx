import React from 'react';
import { Hymn, Theme } from '../types';

interface HymnDetailProps {
  hymn: Hymn;
  fontSizeClass: string;
  theme: Theme;
}

const themeClasses = {
  dark: {
    bg: 'bg-slate-900',
    text: 'text-slate-200',
    accent: 'text-cyan-400',
  },
  light: {
    bg: 'bg-white',
    text: 'text-slate-700',
    accent: 'text-blue-600',
  },
  sepia: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    accent: 'text-orange-700',
  },
};

export const HymnDetail: React.FC<HymnDetailProps> = ({ hymn, fontSizeClass, theme }) => {
  const classes = themeClasses[theme];
  
  const renderLyrics = () => {
    return hymn.lyrics.split('\n').map((line, index) => {
      if (line.trim().match(/^\d+$/) && line.trim().length < 3) {
        // Style verse numbers
        return <p key={index} className={`${classes.accent} font-bold mt-4 mb-2`}>{line}</p>;
      }
      if (line.trim() === '') {
        // Render empty lines for stanza breaks
        return <div key={index} className="h-4"></div>;
      }
      return <p key={index} className={classes.text}>{line}</p>;
    });
  };

  return (
    <div className={`p-6 leading-relaxed text-slate-100 pb-20 transition-all duration-200 ease-in-out ${fontSizeClass} ${classes.bg}`}>
      <div className="whitespace-pre-wrap font-serif">
        {renderLyrics()}
      </div>
    </div>
  );
};
