import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const CategoriesPage = ({ data }: PageProps<Queries.CategoriesQuery>) => {
  const group = data.allAsciidoc.group;
  return (
    <Layout>
      <h1>分类</h1>
      <br />
      <ul className="category-list">
        {group.map((node) => (
          <li className="category-item" key={node.fieldValue}>
            <Link to={`/categories/${node.fieldValue}/`}>
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
  query Categories {
    allAsciidoc(filter: { pageAttributes: { draft: { ne: "true" } } }) {
      group(field: { pageAttributes: { category: SELECT } }) {
        totalCount
        field
        fieldValue
      }
    }
  }
`;

export default CategoriesPage;
