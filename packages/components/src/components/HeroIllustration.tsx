import React from 'react';

import {
  Container,
  Illustration,
  Info,
  Wrapper,
} from './HeroIllustration.styles';

import { IHeroIllustrationProps } from '../types/components';

export const HeroIllustration: React.FC<IHeroIllustrationProps> = ({
  title,
  description,
  link,
  image,
  flipped,
  ...restProps
}) => (
  <Wrapper {...restProps.wrapperProps}>
    <Container flipped={flipped} {...restProps.containerProps}>
      <Illustration flipped={flipped}>
        <img src={image.src} alt={image.alt} {...restProps.imageProps}/>
      </Illustration>
      <Info>
        <h2 {...restProps.titleProps}>{title}</h2>
        <p {...restProps.descriptionProps}>{description}</p>
        {link && <a {...link} {...restProps.linkProps}/>}
      </Info>
    </Container>
  </Wrapper>
);
