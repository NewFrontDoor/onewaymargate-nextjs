import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react';
import urlFor from '../lib/sanityImg';

const Wrapper = styled('section')`
  display: grid;
  @media (min-width: 420px) {
    grid-template-columns: 200px 1fr;
    gap: 20px;
  }
`;

const Header = styled('h3')`
  max-width: 100%;
  text-align: left;
  margin: 0;
  margin-bottom: 30px;
`;

const Image = styled.img``;

function CustomStyleSerializer({children}) {
  return <p>{children}</p>;
}

function AnchorSerializer({children, mark}) {
  return <span id={mark.id}>{children}</span>;
}

const regex = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/;

export default function HorizontalCard({
  header,
  title,
  description,
  shortdescription,
  image,
  mainImage,
  link,
  slug
}) {
  return (
    <Wrapper>
      {!link && !slug ? (
        <Image
          src={urlFor(image || mainImage)
            .width(200)
            .height(200)
            .auto('format')
            .url()}
          alt={header}
        />
      ) : regex.test(link || slug) ? (
        <Link href={`/${link || slug.current}`}>
          <Image
            src={urlFor(image || mainImage)
              .width(200)
              .height(200)
              .auto('format')
              .url()}
            alt={header}
          />
        </Link>
      ) : (
        <a href={link}>
          <Image
            src={urlFor(image)
              .width(200)
              .height(200)
              .auto('format')
              .url()}
            alt={header || title}
          />
        </a>
      )}
      <div>
        {!link && !slug ? (
          <Header>{header || title}</Header>
        ) : regex.test(link || slug) ? (
          <Link href={`/${link || slug.current}`}>
            <Header style={{textDecoration: 'underline'}}>{header || title}</Header>
          </Link>
        ) : (
          <a href={link}>
            <Header  style={{textDecoration: 'underline'}}>{header || title}</Header>
          </a>
        )}
        {description && (
          <BlockContent
            blocks={description}
            serializers={{
              types: {
                p: CustomStyleSerializer
              },
              marks: {
                anchor: AnchorSerializer
              }
            }}
          />
        )}
        {shortdescription && <p>{shortdescription}</p>}
      </div>
    </Wrapper>
  );
}
