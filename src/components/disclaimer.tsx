import React from 'react';
import styled from 'styled-components';
import { TYPE } from '../theme';

interface Props {
  color: string;
}

const StyledDisclaimer = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  text-align: center;
  margin-top: 1rem;
  width: 30rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  width: 20rem;`}
`;

export const Disclaimer = (props: Props) => (
  <StyledDisclaimer color={props.color}>
    <TYPE.Small>
      LIFTOFF is an autonomous launchpad that anyone can use. Similar to
      Uniswap, anyone can create a token with any name, including fake versions
      of existing tokens. Please do your own research before joining a project.
    </TYPE.Small>
  </StyledDisclaimer>
);
