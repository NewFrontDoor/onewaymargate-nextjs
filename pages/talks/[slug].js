/** @jsx jsx */
import {useState} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {jsx, Styled} from 'theme-ui';
import {StyledPlayer} from '@newfrontdoor/audio-player';
import Layout from '../../components/layout';
import {fetchQuery} from '../../lib/sanity';
import {menuQuery, sermonSlugQuery} from '../../lib/queries';

const Main = styled('article')`
  max-width: ${props => (props.thing > 0 ? '1200px' : '700px')};
  margin: auto;
  padding: 15px;
  font-size: 1.15em;
  line-height: 1.8;
  color: #444444;
`;

const SermonWrapper = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 20px;
`;

const returnDay = number => {
  switch (number) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return null;
  }
};

const returnMonth = number => {
  switch (number) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return null;
  }
};

export default function SermonPage({pageData, sermonData, menuData}) {
  const [datePreached, setDatePreached] = useState(
    new Date(sermonData.preachedDate)
  );

  return (
    <Layout menuData={menuData} mainData={sermonData}>
      <Main thing={0}>
        <SermonWrapper>
          <div>
            <Styled.h3>{sermonData.title}</Styled.h3>
            <StyledPlayer
              hasPlaybackSpeed
              hasBorder
              isInvert
              highlight="#c4dbf6"
              background="#4c516d"
              base="#4c516d"
              audio={sermonData.url}
              width="300px"
            />
            <a download href={sermonData.url}>
              Download
            </a>
            <p sx={{fontSize: '16px', lineHeight: '18px'}}>
              Speaker - {sermonData.preacher}
            </p>
            <p sx={{fontSize: '16px', lineHeight: '18px'}}>
              Series - {sermonData.series}
            </p>
            {datePreached && (
              <p
                sx={{fontSize: '16px', lineHeight: '18px', fontStyle: 'italic'}}
              >
                {`${returnDay(datePreached.getDay())}, ${returnMonth(
                  datePreached.getMonth()
                )} ${datePreached.getDate()}, ${datePreached.getFullYear()}`}
              </p>
            )}
          </div>
        </SermonWrapper>
      </Main>
    </Layout>
  );
}

SermonPage.propTypes = {
  slug: PropTypes.string.isRequired,
  pageData: PropTypes.object
};

SermonPage.getInitialProps = async ({query}) => {
  const results = await fetchQuery(
    `{
        "menuData": ${menuQuery},
        "sermonData": ${sermonSlugQuery(query.slug)}
    }`
  );
  return results;
};
