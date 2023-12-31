import type { GatsbyNode } from "gatsby";
import _ from "lodash";
import path from "path";

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  const createTags = async () => {
    const tagsTemplate = path.resolve("src/templates/tags.tsx");

    const tagsResult = await graphql<
      Queries.TagsQuery,
      Queries.TagQueryVariables
    >(`
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
    if (tagsResult.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }

    const tags = tagsResult.data?.allAsciidoc.group || [];
    tags.forEach((tag) => {
      if (tag.fieldValue)
        createPage({
          path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
          component: tagsTemplate,
          context: {
            tag: tag.fieldValue,
          },
        });
    });
  };

  const createCategories = async () => {
    const categoriesTemplate = path.resolve("src/templates/categories.tsx");
    const categoriesResult = await graphql<
      Queries.CategoriesQuery,
      Queries.CategoriesQueryVariables
    >(
      `
        query Categories {
          allAsciidoc(filter: { pageAttributes: { draft: { ne: "true" } } }) {
            group(field: { pageAttributes: { category: SELECT } }) {
              totalCount
              field
              fieldValue
            }
          }
        }
      `
    );

    // handle errors
    if (categoriesResult.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }

    const categories = categoriesResult.data?.allAsciidoc.group || [];
    categories.forEach((category) => {
      if (category.fieldValue)
        createPage({
          path: `/categories/${_.kebabCase(category.fieldValue)}/`,
          component: categoriesTemplate,
          context: {
            category: category.fieldValue,
          },
        });
    });
  };

  await createCategories();
  await createTags();
};
