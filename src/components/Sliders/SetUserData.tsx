import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import SliderWindow from "../UI/SliderWindow";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import useSelectImage from "../../hooks/useSelectImage";
import { updateUserProfile } from "../../app/service/usersService";
import { auth } from "../../app/firebase";
import { DELETE_BUTTON_VARIANTS } from "../../app/constants";
import userIcon from "../../assets/images/user-icon.png";
import profileImg from "../../assets/images/profile-illustration.png";

const ImageWrapper = styled.div`
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

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserForm = styled.form`
  width: 90%;
  min-width: 300px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  @media (max-width: 768px) {
    margin-bottom: auto;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 50%;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  height: 130px;
  width: 130px;
  align-self: center;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.1s;
  :active {
    transform: scale(0.95);
  }
  @media (max-width: 768px) {
    height: 110px;
    width: 110px;
  }
`;

const DeleteButton = styled(motion.button)`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 24px;
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 50%;
  transition: color 0.2s, transform 0.1s;
`;

const InputWrapper = styled.div`
  position: relative;
  height: 55px;
  margin-bottom: 25px;
`;

interface SetUserDataProps {
  setOpen: (open: boolean) => void;
  redirect?: boolean;
}

const SetUserData: React.FC<SetUserDataProps> = ({ setOpen, redirect = false }) => {
  const navigate = useNavigate();

  const [currentUser] = useAuthState(auth);

  const { selectedImage, setSelectedImage, onSelectImage } = useSelectImage();

  const selectedImageRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [updating, setUpdating] = useState(false);

  const onChangeDisplayName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(evt.target.value);
  };

  const handleSelectImage = () => {
    selectedImageRef.current?.click();
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formattedDisplayName = displayName.trim();

    if (!currentUser) {
      return;
    }
    if (!formattedDisplayName) {
      toast.error("Username must be specified");
      return;
    }
    setUpdating(true);

    try {
      await updateUserProfile(selectedImage, formattedDisplayName, currentUser);
      setOpen(false);
      if (redirect) {
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setUpdating(false);
  };

  return (
    <SliderWindow>
      <ImageWrapper>
        <Image src={profileImg} alt="New user" />
      </ImageWrapper>
      <ContentWrapper>
        <UserForm onSubmit={handleSubmit}>
          <AvatarWrapper>
            <Avatar
              src={selectedImage || currentUser?.photoURL || userIcon}
              alt="User image"
              onClick={handleSelectImage}
            />
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
              {selectedImage && (
                <DeleteButton
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  variants={DELETE_BUTTON_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setSelectedImage(null)}
                >
                  <span className="visually-hidden">Delete image</span>
                  <AiOutlineDelete />
                </DeleteButton>
              )}
            </AnimatePresence>
          </AvatarWrapper>
          <InputWrapper>
            <input
              id="file-upload"
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              hidden
              ref={selectedImageRef}
              onChange={onSelectImage}
            />
            <Input
              placeholder="Create username"
              maxLength={20}
              value={displayName}
              onChange={onChangeDisplayName}
            />
          </InputWrapper>
          <Button type="submit">{updating ? <Spinner light /> : "Save"}</Button>
        </UserForm>
      </ContentWrapper>
    </SliderWindow>
  );
};

export default SetUserData;
