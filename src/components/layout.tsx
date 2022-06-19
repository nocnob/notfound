import { graphql, Link, useStaticQuery } from "gatsby";
import React, { PropsWithChildren } from "react";
import * as styles from "./layout.module.css";

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
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.title}>
            <Link to="/"> {data.site.siteMetadata.title} </Link>
          </div>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link to="/">主页</Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="/posts">归档</Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="/categories">分类</Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="/about">关于</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{props.children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
