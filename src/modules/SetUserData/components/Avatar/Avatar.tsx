import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import { auth } from "../../../../firebase";
import { VARIANTS } from "../../constants";
import userIcon from "../../../../assets/images/user-icon.png";

const Wrapper = styled.div`
  position: relative;
  width: 50%;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const Img = styled.img`
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

interface AvatarProps {
  selectedImage: string | null;
  setSelectedImage: (image: React.SetStateAction<string | null>) => void;
  onSelectImage: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const Avatar: React.FC<AvatarProps> = ({
  selectedImage,
  setSelectedImage,
  onSelectImage,
}) => {
  const [currentUser] = useAuthState(auth);

  const selectedImageRef = useRef<HTMLInputElement>(null);

  const handleSelectImage = () => {
    selectedImageRef.current?.click();
  };

  return (
    <Wrapper>
      <Img
        src={selectedImage || currentUser?.photoURL || userIcon}
        alt="User image"
        onClick={handleSelectImage}
      />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {selectedImage && (
          <DeleteButton
            type="button"
            whileTap={{ scale: 0.9 }}
            variants={VARIANTS}
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
      <input
        id="file-upload"
        type="file"
        accept="image/x-png,image/gif,image/jpeg"
        hidden
        ref={selectedImageRef}
        onChange={onSelectImage}
      />
    </Wrapper>
  );
};

export default Avatar;
