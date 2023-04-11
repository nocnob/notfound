import { graphql, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Posts from "../components/posts";

const Tags = ({
  data,
  pageContext,
}: PageProps<Queries.TagQuery, Queries.TagQueryVariables>) => {
  const posts = data.allAsciidoc.nodes;
  const tag = pageContext.tag
  return (
    <Layout>
      <h1>{tag}</h1>
      <br />
      <Posts posts={posts} />
    </Layout>
  );
};

export const query = graphql`
  query Tag($tag: String) {
    allAsciidoc(
      sort: { revision: { date: DESC } }
      filter: {
        pageAttributes: {
          draft: { ne: "true" }
          tags: { in: [$tag] }
        }
      }
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

export default Tags;
