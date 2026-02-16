import { useTheme, Theme } from '../context/ThemeContext';

const themeConfig: Record<Theme, { color: string; label: string }> = {
  slate: { color: '#475569', label: 'Slate' },
  navy: { color: '#334e68', label: 'Navy' },
  charcoal: { color: '#333333', label: 'Charcoal' },
  gunmetal: { color: '#3e4c59', label: 'Gunmetal' },
  forest: { color: '#15803d', label: 'Forest' },
  olive: { color: '#4d5638', label: 'Olive' },
  burgundy: { color: '#8c1f3b', label: 'Burgundy' },
  leather: { color: '#71453a', label: 'Leather' },
};

export function ThemePicker() {
  const { theme, themes, setTheme } = useTheme();

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Theme</h3>
      <div className="grid grid-cols-4 gap-3">
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all hover:bg-gray-50 ${
              theme === t ? 'ring-2 ring-primary-600 bg-gray-50' : ''
            }`}
          >
            <div
              className="w-10 h-10 rounded-full shadow-inner"
              style={{ backgroundColor: themeConfig[t].color }}
            />
            <span className="text-sm font-medium text-gray-700">
              {themeConfig[t].label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
