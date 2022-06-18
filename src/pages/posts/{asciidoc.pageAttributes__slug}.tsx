import { deflate } from "deflate-js";
import { graphql, Link, PageProps } from "gatsby";
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
import "prismjs/themes/prism-coy.css";
import React from "react";
import Layout from "../../components/layout";
import plantUMLEncode64 from "../../utils/plantuml-encode64";
import * as styles from "./post.module.css";

const placeholder = "PLACEHOLDER_COLUMN{n}";
const placeholderRegex = RegExp("PLACEHOLDER_COLUMN(\\d+)", "g");
const conum = '<i class="conum" data-value="{n}"></i><b>{n}</b>';
const conumRegex = RegExp(
  '<i class="conum" data-value="(\\d+)"></i><b>\\(\\d+\\)</b>',
  "g"
);

const plantUMLURL = "http://localhost:8080/svg";

const Post = (props: PageProps<Queries.PostQuery>) => {
  const post = props.data.asciidoc;
  const [html, setHtml] = React.useState<string>("");

  React.useEffect(() => {
    if (!post?.html) return;

    const doc = new DOMParser().parseFromString(post.html, "text/html");
    doc.querySelectorAll("pre.highlight > code").forEach(function (el) {
      const lang = el.getAttribute("data-lang");
      if (!lang) return;
      if (lang === "plantuml") {
        const str = plantUMLEncode64(
          deflate(new TextEncoder().encode(el.textContent || ""), 9)
        );
        const img = document.createElement("img");
        img.classList.add(lang);
        img.src = `https://www.plantuml.com/plantuml/svg/${str}`;
        el.parentElement?.replaceWith(img);
      } else {
        el.innerHTML = el.innerHTML.replace(conumRegex, (_, i) =>
          placeholder.replace("{n}", i)
        );

        Prism.highlightElement(el, false);

        el.innerHTML = el.innerHTML.replace(placeholderRegex, (_, i) =>
          conum.replaceAll("{n}", i)
        );
      }
    });
    setHtml(doc.body.innerHTML);
  }, [post?.html]);

  return (
    <Layout>
      <article className="post">
        <header>
          <h1>{post?.document?.title}</h1>
          <div className={styles.postMeta}>
            <div className={styles.postMetaItem}>
              <i className="fa fa-folder" aria-hidden="true"></i>
              <Link to={`/categories/${post?.pageAttributes?.category}`}>
                {post?.pageAttributes?.category}
              </Link>
            </div>
            <div className={styles.postMetaItem}>
              版本 {post?.revision?.number}
            </div>
            <div className={styles.postMetaItem}>
              发表于
              <time dateTime={post?.revision?.date || "1970-01-01"}>
                {post?.revision?.date || "1970-01-01"}
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

export default Post;
