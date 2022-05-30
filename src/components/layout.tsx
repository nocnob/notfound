import { graphql, Link, useStaticQuery } from "gatsby";
import React, { PropsWithChildren } from "react";
import {
  container,
  siteTitle,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
} from "./layout.module.css";

type Props = PropsWithChildren<{ pageTitle?: string }>;

const Layout = ({ children, pageTitle }: Props) => {
  const data = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className={container}>
      <title>{pageTitle || data.site.siteMetadata}</title>
      <header className={siteTitle}>{data.site.siteMetadata.title}</header>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              主页
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/posts" className={navLinkText}>
              归档
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/categories" className={navLinkText}>
              分类
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              关于
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
};

export default Layout;
