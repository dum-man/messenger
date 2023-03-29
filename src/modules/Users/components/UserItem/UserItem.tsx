import styled from "styled-components";
import { motion } from "framer-motion";
import { User } from "firebase/auth";
import { Spinner, Avatar } from "../../../../ui";
import { VARIANTS } from "../../constants";

const UserListItem = styled(motion.li)<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px;
  padding-left: 18px;
  border-radius: 10px;
  opacity: ${({ disabled }) => (disabled ? "0.7" : "1")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  &:hover {
    background-color: ${({ disabled, theme }) => (disabled ? "unset" : theme.bgHover)};
  }
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-right: auto;
`;

const Username = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const UserEmail = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
`;

interface UserItemProps {
  user: User;
  conversationCreating: boolean;
  onCreateConversation: (user: User) => Promise<void>;
}

const UserItem: React.FC<UserItemProps> = ({
  user,
  conversationCreating,
  onCreateConversation,
}) => {
  const { displayName, email } = user;

  return (
    <UserListItem
      variants={VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      disabled={conversationCreating}
      onClick={() => onCreateConversation(user)}
    >
      <Avatar user={user} />
      <UserWrapper>
        <Username>{displayName}</Username>
        <UserEmail>{email}</UserEmail>
      </UserWrapper>
      {conversationCreating ? <Spinner variant="dark" /> : null}
    </UserListItem>
  );
};

export default UserItem;
