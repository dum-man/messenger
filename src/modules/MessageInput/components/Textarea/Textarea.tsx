import styled from "styled-components";

const GrowWrapper = styled.div`
  flex: 1;
  display: grid;
  ::after {
    content: attr(data-replicated-value) " ";
    max-height: 130px;
    grid-area: 1 / 1 / 2 / 2;
    padding: 5px 10px;
    font-family: inherit;
    font-size: 15px;
    color: ${({ theme }) => theme.textPrimary};
    background-color: transparent;
    border: 0.5px solid ${({ theme }) => theme.borderPrimary};
    border-radius: 15px;
    white-space: pre-wrap;
    visibility: hidden;
    word-break: break-all;
    transition: color 0.2s, border-color 0.2s;
  }
`;

const TextareaEl = styled.textarea`
  max-height: 150px;
  grid-area: 1 / 1 / 2 / 2;
  margin: 0;
  padding: 5px 10px;
  font-family: inherit;
  font-size: 15px;
  color: ${({ theme }) => theme.textPrimary};
  border: 0.5px solid ${({ theme }) => theme.borderPrimary};
  border-radius: 15px;
  resize: none;
  background-color: transparent;
  outline: none;
  word-break: break-all;
  transition: color 0.2s, border-color 0.2s;
  ::placeholder {
    opacity: 0.5;
    color: ${({ theme }) => theme.textPrimary};
  }
`;

interface TextareaProps {
  messageText: string;
  setMessageText: (text: React.SetStateAction<string>) => void;
  onSendMessage: () => Promise<void>;
}

const Textarea: React.FC<TextareaProps> = ({
  messageText,
  setMessageText,
  onSendMessage,
}) => {
  const onSetMessageText = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(evt.target.value);
  };

  const onKeyDown = (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (evt.key === "Enter" && !evt.shiftKey) {
      evt.preventDefault();
      onSendMessage();
    }
  };
  return (
    <GrowWrapper className="grow-wrap" data-replicated-value={messageText}>
      <TextareaEl
        rows={1}
        maxLength={5000}
        placeholder="Message"
        value={messageText}
        onChange={onSetMessageText}
        onKeyDown={onKeyDown}
      />
    </GrowWrapper>
  );
};

export default Textarea;
