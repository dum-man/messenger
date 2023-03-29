import styled from "styled-components";
import Input from "../../ui/Input";

const Wrapper = styled.div`
  height: 55px;
  margin-bottom: 15px;
`;

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const { id, placeholder, inputRef, ...restProps } = props;

  return (
    <Wrapper>
      <label className="visually-hidden" htmlFor={id}>
        {placeholder}
      </label>
      <Input id={id} placeholder={placeholder} ref={inputRef} {...restProps} />
    </Wrapper>
  );
};

export default TextInput;
