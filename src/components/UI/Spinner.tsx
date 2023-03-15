import styled from "styled-components";

const SpinnerEl = styled.span<{ light: boolean; small: boolean }>`
  width: ${(props) => (props.small ? "15px" : "20px")};
  height: ${(props) => (props.small ? "15px" : "20px")};
  border-radius: 100%;
  border: 2px solid ${(props) => (props.light ? "#ffffff" : props.theme.spinnerPrimary)};
  border-left-color: ${(props) =>
    props.light ? "rgba(255, 255, 255, 0.5)" : props.theme.spinnerSecondary};
  border-top-color: ${(props) =>
    props.light ? "rgba(255, 255, 255, 0.5)" : props.theme.spinnerSecondary};
  animation: spin 0.6s infinite linear;
  @keyframes spin {
    to {
      transform: rotate(359deg);
    }
  }
`;

interface SpinnerProps {
  small?: boolean;
  light?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ small = false, light = false }) => {
  return <SpinnerEl small={small} light={light} />;
};

export default Spinner;
