/** @jsx jsx */
import PropTypes from 'prop-types';
import React from 'react';
import {
  RenderSeriesComponent,
  CurrentSeries,
  RecentSeries
} from '@newfrontdoor/sermon';
import {Styled, Grid, jsx} from 'theme-ui';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../lib/sanity';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const SermonGrid = ({sermons, series, config}) => {
  const latestSermon = {
    ...sermons[0],
    id: sermons[0]._id,
    link: `talks/${sermons[0].slug}`,
    image: urlFor(sermons[0].image)
      .width(300)
      .height(300)
      .url()
  };
  const modseries = series.map(ind => {
    return {
      ...ind,
      image: urlFor(ind?.image ?? config?.image ?? undefined)
        .width(300)
        .height(300)
        .url()
    };
  });

  return (
    <Grid
      sx={{
        display: ['block', 'grid'],
        gap: [null, '5px 20px'],
        gridTemplateColumns: [null, 'repeat(4, 1fr)'],
        gridTemplateRows: [null, '50px auto'],
        gridAutoFlow: 'column'
      }}
    >
      <section
        sx={{
          display: 'contents'
        }}
      >
        <Styled.h2 sx={{margin: 0}}>Latest Sermon</Styled.h2>
        <RenderSeriesComponent {...latestSermon} />
      </section>
      <CurrentSeries
        seriesData={modseries[0]}
        loading={!modseries}
        style={{
          display: 'contents',
          h2: {
            margin: 0
          }
        }}
      />
      <RecentSeries
        seriesData={[modseries[1], modseries[2]]}
        loading={!modseries}
        style={{
          display: 'contents',
          h2: {
            margin: 0,
            gridColumn: [null, '3/5']
          }
        }}
      />
    </Grid>
  );
};

SermonGrid.propTypes = {
  series: PropTypes.array,
  sermons: PropTypes.array,
  config: PropTypes.object
};

export default SermonGrid;
