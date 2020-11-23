import React, { Fragment, FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';

import CopyRight from '../components/copyright';
import Card from '../components/card';
import Countdown from '../components/countdown';
import Disclaimer from '../components/disclaimer';
import Footer from '../components/footer';
import Avatar from '../components/avatar';
import { Rocket, RocketData, rockets } from '../data';
import { StyledBody, StyledContainer, TYPE } from '../theme';

export const StyledRocketCard = styled(Card)`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.black};
  padding: 2rem;
  margin: 0.5rem 0 !important;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    padding: 1rem;
  `}
`;

const StyledRocketItem = styled.div`
  ${({ theme }) => theme.mediaWidth.upToSmall`
  text-align: justify;
  padding: .5rem 1rem;
`}
`;

const Rockets: FC = () => {
  return (
    <>
      <StyledBody color="bg3">
        <StyledContainer sWidth={1144}>
          {rockets.map((rocket: Rocket, index: number) => (
            <Box width="100%" key={index} mb="3.875rem">
              <Box mb="1.25rem">
                <TYPE.LargeHeader
                  color="bg1"
                  textAlign="center"
                  fontWeight={600}
                >
                  {rocket.title}
                </TYPE.LargeHeader>
                <TYPE.Body color="bg1" textAlign="center">
                  {rocket.subtitle}
                </TYPE.Body>
              </Box>
              {rocket.data.map(
                (rocketData: RocketData, rocketDataIndex: number) => (
                  <Fragment key={rocketDataIndex}>
                    <StyledRocketCard>
                      <StyledRocketItem>
                        <Flex alignItems="center">
                          <Box mr="1.25rem">
                            <Avatar size="3.25rem" />
                          </Box>
                          <Link to={`rockets/${index}`}>
                            <TYPE.Body>{rocketData.title}</TYPE.Body>
                          </Link>
                        </Flex>
                      </StyledRocketItem>
                      <StyledRocketItem>
                        <TYPE.Body color="text3" fontWeight="400">
                          {rocketData.ticker}
                        </TYPE.Body>
                      </StyledRocketItem>
                      <StyledRocketItem>
                        <TYPE.Body color="text3" fontWeight="400">
                          {rocketData.website}
                        </TYPE.Body>
                      </StyledRocketItem>
                      <StyledRocketItem>
                        <Countdown date={rocketData.date} />
                      </StyledRocketItem>
                    </StyledRocketCard>
                  </Fragment>
                )
              )}
            </Box>
          ))}

          <Disclaimer color="black" />

          <CopyRight mt="1.375rem" />
        </StyledContainer>
      </StyledBody>

      <Footer
        color="bg3"
        noBackground={false}
        text={'© 2020 Liquidity Dividends Protocol. All rights reserved.'}
      />
    </>
  );
};

export default Rockets;
