import styled from "styled-components";
import SearchForm from "../SearchForm/SearchForm";

const Wrapper = styled.div`
  padding: 15px;
`;

const SearchUsers: React.FC = () => {
  return (
    <Wrapper>
      <SearchForm />
    </Wrapper>
  );
};

export default SearchUsers;
