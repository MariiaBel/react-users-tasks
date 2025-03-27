import { ReactNode } from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    to?: string;
    type?: "submit" | "button" | "reset";
    active?: boolean;
    className?: string;
}

const Button = ({
    className,
    onClick,
    to,
    active = false,
    type = "button",
    children,
}: ButtonProps) => {
    const btnClassNames = `${className || ""} ${styles.btn} ${
        active && styles.active
    }`;

    if (to)
        return (
            <Link to={to} className={btnClassNames}>
                {children}
            </Link>
        );

    return (
        <button onClick={onClick} className={btnClassNames} type={type}>
            {children}
        </button>
    );
};

export default Button;
