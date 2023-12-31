import { graphql, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Posts from "../components/posts";

const Categories = ({
  data,
  pageContext,
}: PageProps<Queries.CategoryQuery, Queries.CategoryQueryVariables>) => {
  const posts = data.allAsciidoc.nodes;
  const category = pageContext.category;
  return (
    <Layout>
      <h1>{category}</h1>
      <br />
      <Posts posts={posts} />
    </Layout>
  );
};

export const query = graphql`
  query Category($category: String!) {
    allAsciidoc(
      sort: { revision: { date: DESC } }
      filter: {
        pageAttributes: { draft: { ne: "true" }, category: { eq: $category } }
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

export default Categories;
