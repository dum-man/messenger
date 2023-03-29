import styled from "styled-components";
import { SliderWindow, Image } from "../../../../ui";
import Avatar from "../Avatar/Avatar";
import UserForm from "../UserForm/UserForm";
import useSelectImage from "../../../../hooks/useSelectImage";
import profileImg from "../../../../assets/images/profile-illustration.png";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 90%;
  min-width: 300px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
`;

const SetUserData: React.FC = () => {
  const { selectedImage, setSelectedImage, onSelectImage } = useSelectImage();

  return (
    <SliderWindow>
      <Image src={profileImg} alt="New user" />
      <Wrapper>
        <ContentWrapper>
          <Avatar
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            onSelectImage={onSelectImage}
          />
          <UserForm selectedImage={selectedImage} />
        </ContentWrapper>
      </Wrapper>
    </SliderWindow>
  );
};

export default SetUserData;
