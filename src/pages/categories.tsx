import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import * as styles from "./categories.module.css";

const CategoriesPage = ({ data }: PageProps<Queries.CategoriesQuery>) => {
  return (
    <Layout>
      <h1>分类</h1>
      <br />
      <ul className={styles.categoryList}>
        {data.allAsciidoc.group.map((node) => (
          <li className={styles.categoryItem} key={node.fieldValue}>
            <Link to={`/categories/${node.fieldValue}/`}>
              {node.fieldValue}
            </Link>
            <sup className={styles.categoryItemMeta}>{node.totalCount}</sup>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query Categories {
    allAsciidoc(filter: { pageAttributes: { draft: { ne: "true" } } }) {
      group(field: pageAttributes___category) {
        totalCount
        field
        fieldValue
      }
    }
  }
`;

export default CategoriesPage;
