import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface SharedImagesProps {}

const StyledSharedImages = styled.div`
  color: pink;
`;

export function SharedImages(props: SharedImagesProps) {
  return (
    <StyledSharedImages>
      <h1>Welcome to SharedImages!</h1>
    </StyledSharedImages>
  );
}

export default SharedImages;
