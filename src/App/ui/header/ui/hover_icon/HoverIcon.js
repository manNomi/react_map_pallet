import { Container, Box, Icon, IconWrap } from "./style";

const HoverIcon = ({ resource }) => {
  return (
    <Container>
      <Box>
        <IconWrap>
          <Icon as={resource} />
        </IconWrap>
      </Box>
    </Container>
  );
};
export default HoverIcon;
