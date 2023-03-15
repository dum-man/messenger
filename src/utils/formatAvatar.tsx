import { User } from "firebase/auth";
import styled from "styled-components";

const Avatar = styled.img`
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

type UserAvatar = Pick<User, "displayName" | "photoURL"> | undefined | null;

const setAvatar = (user: UserAvatar) => {
  if (!user) {
    return;
  }
  if (user.photoURL) {
    return <Avatar src={user.photoURL} alt="Avatar" />;
  } else {
    return <NoAvatar>{user.displayName?.[0]}</NoAvatar>;
  }
};

export default setAvatar;
