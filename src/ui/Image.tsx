import styled from "styled-components";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  min-width: 300px;
  width: 100%;
  @media (max-width: 768px) {
    width: 330px;
  }
`;

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image: React.FC<ImageProps> = (props) => {
  return (
    <Wrapper>
      <Img {...props} />
    </Wrapper>
  );
};

export default Image;
