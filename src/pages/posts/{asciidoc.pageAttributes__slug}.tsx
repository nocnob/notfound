import { graphql, PageProps } from "gatsby";
import Prism from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-ruby";
import "prismjs/themes/prism.css";
import React from "react";
import "./asciidoctor.css";

function Template({ data }: PageProps<Queries.PostQueryQuery>) {
  const post = data.asciidoc;
  const [html, setHtml] = React.useState("");

  React.useEffect(() => {
    if (post?.html) {
      const doc = new DOMParser().parseFromString(post.html, "text/html");
      doc.querySelectorAll("pre.highlight > code").forEach(function (el) {
        Prism.highlightElement(el, false);
      });
      setHtml(doc.body.innerHTML);
    } else {
      setHtml("");
    }
  }, [post?.html]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
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
