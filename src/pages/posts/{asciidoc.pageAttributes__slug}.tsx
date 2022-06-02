import { graphql, PageProps } from "gatsby";
import Prism from "prismjs";
import "prismjs/components/prism-asciidoc";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cmake";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-go";
import "prismjs/components/prism-groovy";
import "prismjs/components/prism-ini";
import "prismjs/components/prism-java";
import "prismjs/components/prism-lisp";
import "prismjs/components/prism-nginx";
import "prismjs/components/prism-properties";
import "prismjs/components/prism-protobuf";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-systemd";
import "prismjs/components/prism-toml";
import "prismjs/components/prism-yaml";
import "prismjs/themes/prism.css";
import React from "react";
import Layout from "../../components/layout";

const Template = (props: PageProps<Queries.PostQuery>) => {
  const data = props.data;
  const post = props.data.asciidoc;
  const [html, setHtml] = React.useState("");

  React.useEffect(() => {
    if (post?.html) {
      const doc = new DOMParser().parseFromString(post.html, "text/html");
      doc.querySelectorAll("pre.highlight > code").forEach(function (el) {
        const lang = el.getAttribute("data-lang");
        if (!lang || lang === "text") return;

        Prism.highlightElement(el, false);
      });
      setHtml(doc.body.innerHTML);
    } else {
      setHtml("");
    }
  }, [post?.html]);

  return (
    <Layout>
      <article className="post">
        <header>
          <h1>{data.asciidoc?.document?.title}</h1>
          <div className="post-meta">
            <div className="post-meta-item">
              版本 {data.asciidoc?.revision?.number}
            </div>
            <div className="post-meta-item">
              发表于
              <time dateTime={data.asciidoc?.revision?.date || "1970-01-01"}>
                {data.asciidoc?.revision?.date || "1970-01-01"}
              </time>
            </div>
          </div>
        </header>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  );
};

export const query = graphql`
  query Post($id: String!) {
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

export default Template;
