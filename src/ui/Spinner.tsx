import styled from "styled-components";

const SpinnerEl = styled.span<{ variant: string; small: boolean }>`
  width: ${({ small }) => (small ? "15px" : "20px")};
  height: ${({ small }) => (small ? "15px" : "20px")};
  border-radius: 100%;
  border: 2px solid
    ${({ variant, theme }) => (variant === "light" ? "#ffffff" : theme.spinnerPrimary)};
  border-left-color: ${({ variant, theme }) =>
    variant === "light" ? "rgba(255, 255, 255, 0.5)" : theme.spinnerSecondary};
  border-top-color: ${({ variant, theme }) =>
    variant === "light" ? "rgba(255, 255, 255, 0.5)" : theme.spinnerSecondary};
  animation: spin 0.6s infinite linear;
  @keyframes spin {
    to {
      transform: rotate(359deg);
    }
  }
`;

interface SpinnerProps {
  small?: boolean;
  variant?: "light" | "dark";
}

const Spinner: React.FC<SpinnerProps> = ({ small = false, variant = "light" }) => {
  return <SpinnerEl small={small} variant={variant} />;
};

export default Spinner;
