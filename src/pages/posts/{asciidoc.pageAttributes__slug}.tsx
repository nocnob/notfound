import { deflate } from "deflate-js";
import { graphql, Link, PageProps } from "gatsby";
import Prism from "prismjs";
import "prismjs/components/prism-asciidoc";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cmake";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-dns-zone-file";
import "prismjs/components/prism-go";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-groovy";
import "prismjs/components/prism-ini";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-lisp";
import "prismjs/components/prism-makefile";
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

type Toc = {
  title: string;
  level: string;
  id: string;
};

function level(l: string): any {
  switch (l) {
    case "H1":
      return styles.levelH2;
    case "H2":
      return styles.levelH2;
    case "H3":
      return styles.levelH3;
    case "H4":
      return styles.levelH4;
    default:
      return styles.levelH3;
  }
}

function plantumlServer(str: string) {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:8001/svg/${str}`;
  } else {
    return `https://www.plantuml.com/plantuml/svg/${str}`;
  }
}

const Post = (props: PageProps<Queries.PostQuery>) => {
  const post = props.data.asciidoc;
  const [html, setHtml] = React.useState<string>("");
  const [toc, setToc] = React.useState<Array<Toc>>([]);

  React.useEffect(() => {
    if (!post?.html) return;
    const doc = new DOMParser().parseFromString(post.html, "text/html");

    const tocArray: Array<Toc> = [];
    doc.querySelectorAll("h2, h3").forEach(function (el) {
      if (!el.textContent) return;

      console.log(el.id);
      tocArray.push({
        title: el.textContent,
        level: el.nodeName,
        id: `#${el.id}`,
      });
    });
    console.log(tocArray);
    setToc(tocArray);

    doc.querySelectorAll("pre.highlight > code").forEach(function (el) {
      const lang = el.getAttribute("data-lang");
      if (!lang) return;
      if (lang === "plantuml") {
        const str = plantUMLEncode64(
          deflate(new TextEncoder().encode(el.textContent || ""), 9)
        );
        const img = document.createElement("img");
        img.classList.add(lang);
        img.src = plantumlServer(str);
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
      <aside className={styles.toc}>
        <ul>
          {toc.map((t, i) => (
            <li key={i} className={level(t.level)}>
              <a href={t.id}>{t.title}</a>
            </li>
          ))}
        </ul>
      </aside>
      <article className="post">
        <header>
          <h1>{post?.document?.title}</h1>
          <br />
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
