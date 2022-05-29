import { graphql, PageProps } from "gatsby";
import Prism from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-ruby";
import "prismjs/themes/prism.css";
import React from "react";
import Layout from "../../components/layout";
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

  return (
    <Layout pageTitle={post?.document?.title || ""}>
      <p>
        <span>版本 {data.asciidoc?.revision?.number}</span> |
        <span>发表于 {data.asciidoc?.revision?.date}</span>
      </p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}

export default Template;

export const pageQuery = graphql`
  query PostQuery($id: String!) {
    asciidoc(id: { eq: $id }) {
      id
      html
      document {
        title
      }
      pageAttributes {
        slug
        category
      }
      revision {
        date
        number
      }
    }
  }
`;
