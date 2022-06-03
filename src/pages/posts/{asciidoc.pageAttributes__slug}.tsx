import { graphql, PageProps } from "gatsby";
import Prism from "prismjs";
import "prismjs/components/prism-asciidoc";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cmake";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-go";
import "prismjs/components/prism-graphql";
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
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";
import "prismjs/themes/prism.css";
import React from "react";
import Layout from "../../components/layout";

const placeholder = "PLACEHOLDER_COLUMN{n}";
const placeholderRegex = RegExp("PLACEHOLDER_COLUMN(\\d+)", "g");
const conum = '<i class="conum" data-value="{n}"></i><b>{n}</b>';
const conumRegex = RegExp(
  '<i class="conum" data-value="(\\d+)"></i><b>\\(\\d+\\)</b>',
  "g"
);

const Template = (props: PageProps<Queries.PostQuery>) => {
  const data = props.data;
  const post = props.data.asciidoc;
  const [html, setHtml] = React.useState("");

  React.useEffect(() => {
    if (post?.html) {
      const doc = new DOMParser().parseFromString(post.html, "text/html");
      doc.querySelectorAll("pre.highlight > code").forEach(function (el) {
        if (!el.getAttribute("data-lang")) return;

        el.innerHTML = el.innerHTML.replace(conumRegex, (_, i) =>
          placeholder.replace("{n}", i)
        );

        Prism.highlightElement(el, false);

        el.innerHTML = el.innerHTML.replace(placeholderRegex, (_, i) =>
          conum.replaceAll("{n}", i)
        );
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
