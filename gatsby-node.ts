import { GatsbyNode } from "gatsby";
import * as fs from "fs";
import path from "path";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  console.log("------- createPages --------");
  const postsResult = await graphql<PostsQueryResult>(postsQuery);
  const allMarkdownFiles = postsResult.data!!.allFile.edges.map(
    (f) => f.node.absolutePath
  );
  console.log(allMarkdownFiles);
  const allRawMD: MDData[] = [];
  allMarkdownFiles.forEach((file) => {
    const url_path = file
      .split("/posts/")[1]
      .replaceAll("/", "-")
      .replaceAll(" ", "-")
      .replaceAll(".md", "");
    allRawMD.push({
      path: url_path,
      raw: fs.readFileSync(file, "utf8"),
    });
    actions.createPage({
      path: "/posts/" + url_path,
      component: path.resolve("src/templates/post.tsx"),
      context: {
        raw_md: fs.readFileSync(file, "utf8"),
      },
    });
  });
  actions.createPage({
    path: "/",
    component: path.resolve("src/templates/index.tsx"),
    context: {
      mdData: allRawMD,
    },
  });
};

interface MDData {
  path: string;
  raw: string;
}

const postsQuery = `{
  allFile(filter: {sourceInstanceName: {eq: "posts"}}) {
    edges {
      node {
        id
        name
        sourceInstanceName
        absolutePath
      }
    }
  }
}`;

interface PostsQueryResult {
  allFile: {
    edges: {
      node: {
        id: string;
        name: string;
        sourceInstanceName: string;
        absolutePath: string;
      };
    }[];
  };
}
