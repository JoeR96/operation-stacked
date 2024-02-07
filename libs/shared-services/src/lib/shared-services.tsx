import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface SharedServicesProps {}

const StyledSharedServices = styled.div`
  color: pink;
`;

export function SharedServices(props: SharedServicesProps) {
  return (
    <StyledSharedServices>
      <h1>Welcome to SharedServices!</h1>
    </StyledSharedServices>
  );
}

export default SharedServices;
