import { GatsbyNode } from "gatsby";
import * as fs from "fs";
import path from "path";
import { execSync } from "child_process";

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
      git_history_time: execSync(
        "git log --pretty=%ci" + " " + file.replaceAll(" ", "\\ ")
      ).toString(),
    });
    actions.createPage({
      path: "/posts/" + url_path,
      component: path.resolve("src/templates/post.tsx"),
      context: {
        mdData: allRawMD[allRawMD.length - 1],
      },
    });
  });
  // index page
  actions.createPage({
    path: "/",
    component: path.resolve("src/templates/index.tsx"),
    context: {
      mdData: allRawMD,
    },
  });
  // sitemap.txt
  const posts_urls = allRawMD.map(
    (md) => "https://life.tonypepe.com/posts/" + md.path
  );
  let urls = "https://life.tonypepe.com\n";
  posts_urls.forEach((url) => {
    urls += url + "\n";
  });
  fs.writeFileSync("./public/sitemap.txt", urls);
};

interface MDData {
  path: string;
  raw: string;
  git_history_time: string;
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
