import clsx from "clsx";
import { useTheme } from "../../context/ThemeProvider";
import { THEME } from "../../context/themeConstants";
import ThemeToggleButton from "../theme/ThemeToggleButton";

export default function Navbar(): React.ReactElement {
    const { theme } = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <nav className={clsx('p-4 w-full flex justify-end', {
            'bg-white': isLightMode,
            'bg-gray-800': !isLightMode
        })}>
            <ThemeToggleButton />
        </nav>
    )
}
