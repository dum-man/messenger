import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import styled from "styled-components";
import { SliderWindow, Image } from "../../../../ui";
import DeleteConsent from "../DeleteConsent/DeleteConsent";
import DeleteSuccess from "../DeleteSuccess/DeleteSuccess";
import useAppContext from "../../../../hooks/useAppContext";
import deleteImg from "../../../../assets/images/delete-illustration.png";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DeleteConversation: React.FC = () => {
  const { setSidebarOpen, setDeleteWindowOpen } = useAppContext();

  const isTablet = useMediaQuery("(max-width: 768px)");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (success) {
        setDeleteWindowOpen(false);
        if (isTablet) {
          setSidebarOpen(true);
        }
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [success]);

  return (
    <SliderWindow>
      <Image src={deleteImg} alt="Messages deleting" />
      <Wrapper>
        {success ? <DeleteSuccess /> : <DeleteConsent setSuccess={setSuccess} />}
      </Wrapper>
    </SliderWindow>
  );
};

export default DeleteConversation;
