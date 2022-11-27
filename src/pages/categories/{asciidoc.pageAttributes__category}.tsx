import { graphql, PageProps } from "gatsby";
import React from "react";
import Layout from "../../components/layout";
import Posts from "../../components/posts";

const Category = ({
  data,
  pageContext,
}: PageProps<Queries.CategoryQuery, Queries.CategoryQueryVariables>) => {
  const posts = data.allAsciidoc.nodes;
  const category = pageContext.pageAttributes__category;
  return (
    <Layout>
      <h1>{category}</h1>
      <br />
      <Posts posts={posts} />
    </Layout>
  );
};

export const query = graphql`
  query Category($pageAttributes__category: String!) {
    allAsciidoc(
      sort: { revision: { date: DESC } }
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
          main
          subtitle
          title
        }
        pageAttributes {
          category
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

export default Category;
