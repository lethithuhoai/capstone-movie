import styled from "styled-components";

export const Header = () => {
  return (
    <Container>
      <div className="header-content">content</div>
      <div className="logo">logo</div>
    </Container>
  );
};
// Styled component
const Container = styled.div`
  height: var(--header-height);
  background-color: red;

  .header-content {
    max-width: var(--max-width);
  }
  .logo {
  }
`;
