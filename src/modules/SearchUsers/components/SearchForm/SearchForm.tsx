import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { Spinner } from "../../../../ui";
import useAppContext from "../../../../hooks/useAppContext";

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 7px 30px;
  font-family: inherit;
  font-size: 14px;
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.inputSecondary};
  border: 0.5px solid ${({ theme }) => theme.inputSearch};
  border-radius: 8px;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
  :focus {
    border-color: ${({ theme }) => theme.inputBorder};
    outline: none;
  }
  :disabled {
    opacity: 1;
  }
  ::placeholder {
    color: ${({ theme }) => theme.textPrimary};
    opacity: 0.5;
    transition: color 0.2s;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 16px;
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 50%;
  transition: color 0.2s;
`;

const SearchForm: React.FC = () => {
  const { username, setUsername, usersVisible, setUsersVisible, usersLoading } =
    useAppContext();

  const onChangeUsername = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(evt.target.value);
  };

  const onClearUsers = () => {
    setUsername("");
    setUsersVisible(false);
  };

  return (
    <Form>
      <SearchIcon>
        {usersLoading ? <Spinner variant="dark" small /> : <GoSearch />}
      </SearchIcon>
      <Input
        placeholder="Search users"
        maxLength={50}
        onFocus={() => setUsersVisible(true)}
        value={username}
        onChange={onChangeUsername}
      />
      {usersVisible ? (
        <CloseButton type="button" onClick={onClearUsers}>
          <span className="visually-hidden">Close users</span>
          <IoClose />
        </CloseButton>
      ) : null}
    </Form>
  );
};

export default SearchForm;
