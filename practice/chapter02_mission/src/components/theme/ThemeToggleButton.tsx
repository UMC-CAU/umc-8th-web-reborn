import React from 'react'
import { useTheme } from '../../context/ThemeProvider';
import { THEME } from '../../context/themeConstants';

export default function ThemeToggleButton() : React.ReactElement {
    const { theme, toggleTheme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    return (
        <div className="flex items-center gap-2">
            <div className="relative inline-flex items-center">
                <input 
                    type="checkbox" 
                    checked={!isLightMode}
                    onChange={toggleTheme}
                    className="hidden" // clsx 없이 input 숨기기
                />
                {/* 토글 스위치 배경 */}
                <button className="w-14 h-7 bg-gray-200 rounded-full dark:bg-gray-700 cursor-pointer"
                    onClick={toggleTheme}
                >
                    {/* 토글 스위치 원 */}
                    <div className={`absolute w-5 h-5 bg-white rounded-full top-1 left-1 transition-transform duration-300 
                        ${!isLightMode ? 'translate-x-7' : ''}`}>
                    </div>
                </button>
            </div>
            <span className="text-lg">
                {isLightMode ? "🌞" : "🌙"}
            </span>
        </div>
    );
}
