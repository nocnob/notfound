import type { GatsbyNode } from "gatsby";
import path from "path";
import _ from "lodash";

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  const tagTemplate = path.resolve("src/templates/tags.tsx");

  const result = await graphql<Queries.TagsQuery, Queries.TagQueryVariables>(`
    query Tags {
      allAsciidoc(filter: { pageAttributes: { draft: { ne: "true" } } }) {
        group(field: { pageAttributes: { tags: SELECT } }) {
          totalCount
          field
          fieldValue
        }
      }
    }
  `);

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const tags = result.data?.allAsciidoc.group || [];
  tags.forEach((tag) => {
    if (tag.fieldValue)
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      });
  });
};
