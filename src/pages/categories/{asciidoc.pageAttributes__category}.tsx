import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../../components/layout";

const Categories = ({
  data,
  pageContext,
}: PageProps<Queries.CategoriesQueryQuery>) => {
  return (
    <Layout pageTitle={(pageContext as any).pageAttributes__category}>
      <ul className="post-list">
        {data.allAsciidoc.nodes.map((node) => (
          <li key={node.id} className="post-item">
            <h5>
              <Link to={`/posts/${node.pageAttributes?.slug}/`}>
                {node.document?.title}
              </Link>
            </h5>
            <p>发表于 {node.revision?.date}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Categories;

export const pageQuery = graphql`
  query CategoriesQuery($pageAttributes__category: String!) {
    allAsciidoc(
      filter: {
        pageAttributes: { category: { eq: $pageAttributes__category } }
      }
    ) {
      nodes {
        id
        document {
          title
        }
        pageAttributes {
          slug
        }
        revision {
          date
          number
        }
      }
    }
  }
`;
