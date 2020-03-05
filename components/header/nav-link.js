/** @jsx jsx */
import {jsx, Styled, Link as UILink} from 'theme-ui';
import Link from 'next/link';

const Navlink = ({link, text}) => (
  <Styled.li
    sx={{
      padding: '0',
      margin: [null, '0.3125em 0 0 1.25em'],
      lineHeight: ['1.6', 'initial']
    }}
  >
    <Link href={link}>
      <UILink variant="nav">{text}</UILink>
    </Link>
  </Styled.li>
);

export default Navlink;
