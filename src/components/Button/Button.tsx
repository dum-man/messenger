import styled from "styled-components";
import Spinner from "../../ui/Spinner";

const ButtonEl = styled.button<{ variant: string }>`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-weight: 700;
  color: ${({ variant, theme }) => (variant === "light" ? theme.textPrimary : "#ffffff")};
  background-color: ${({ variant, theme }) =>
    variant === "light" ? theme.inputPrimary : theme.brand200};
  border-radius: 30px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s, transform 0.1s;
  &:disabled {
    cursor: not-allowed;
  }
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "light" | "dark";
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { variant = "light", loading = false, children, ...restProps } = props;

  return (
    <ButtonEl variant={variant} disabled={loading} {...restProps}>
      {loading ? <Spinner variant={variant === "light" ? "dark" : "light"} /> : children}
    </ButtonEl>
  );
};

export default Button;
