import { graphql, PageProps } from "gatsby";
import React from "react";
import Layout from "../../components/layout";
import Posts from "../../components/posts";

const Category = ({ data }: PageProps<Queries.CategoryQuery>) => {
  const posts = data.allAsciidoc.nodes;
  return (
    <Layout>
      <Posts posts={posts} />
    </Layout>
  );
};

export const query = graphql`
  query Category($pageAttributes__category: String!) {
    allAsciidoc(
      sort: { fields: revision___date, order: DESC }
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
