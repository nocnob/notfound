import { Link } from "gatsby";
import React from "react";
import * as styles from "./posts.module.css";

type PostsProps = {
  posts: ReadonlyArray<
    Pick<Queries.Asciidoc, "id" | "document" | "revision" | "pageAttributes">
  >;
};

const Posts = (props: PostsProps) => {
  const { posts } = props;

  return (
    <ul className={styles.postList}>
      {posts.map((post) => (
        <li key={post.id} className={styles.postItem}>
          <div className={styles.postItemMeta}>
            <time dateTime={post.revision?.date || "1970-01-01"}>
              {post.revision?.date || "1970-01-01"}
            </time>
          </div>
          <div className={styles.postTitle}>
            <Link to={`/posts/${post.pageAttributes?.slug}/`}>
              {post.document?.title}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
