import styled from "styled-components";
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

const ImageSection = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  min-width: 300px;
  width: 100%;
  @media (max-width: 768px) {
    width: 330px;
  }
`;

const AuthSection = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Container>
      <h1 className="visually-hidden">Welcome to Messenger</h1>
      <ImageSection>
        <Image src={chatImg} />
      </ImageSection>
      <AuthSection>{children}</AuthSection>
    </Container>
  );
};

export default AuthLayout;
