import styled from 'styled-components';

const LoadingBox = styled.div`
  font-size: 1.4rem;
  margin: 30px auto;
`;

const Status = ({ hasMore }: { hasMore: boolean }) => {
  return <LoadingBox>{hasMore ? 'Loading . .' : 'No more cat 🥲'}</LoadingBox>;
};

export default Status;
