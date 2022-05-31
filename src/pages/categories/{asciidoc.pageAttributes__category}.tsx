import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../../components/layout";

const Category = ({ data }: PageProps<Queries.CategoryQuery>) => {
  return (
    <Layout>
      <ul className="post-list">
        {data.allAsciidoc.nodes.map((node) => (
          <li key={node.id} className="post-item">
            <div className="post-item-meta">
              <time dateTime={node.revision?.date || "1970-01-01"}>
                {node.revision?.date || "1970-01-01"}
              </time>
            </div>
            <div>
              <Link to={`/posts/${node.pageAttributes?.slug}/`}>
                {node.document?.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query Category($pageAttributes__category: String!) {
    allAsciidoc(
      filter: {
        pageAttributes: {
          draft: { ne: "true" }
          category: { eq: $pageAttributes__category }
        }
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

export default Category;
