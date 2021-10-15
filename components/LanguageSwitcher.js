// truncated code
import NextLink from 'next/link'

// Update the path for your linkResolver file.
import { linkResolver } from '../prismic-configuration'

const AltLangs = ({ altLangs = [] }) =>
  altLangs.map((altLang) => {
    return (
      <li className="language-switcher" key={altLang.id}>
        <NextLink
          locale={altLang.lang}
          href={linkResolver(altLang)}
          passHref
        >
          <a className={`flag-icon-${altLang.lang.slice(-2)}`}>/</a>
        </NextLink>
      </li>
    );
  });

export default AltLangs;