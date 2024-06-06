import { ReactNode } from "react";
import classNames from "classnames";
import styles from "./button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  isUppercase?: boolean;
}

export default function Button({
  type = "button",
  children,
  isDisabled = false,
  isUppercase,
  onClick,
}: ButtonProps) {
  const buttonClasses = classNames(
    styles.button,
    isUppercase && styles.uppercase
  );

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}
