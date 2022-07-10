import { GatsbyNode } from "gatsby";
import * as fs from "fs";
import * as showdown from "showdown";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  console.log("-------createPages--------");
  console.log(getAllMarkdownFiles());
  const c = new showdown.Converter({ metadata: true });
  const html = c.makeHtml(fs.readFileSync(getAllMarkdownFiles()[0], "utf8"));
  console.log(html);
  console.log(c.getMetadata());
  
};

function getAllMarkdownFiles(file = "src/posts"): string[] {
  console.log(file);
  if (fs.lstatSync(file).isDirectory()) {
    const files: string[] = [];
    fs.readdirSync(file).forEach((f) => {
      if (f.endsWith(".md")) {
        files.push(file + "/" + f);
      } else {
        files.push(...getAllMarkdownFiles(file + "/" + f));
      }
    });
    return files;
  }
  if (file.endsWith(".md")) {
    return [file];
  }
  return [];
}
