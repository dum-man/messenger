import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import styled from "styled-components";
import Input from "../../ui/Input";

const Wrapper = styled.div`
  position: relative;
  height: 55px;
  margin-bottom: 15px;
`;

const ShowButton = styled.button`
  position: absolute;
  top: 10px;
  bottom: 10px;
  right: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 28px;
  color: ${({ theme }) => theme.placeholder};
  border-radius: 50%;
`;

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const { id, placeholder, inputRef, ...restProps } = props;

  const [visible, setVisible] = useState(false);

  return (
    <Wrapper>
      <label className="visually-hidden" htmlFor={id}>
        {placeholder}
      </label>
      <Input
        id={id}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        ref={inputRef}
        {...restProps}
      />
      <ShowButton type="button" onClick={() => setVisible((prev) => !prev)}>
        <span className="visually-hidden">{`${visible ? "Hide" : "Show"} password`}</span>
        {visible ? <BiHide /> : <BiShow />}
      </ShowButton>
    </Wrapper>
  );
};

export default PasswordInput;
