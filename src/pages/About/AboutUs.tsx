import {
  AboutWrapper,
  ImgContainer,
  Description,
  Tile,
  Container,
  TreePicture,
  QuestionPicture,
  TextBlock,
} from "./style.ts";

function AboutUs() {
  return (
    <AboutWrapper>
      <Container>
        <ImgContainer>
          <TreePicture />
        </ImgContainer>
        <TextBlock>
          <Tile>Our Mission:</Tile>
          <Description size={true}>
            In an era of rapid technological development and swift information
            exchange, we realized that our world is becoming increasingly
            digital and detached. Within this context, our community strives to
            restore human warmth and mutual aid, which are so lacking in modern
            Society. Our mission is to assist people not only in getting rid of
            unnecessary items but also in finding them a new life by providing a
            platform for charitable auctions and exchanges. We have created a
            space where everyone can become part of something larger. Here, you
            can sell your goods so they can reach those in need or get a new
            chance at life through philanthropy. Our community unites people who
            value ecological responsibility and want to make the world better,
            doing good with every action. Our platform is not just a place for
            selling or exchanging things. It's a place where hearts come
            together in a common goal - to help others. We believe in the power
            of collective work and how small actions can lead to significant
            changes. With us, you will find friends who share your values and
            are ready to support you in your endeavors. Join us to make the
            world better together!
          </Description>
        </TextBlock>
      </Container>
      <Container>
        <ImgContainer>
          <QuestionPicture />
        </ImgContainer>
        <TextBlock>
          <Tile>How does it work?:</Tile>
          <Description size={false}>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          </Description>
        </TextBlock>
      </Container>
    </AboutWrapper>
  );
}

export default AboutUs;
