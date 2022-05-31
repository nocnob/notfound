import { graphql, Link, useStaticQuery } from "gatsby";
import React, { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren<{}>) => {
  const data = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <>
      <header>
        <div className="logo">
          <h1>{data.site.siteMetadata.title}</h1>
          <h2>{data.site.siteMetadata.description}</h2>
        </div>
        <nav>
          <ul className="menu-nav">
            <li className="menu-item">
              <Link to="/">主页</Link>
            </li>
            <li className="menu-item">
              <Link to="/posts">归档</Link>
            </li>
            <li className="menu-item">
              <Link to="/categories">分类</Link>
            </li>
            <li className="menu-item">
              <Link to="/about">关于</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{props.children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
