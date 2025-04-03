import clsx from "clsx";
import { THEME } from "../../context/themeConstants";
import { useTheme } from "../../context/ThemeProvider";

export default function ContextPage(): React.ReactElement {
    const { theme } = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <div className={clsx('p-4', {
            'bg-white': isLightMode,
            'bg-gray-800': !isLightMode
        })}>
            <h1 className={clsx(
                'text-2xl font-bold',
                isLightMode ? 'text-black' : 'text-white'
            )}
        >
            Theme Content
        </h1>
        <p className={clsx(
            'mt-4',
            isLightMode ? 'text-black' : 'text-white'
        )}>
            {isLightMode ? '라이트 모드' : '다크 모드'}
        </p>
        </div>
    )
}

