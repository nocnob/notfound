import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";

function CategoriesPage({ data }: PageProps<Queries.categoriesQueryQuery>) {
  return (
    <Layout pageTitle="分类">
      <ul className="post-list">
        {data.allAsciidoc.group.map((node) => (
          <li key={node.fieldValue} className="post-item">
            <div>
              <Link to={`/categories/${node.fieldValue}/`}>
                {node.fieldValue}
              </Link>
              <span>{node.totalCount}</span>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default CategoriesPage;

export const query = graphql`
  query allCategoriesQuery {
    allAsciidoc {
      group(field: pageAttributes___category) {
        totalCount
        field
        fieldValue
      }
    }
  }
`;
