import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import * as styles from "./categories.module.css";

const TagsPage = ({ data }: PageProps<Queries.TagsQuery>) => {
  return (
    <Layout>
      <h1>标签</h1>
      <br />
      <ul className={styles.categoryList}>
        {data.allAsciidoc.group.map((node) => (
          <li className={styles.categoryItem} key={node.fieldValue}>
            <Link to={`/tags/${node.fieldValue}/`}>
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
  query Tags {
    allAsciidoc(filter: { pageAttributes: { draft: { ne: "true" } } }) {
      group(field: { pageAttributes: { tags: SELECT } }) {
        totalCount
        field
        fieldValue
      }
    }
  }
`;

export default TagsPage;
