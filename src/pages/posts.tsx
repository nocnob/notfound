import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const PostsPage = ({ data }: PageProps<Queries.PostsQuery>) => {
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
  query Posts {
    allAsciidoc(
      sort: { fields: revision___date, order: DESC }
      filter: { pageAttributes: { draft: { ne: "true" } } }
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

export default PostsPage;
