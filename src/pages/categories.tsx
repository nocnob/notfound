import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const CategoriesPage = ({ data }: PageProps<Queries.CategoriesQuery>) => {
  return (
    <Layout>
      <ul className="category-list">
        {data.allAsciidoc.group.map((node) => (
          <li className="category-item" key={node.fieldValue}>
            <Link to={`/categories/${node.fieldValue}/`}>
              {node.fieldValue}
            </Link>
            <span className="category-item-meta">{node.totalCount}</span>
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
