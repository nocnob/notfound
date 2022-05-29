import { graphql, Link, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/layout";

const IndexPage = ({ data }: PageProps<Queries.AllPostQuery>) => {
  return (
    <Layout pageTitle="主页">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage src="../images/favicon.png" alt="favicon" />
      {data.allAsciidoc.nodes.map((node) => (
        <article key={node.id}>
          <h2>
            <Link to={`/posts/${node.pageAttributes?.slug}/`}>
              {node.document?.title}
            </Link>
          </h2>
          <p>发表于 {node.revision?.date}</p>
        </article>
      ))}
    </Layout>
  );
};

export default IndexPage;

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
