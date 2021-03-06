import React from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';
import { utils } from 'ethers';
import moment from 'moment';
import {
  StyledRocketCard,
  TYPE,
  StatusBadge,
  ExternalLink as UnstyledExternalLink,
  TBody,
  TRow,
  TData
} from 'theme';
import Avatar from 'components/Avatar';
import Countdown from 'components/Countdown';
import DiscordIcon from '../assets/pngs/discord.png';
import TelegramIcon from '../assets/pngs/telegram.png';
import TwitterIcon from '../assets/pngs/twitter.png';
import FacebookIcon from '../assets/pngs/facebook.png';
import { ProjectConfig, TokenInsurance, TokenSale } from 'utils/types';
import { Colors } from 'theme/styled';
import { projectStatus } from 'utils';
import { getLiftoffSettings } from 'utils/networks';

const ExternalLink = styled(UnstyledExternalLink)({
  wordBreak: 'break-all'
});
const Card = styled(StyledRocketCard)`
  padding: 0;
`;

const StyledRocketDetailHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    padding: 1rem 0 !important;
  `};
`;
const StyledCountdown = styled.div`
  align-items: center;
  display: flex;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `}
  span {
    margin-right: 1rem;
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    align-items: center;
    align-self: center !important;
    `}
`;

const StyledRocketDetailBody = styled.div``;

const StyledDescription = styled.div`
  max-width: 600px;
  margin: 1rem;
`;

export const StyledTable = styled.table``;

const HeaderFlex = styled(Flex)({}, ({ theme }) =>
  theme.mediaWidth.upToExtraSmall({
    flexDirection: 'column',
    width: '100vw'
  })
);

const StyledFlex = styled.div(
  {
    display: 'flex',
    width: 140,
    justifyContent: 'space-between'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      width: '100%'
    })
);

const WrappedFlex = styled.div(
  {
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      flexDirection: 'column',
      alignItems: 'flex-start'
    })
);

const StyledTData = styled(TData)(
  {
    justifyContent: 'space-between'
  },
  ({ theme }) =>
    theme.mediaWidth.upToExtraSmall({
      width: '100% !important'
    }),
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      width: '45%'
    })
);

const SmallText = styled(TYPE.Small)(
  {
    marginLeft: '1rem !important'
  },
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      margin: '0 !important'
      // width: '100vw'
    })
);

const StyledImage = styled.img({
  width: 20,
  height: 20
});

const Badge = styled(StatusBadge)(
  {
    margin: '15px 0 !important'
  },
  ({ theme }) =>
    theme.mediaWidth.upToExtraSmall({
      alignSelf: 'center'
    }),
  ({ theme }) =>
    theme.mediaWidth.upToSmall({
      alignSelf: 'center'
    })
);

type Props = {
  networkId: number | undefined;
  projectConfig: ProjectConfig;
  tokenSale: TokenSale;
  tokenInsurance: Maybe<TokenInsurance>;
};

