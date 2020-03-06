import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import {Styled} from 'theme-ui';
import styled from '@emotion/styled';
import Link from 'next/link';
import urlFor from '../lib/sanityImg';
import Form from './form';
import GridBlock from './grid-block';
import Card from './card-grid-item';
import HorizontalCard from './horizontal-card-grid-item';
import Overlay from './overlay-grid-item';
import PropTypes from 'prop-types';

const BlockContentInt = styled(BlockContent)(`line-height: 26px;`);

const CustomStyleSerializer = ({children}) => {
  return <Styled.p>{children}</Styled.p>;
};

CustomStyleSerializer.propTypes = {
  children: PropTypes.string.isRequired
};

const AnchorSerializer = ({children, mark}) => {
  return <span id={mark.id}>{children}</span>;
};

AnchorSerializer.propTypes = {
  children: PropTypes.string.isRequired,
  mark: PropTypes.object.isRequired
};

const ImageSerializer = ({node}) => {
  return <img src={urlFor(node).url()} />;
};

ImageSerializer.propTypes = {
  node: PropTypes.node.isRequired
};

const GridBlockSerializer = ({node: {blocks, columns, style}}) => {
  return (
    <GridBlock
      items={blocks}
      columns={
        (columns === undefined) | null
          ? `repeat(auto-fit, minmax(200px, 1fr))`
          : `repeat(${columns}, 1fr)`
      }
      columnRawValue={(columns === undefined) | null ? 1 : columns}
      gap="20px"
      style={style}
      marginBottom="0"
      renderProp={(data, style) =>
        style === 'card' ? (
          <Card {...data} />
        ) : style === 'overlay' ? (
          <Overlay {...data} />
        ) : style === 'horizontal' ? (
          <HorizontalCard {...data} />
        ) : (
          ''
        )
      }
    />
  );
};

GridBlockSerializer.propTypes = {
  node: PropTypes.shape({
    blocks: PropTypes.arrayOf(PropTypes.node),
    columns: PropTypes.number,
    style: PropTypes.string.isRequired
  }).isRequired
};

const FormSerializer = ({node}) => {
  return <Form {...node} />;
};

FormSerializer.propTypes = {
  node: PropTypes.node.isRequired
};

const InternalLinkSerializer = ({mark, children}) => (
  <Link href={`/${mark.slug}`}>
    <Styled.a>{children}</Styled.a>
  </Link>
);

const ExternalLinkSerializer = ({mark, children}) => (
  <Link href={mark.href}>
    <Styled.a>{children}</Styled.a>
  </Link>
);

InternalLinkSerializer.propTypes = {
  children: PropTypes.any,
  mark: PropTypes.shape({
    slug: PropTypes.string
  }).isRequired
};

ExternalLinkSerializer.propTypes = {
  children: PropTypes.any,
  mark: PropTypes.shape({
    href: PropTypes.string
  }).isRequired
};

const BlockRenderer = props => {
  const style = props.node.style || 'normal';

  const elements = {
    h1: <Styled.h1>{props.children}</Styled.h1>,
    h2: <Styled.h2>{props.children}</Styled.h2>,
    h3: <Styled.h3>{props.children}</Styled.h3>,
    h4: <Styled.h4>{props.children}</Styled.h4>,
    h5: <Styled.h5>{props.children}</Styled.h5>,
    h6: <Styled.h6>{props.children}</Styled.h6>
  };

  if (/^h\d/.test(style)) {
    return elements[style];
  }

  if (style === 'blockquote') {
    return <blockquote>- {props.children}</blockquote>;
  }

  // Fall back to default handling
  return BlockContent.defaultSerializers.types.block(props);
};

BlockRenderer.propTypes = {
  children: PropTypes.any,
  node: PropTypes.object.isRequired
};

const BlockText = ({blocks}) => {
  return (
    <BlockContentInt
      blocks={blocks}
      serializers={{
        types: {
          block: BlockRenderer,
          p: CustomStyleSerializer,
          form: FormSerializer,
          gridblock: GridBlockSerializer,
          image: ImageSerializer
        },
        marks: {
          anchor: AnchorSerializer,
          internalLink: InternalLinkSerializer,
          link: ExternalLinkSerializer
        }
      }}
    />
  );
};

BlockText.propTypes = {
  blocks: PropTypes.array.isRequired
};

export default BlockText;
