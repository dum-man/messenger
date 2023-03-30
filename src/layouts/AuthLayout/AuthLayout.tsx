import styled from "styled-components";
import { Image } from "../../ui";
import chatImg from "../../assets/images/chat-illustration.png";

const Container = styled.main`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.bgPrimary};
  transition: background-color 0.2s;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AuthSection = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    flex: 1.2;
  }
`;

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Container>
      <h1 className="visually-hidden">Welcome to Messenger</h1>
      <Image src={chatImg} alt="People messaging" />
      <AuthSection>{children}</AuthSection>
    </Container>
  );
};

export default AuthLayout;
