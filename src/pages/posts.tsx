import { graphql, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Posts from "../components/posts";

const PostsPage = ({ data }: PageProps<Queries.PostsQuery>) => {
  const posts = data.allAsciidoc.nodes;
  return (
    <Layout>
      <h1>归档</h1>
      <br />
      <Posts posts={posts} />
    </Layout>
  );
};

export const query = graphql`
  query Posts {
    allAsciidoc(
      sort: { revision: { date: DESC } }
      filter: { pageAttributes: { draft: { ne: "true" } } }
    ) {
      nodes {
        id
        document {
          main
          subtitle
          title
        }
        pageAttributes {
          category
          tags
          draft
          slug
        }
        revision {
          date
          number
          remark
        }
      }
    }
  }
`;

export default PostsPage;
