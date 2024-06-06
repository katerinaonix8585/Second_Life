import styled from "@emotion/styled";

import { Tree, Question } from "../../shared/assets/images";

interface DescriptionProps {
  size: boolean;
}

export const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImgContainer = styled.div``;

export const TreePicture = styled.img`
  height: 350px;
`;

export const QuestionPicture = styled.img`
  height: 150px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  width: 800px;
`;

export const Tile = styled.div`
  font-size: 30px;
  color: #56119c;
  font-family: "LXGW WenKai TC", cursive;
  font-weight: bold;
`;

export const Description = styled.p<DescriptionProps>`
  font-size: 17px;
  line-height: 25px;
  color: #56119c;
  row-gap: 10px;
  font-family: "DM Sans", sans-serif;
  width: ${({ size }) => (size ? "800px" : "720px")};
`;

TreePicture.defaultProps = { src: Tree };
QuestionPicture.defaultProps = { src: Question };
