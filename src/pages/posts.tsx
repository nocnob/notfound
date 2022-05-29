import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const PostsPage = ({ data }: PageProps<Queries.AllPostQuery>) => {
  return (
    <Layout pageTitle="posts">
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

export default PostsPage;

export const allPost = graphql`
  query AllPost {
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
