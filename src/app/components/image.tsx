import React from "react";

import { IImage } from "../core/models";

interface IProps {
  image?: IImage;
}

export const Image: React.FC<IProps> = ({ image }) => {
  return <img src={image?.url} width={image?.width} height={image?.height} alt="" />;
};