const Detail = ({
  networkId,
  tokenInsurance,
  tokenSale,
  projectConfig
}: Props) => {
  const badges = {
    inactive: {
      color: 'blue1',
      title: 'COMING SOON'
    },
    active: {
      color: 'red4',
      title: 'ACTIVE NOW'
    },
    completed: {
      color: 'grey',
      title: 'COMPLETED'
    },
    blacklisted: {
      color: 'grey',
      title: 'BLACKLISTED'
    }
  };

  let setting: any;
  const status = projectStatus(tokenSale);
  setting = getLiftoffSettings(networkId || 1);

  const currentTime = moment().unix();

  let countdownText = '';
  let countdown = 0;
  if (status === 'inactive') {
    countdownText = 'Launch in:';
    countdown = tokenSale ? tokenSale.startTime : 0;
  } else if (status === 'active') {
    countdownText = 'Spark in:';
    countdown = tokenSale ? tokenSale.endTime : 0;
  } else if (status === 'completed') {
    if (
      !tokenInsurance ||
      !tokenInsurance.isInitialized ||
      !tokenInsurance.startTime
    ) {
      countdownText = 'Insurance is not started or Refunding';
      countdown = 0;
    } else if (
      currentTime <
      tokenInsurance.startTime + setting.insurancePeriod
    ) {
      countdownText = '100% insurance expires in:';
      countdown = tokenInsurance.startTime + setting.insurancePeriod;
    } else if (
      currentTime <
      tokenInsurance.startTime + setting.insurancePeriod * 10
    ) {
      countdownText = 'Remaining insurance expires in:';
      countdown = tokenInsurance.startTime + setting.insurancePeriod * 10;
    } else {
      countdownText = 'Insurance expired:';
      countdown = 0;
    }
  }

  return (
    <Card>
      <StyledRocketDetailHead>
        <Flex
          flexDirection={['column', 'row']}
          alignItems={['center', 'center']}
        >
          <HeaderFlex alignItems="center" mr={['0', '1rem']} mb={['1rem', '0']}>
            <Avatar size="4.375rem" imgSrc={projectConfig.logo} />
            <TYPE.LargeHeader ml="1.25rem">
              {projectConfig.projectName}
            </TYPE.LargeHeader>
          </HeaderFlex>

          <Badge color={badges[status].color as keyof Colors}>
            {badges[status].title}
          </Badge>
        </Flex>

        <StyledCountdown>
          <span>{countdownText}</span>
          <Countdown date={countdown} />
        </StyledCountdown>
      </StyledRocketDetailHead>
      <StyledRocketDetailBody>
        <StyledTable cellSpacing={0} cellPadding={0}>
          <TBody>
            <TRow>
              <TData width="20%">
                <TYPE.Body>Ticker</TYPE.Body>
              </TData>
              <TData width="20%">
                <TYPE.Body>{projectConfig.tokenTicker}</TYPE.Body>
              </TData>
            </TRow>
            <TRow>
              <TData width="20%">
                <TYPE.Body>Total Supply</TYPE.Body>
              </TData>
              <StyledTData>
                <TYPE.Body>
                  {utils.formatEther(tokenSale.totalSupply)}{' '}
                  {projectConfig.tokenTicker}
                </TYPE.Body>
              </StyledTData>
            </TRow>
            <TRow>
              <TData width="20%">
                <TYPE.Body>Website</TYPE.Body>
              </TData>
              <StyledTData>
                <WrappedFlex>
                  <ExternalLink href={projectConfig.websiteLink}>
                    {projectConfig.websiteLink}
                  </ExternalLink>
                  <SmallText color="red">
                    *Verify by checking site for link to this LIFTOFF launch
                    page
                  </SmallText>
                </WrappedFlex>
              </StyledTData>
            </TRow>
            <TRow>
              <TData width="20%">
                <TYPE.Body>dApp</TYPE.Body>
              </TData>
              <StyledTData>
                <ExternalLink href={projectConfig.dappLink}>
                  {projectConfig.dappLink}
                </ExternalLink>
              </StyledTData>
            </TRow>
            <TRow>
              <TData width="20%">
                <TYPE.Body>Whitepaper</TYPE.Body>
              </TData>
              <StyledTData>
                <ExternalLink href={projectConfig.whitepaperLink}>
                  Click to view
                </ExternalLink>
              </StyledTData>
            </TRow>
            <TRow>
              <TData width="20%">
                <TYPE.Body>Launch Date</TYPE.Body>
              </TData>
              <StyledTData>
                <TYPE.Body>
                  {projectConfig.date} {projectConfig.time}{' '}
                  {projectConfig.timezone || 'UTC'}
                </TYPE.Body>
              </StyledTData>
            </TRow>
            <TRow>
              <TData width="20%">
                <TYPE.Body>Social Media</TYPE.Body>
              </TData>
              <StyledTData width="40%">
                <StyledFlex>
                  {projectConfig.discord && (
                    <ExternalLink href={projectConfig.discord}>
                      <StyledImage src={DiscordIcon} alt="Liftoff Discord" />
                    </ExternalLink>
                  )}
                  {projectConfig.telegram && (
                    <ExternalLink href={projectConfig.telegram}>
                      <StyledImage src={TelegramIcon} alt="Liftoff Telegram" />
                    </ExternalLink>
                  )}
                  {projectConfig.twitter && (
                    <ExternalLink href={projectConfig.twitter}>
                      <StyledImage src={TwitterIcon} alt="Liftoff Twitter" />
                    </ExternalLink>
                  )}
                  {projectConfig.facebook && (
                    <ExternalLink href={projectConfig.facebook}>
                      <StyledImage src={FacebookIcon} alt="Liftoff Facebook" />
                    </ExternalLink>
                  )}
                </StyledFlex>
              </StyledTData>
            </TRow>
          </TBody>
        </StyledTable>
        <StyledDescription>
          <TYPE.Body>{projectConfig.projectDescription}</TYPE.Body>
        </StyledDescription>
      </StyledRocketDetailBody>
    </Card>
  );
};

export default Detail;
