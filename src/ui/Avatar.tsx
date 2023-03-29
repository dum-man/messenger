import styled from "styled-components";
import { User } from "firebase/auth";

const AvatarImg = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
`;

const NoAvatar = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 20px;
  color: #ffffff;
  background: linear-gradient(0deg, #868993 0%, #a6abb7 100%);
  border-radius: 50%;
`;

interface AvatarProps {
  user: Pick<User, "displayName" | "photoURL"> | undefined | null;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  if (user?.photoURL) {
    return <AvatarImg src={user.photoURL} alt="Avatar" />;
  }
  return <NoAvatar>{user?.displayName?.[0]}</NoAvatar>;
};

export default Avatar;
