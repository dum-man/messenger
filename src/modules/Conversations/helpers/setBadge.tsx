import styled from "styled-components";
import { Conversation } from "../../../types";

const Badge = styled.span`
  position: absolute;
  top: 32px;
  left: 5px;
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.brand100};
  border-radius: 50%;
`;

const setBadge = (conversation: Conversation, currentUserId: string | undefined) => {
  if (conversation.creator.uid === currentUserId) {
    if (!conversation.hasCreatorSeenLatestMessage) {
      return <Badge />;
    }
  } else if (!conversation.hasParticipantSeenLatestMessage) {
    return <Badge />;
  }
};

export default setBadge;
