import { graphql, PageProps } from "gatsby";
import React from "react";

function Template({ data }: PageProps<Queries.PostQueryQuery>) {
  const post = data.asciidoc;
  return <div dangerouslySetInnerHTML={{ __html: post?.html || "" }} />;
}

export default Template;

export const pageQuery = graphql`
  query PostQuery($pageAttributes__slug: String!) {
    asciidoc(pageAttributes: { slug: { eq: $pageAttributes__slug } }) {
      pageAttributes {
        slug
        title
        category
      }
      id
      html
    }
  }
`;
