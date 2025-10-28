import React, { useState, useMemo, useEffect } from 'react';
import { Hymn, Theme } from './types';
import { ALL_HYMNS } from './constants';
import { HymnList } from './components/HymnList';
import { HymnDetail } from './components/HymnDetail';
import { FontSizeControl } from './components/FontSizeControl';
import { AppLogo, BackIcon, SearchIcon, MenuIcon, CloseIcon } from './components/icons';

const themeOptions: { name: Theme; label: string; classes: string }[] = [
  { name: 'dark', label: 'Dark', classes: 'bg-slate-800 border-slate-600' },
  { name: 'light', label: 'Light', classes: 'bg-white border-slate-300' },
  { name: 'sepia', label: 'Sepia', classes: 'bg-amber-100 border-amber-300' },
];

const AboutModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}> = ({ isOpen, onClose, currentTheme, onThemeChange }) => {
  if (!isOpen) return null;

  const handleThemeSelect = (theme: Theme) => {
    onThemeChange(theme);
    onClose();
  };

  const themeClasses = {
    dark: {
      modalBg: 'bg-slate-800 border-slate-700',
      title: 'text-white',
      text: 'text-slate-300',
      textMuted: 'text-slate-500',
      closeIcon: 'text-slate-400 hover:text-white',
      themeButtonHover: 'hover:bg-slate-700',
      themeButtonActiveRing: 'ring-cyan-400'
    },
    light: {
      modalBg: 'bg-white border-slate-200',
      title: 'text-slate-900',
      text: 'text-slate-600',
      textMuted: 'text-slate-400',
      closeIcon: 'text-slate-500 hover:text-slate-900',
      themeButtonHover: 'hover:bg-slate-100',
      themeButtonActiveRing: 'ring-blue-500'
    },
    sepia: {
      modalBg: 'bg-amber-50 border-amber-200',
      title: 'text-amber-900',
      text: 'text-amber-800',
      textMuted: 'text-amber-500',
      closeIcon: 'text-amber-600 hover:text-amber-900',
      themeButtonHover: 'hover:bg-amber-100',
      themeButtonActiveRing: 'ring-orange-600'
    },
  };
  const classes = themeClasses[currentTheme];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 border relative ${classes.modalBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 transition-colors ${classes.closeIcon}`}
          aria-label="Close modal"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={classes.title}><AppLogo /></div>
          <h2 className={`text-2xl font-bold mt-4 ${classes.title}`}>Malagasy Hymnal</h2>
          <p className={`${classes.text} mt-2`}>
            A digital hymnal app for Malagasy hymns.
          </p>
          <p className={`text-xs mt-6 ${classes.textMuted}`}>
            Inspired by a traditional hymnal PDF.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <h3 className={`text-sm font-semibold text-center mb-4 ${classes.text}`}>Appearance</h3>
          <div className="grid grid-cols-3 gap-4">
            {themeOptions.map(({ name, label, classes: themeIconClasses }) => (
              <button
                key={name}
                onClick={() => handleThemeSelect(name)}
                className={`flex flex-col items-center space-y-2 p-2 rounded-lg transition-all ${classes.themeButtonHover} ${currentTheme === name ? `ring-2 ${classes.themeButtonActiveRing}` : ''}`}
              >
                <span className={`w-10 h-10 rounded-full border-2 ${themeIconClasses}`}></span>
                <span className={`text-xs ${classes.text}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Header: React.FC<{
  selectedHymn: Hymn | null;
  onBack: () => void;
  onOpenAbout: () => void;
  theme: Theme;
}> = ({ selectedHymn, onBack, onOpenAbout, theme }) => {
  const themeClasses = {
    dark: {
      bg: 'bg-slate-900/80',
      text: 'text-slate-100',
      icon: 'text-slate-300 hover:text-white',
    },
    light: {
      bg: 'bg-white/80',
      text: 'text-slate-900',
      icon: 'text-slate-600 hover:text-slate-900',
    },
    sepia: {
      bg: 'bg-amber-50/80',
      text: 'text-amber-900',
      icon: 'text-amber-700 hover:text-amber-900',
    },
  };
  const classes = themeClasses[theme];
  return (
    <header className={`sticky top-0 z-10 backdrop-blur-md shadow-lg ${classes.bg}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {selectedHymn ? (
            <button
              onClick={onBack}
              className={`p-2 -ml-2 transition-colors ${classes.icon}`}
              aria-label="Back to list"
            >
              <BackIcon className="h-6 w-6" />
            </button>
          ) : (
            <button
              onClick={onOpenAbout}
              className={`p-2 -ml-2 transition-colors ${classes.icon}`}
              aria-label="Open about modal"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          )}

          <div className="flex-1 text-center truncate px-4">
            <h1 className={`text-xl font-bold truncate ${classes.text}`}>
              {selectedHymn ? `${selectedHymn.id}. ${selectedHymn.title}` : 'Malagasy Hymnal'}
            </h1>
          </div>
          <div className="w-10">{/* Spacer */}</div>
        </div>
      </div>
    </header>
  );
};

const SearchBar: React.FC<{
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  theme: Theme;
}> = ({ searchTerm, onSearchTermChange, theme }) => {
  const themeClasses = {
    dark: {
      bg: 'bg-slate-900',
      inputBg: 'bg-slate-800',
      text: 'text-white',
      placeholder: 'placeholder-slate-400',
      icon: 'text-slate-400',
      ring: 'focus:ring-cyan-500',
      ringOffset: 'focus:ring-offset-slate-800',
      clearIcon: 'text-slate-400 hover:text-white',
    },
    light: {
      bg: 'bg-white',
      inputBg: 'bg-slate-100',
      text: 'text-slate-900',
      placeholder: 'placeholder-slate-500',
      icon: 'text-slate-500',
      ring: 'focus:ring-blue-500',
      ringOffset: 'focus:ring-offset-slate-100',
      clearIcon: 'text-slate-500 hover:text-slate-900',
    },
    sepia: {
      bg: 'bg-amber-50',
      inputBg: 'bg-amber-100',
      text: 'text-amber-900',
      placeholder: 'placeholder-amber-600',
      icon: 'text-amber-600',
      ring: 'focus:ring-orange-600',
      ringOffset: 'focus:ring-offset-amber-100',
      clearIcon: 'text-amber-600 hover:text-amber-900',
    },
  };
  const classes = themeClasses[theme];
  return (
    <div className={`sticky top-16 z-10 p-4 ${classes.bg}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className={`h-5 w-5 ${classes.icon}`} />
        </div>
        <input
          type="text"
          placeholder="Search by number, title, or lyrics..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className={`w-full rounded-full py-3 pl-10 pr-10 focus:outline-none focus:ring-2 border border-transparent ${classes.inputBg} ${classes.text} ${classes.placeholder} ${classes.ring}`}
        />
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              onClick={() => onSearchTermChange('')}
              className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${classes.ring} ${classes.ringOffset}`}
              aria-label="Clear search"
            >
              <CloseIcon className={`h-5 w-5 transition-colors ${classes.clearIcon}`} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('hymnal-theme');
    return (savedTheme as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('hymnal-theme', theme);
  }, [theme]);

  const fontSizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
  const [fontSizeIndex, setFontSizeIndex] = useState(2);

  const handleIncreaseFontSize = () => setFontSizeIndex(prev => Math.min(prev + 1, fontSizes.length - 1));
  const handleDecreaseFontSize = () => setFontSizeIndex(prev => Math.max(prev - 1, 0));

  const filteredHymns = useMemo(() => {
    if (!searchTerm) return ALL_HYMNS;
    const lowercasedFilter = searchTerm.toLowerCase();
    return ALL_HYMNS.filter(hymn =>
      hymn.title.toLowerCase().includes(lowercasedFilter) ||
      hymn.id.toString().includes(lowercasedFilter) ||
      hymn.lyrics.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm]);

  const handleSelectHymn = (hymn: Hymn) => {
    setSelectedHymn(hymn);
    window.scrollTo(0, 0);
  };

  const handleBack = () => setSelectedHymn(null);
  
  const themeClasses = {
    dark: 'bg-slate-900',
    light: 'bg-white',
    sepia: 'bg-amber-50',
  };

  return (
    <div className={`min-h-screen ${themeClasses[theme]}`}>
      <Header
        selectedHymn={selectedHymn}
        onBack={handleBack}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        theme={theme}
      />
      <main>
        {selectedHymn ? (
          <HymnDetail
            hymn={selectedHymn}
            fontSizeClass={fontSizes[fontSizeIndex]}
            theme={theme}
          />
        ) : (
          <>
            <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} theme={theme} />
            <HymnList hymns={filteredHymns} onSelectHymn={handleSelectHymn} theme={theme} />
          </>
        )}
      </main>
      {selectedHymn && (
        <FontSizeControl
          onIncrease={handleIncreaseFontSize}
          onDecrease={handleDecreaseFontSize}
          theme={theme}
        />
      )}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        currentTheme={theme}
        onThemeChange={setTheme}
      />
    </div>
  );
};

export default App;