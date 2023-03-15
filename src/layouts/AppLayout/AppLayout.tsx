import styled from "styled-components";

const Container = styled.main`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
`;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default AppLayout;
