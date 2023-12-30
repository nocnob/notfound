import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const TagsPage = ({ data }: PageProps<Queries.TagsQuery>) => {
  return (
    <Layout>
      <h1>标签</h1>
      <br />
      <ul className="category-list">
        {data.allAsciidoc.group.map((node) => (
          <li className="category-item" key={node.fieldValue}>
            <Link to={`/tags/${node.fieldValue}/`}>
              {node.fieldValue}
            </Link>
            <sup className="category-item-meta">{node.totalCount}</sup>
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
