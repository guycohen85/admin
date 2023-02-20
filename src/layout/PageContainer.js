import React from 'react';
import Container from '@mui/material/Container';
//import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(
  ({ theme }) => `
  margin-top: ${theme.spacing(4)};
  margin-bottom: ${theme.spacing(4)};
  display: flex;
  align-items: center; // TODO: allow to change the align items by props
  flex-direction: column;
`
);

function PageContainer({ children, ...props }) {
  return (
    <StyledContainer component="main" {...props}>
      {children}
    </StyledContainer>
  );
}

// PageContainer.propTypes = {
//   name: PropTypes.string
// };

export default PageContainer;
