import { useMemo } from "react";
import { useTernaryDarkMode } from "usehooks-ts";
import styled from "styled-components";
import { BsMoonFill, BsSun } from "react-icons/bs";
import { CgDarkMode } from "react-icons/cg";

const Button = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  color: ${({ theme }) => theme.textPrimary};
  border: 0.5px solid ${({ theme }) => theme.borderPrimary};
  border-radius: 10px;
  transition: border-color 0.2s;
  &:active {
    transform: scale(0.9);
    transition: transform 0.1s;
  }
`;

interface ThemeToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = () => {
  const { ternaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode();

  const themeIcon = useMemo(() => {
    return (() => {
      switch (ternaryDarkMode) {
        case "light":
          return <BsSun size={20} />;
        case "dark":
          return <BsMoonFill size={18} />;
        case "system":
          return <CgDarkMode size={24} />;
        default:
          return <CgDarkMode size={24} />;
      }
    })();
  }, [ternaryDarkMode]);

  return (
    <Button onClick={toggleTernaryDarkMode}>
      {themeIcon}
      <span className="visually-hidden">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggleButton;
