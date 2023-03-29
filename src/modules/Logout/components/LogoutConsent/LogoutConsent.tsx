import styled from "styled-components";
import { Button } from "../../../../components";

const Wrapper = styled.div`
  width: 90%;
  min-width: 300px;
  max-width: 425px;
  padding: 0 10px;
  color: ${({ theme }) => theme.textPrimary};
  text-align: center;
  transition: color 0.2s;
`;

const Title = styled.h2`
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 26px;
  text-align: center;
`;

const Text = styled.p`
  margin-bottom: 20px;
`;

interface LogoutConsentProps {
  onSignout: () => Promise<void>;
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const LogoutConsent: React.FC<LogoutConsentProps> = ({ onSignout, setOpen }) => {
  return (
    <Wrapper>
      <Title>Logout</Title>
      <Text>Are you sure you want to leave?</Text>
      <Button type="button" variant="dark" onClick={onSignout}>
        Log out
      </Button>
      <Button type="button" variant="light" onClick={() => setOpen(false)}>
        Close
      </Button>
    </Wrapper>
  );
};

export default LogoutConsent;
