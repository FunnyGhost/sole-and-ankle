import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
  ...delegated
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`} {...delegated}>
      <Wrapper>
        <ImageWrapper>
          <Image alt='' src={imageSrc} />
          {variant === 'on-sale' && <SaleBanner>Sale</SaleBanner>}
          {variant === 'new-release' && <JustReleasedBanner>Just Released!</JustReleasedBanner>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  border-radius: 16px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const SaleBanner = styled.span`
  position: absolute;
  top: 12px;
  right: -4px;
  background-color: ${COLORS.primary};
  padding: 9px;
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.medium};
  border-radius: 2px;
`;

const JustReleasedBanner = styled.span`
  position: absolute;
  top: 12px;
  right: -4px;
  background-color: ${COLORS.secondary};
  padding: 9px;
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.medium};
  border-radius: 2px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  position: relative;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  font-weight: ${WEIGHTS.medium};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  position: absolute;
  right: 0;
  top: 26px;

  & + ${Price} {
    text-decoration: line-through;
  }
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

export default ShoeCard;
