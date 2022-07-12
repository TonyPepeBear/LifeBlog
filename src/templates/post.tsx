import * as React from "react";
import MainLayout from "../components/main-layout";
import Showdown from "showdown";
import * as yaml from "yaml";

const PostTemplate = (props: Props) => {
  const { mdData } = props.pageContext;
  const raw_md = mdData.raw;

  const md = new Showdown.Converter({
    metadata: true,
    disableForced4SpacesIndentedSublists: true,
    extensions: [...customMDClass],
  });
  const html = md.makeHtml(raw_md);
  // @ts-ignore
  const metaData: MetaData = yaml.parse(md.getMetadata(true));

  return (
    <MainLayout
      title={metaData.title + " - TonyPepe Life"}
      image={metaData.image}
    >
      <div className="px-2 md:px-10 text-justify">
        <h1 className="text-4xl">{metaData.title}</h1>
        <time dateTime={metaData.date}>{metaData.date}</time>
        <article
          className="text-xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <hr /> {/* h line */}
        {/* tags */}
        <div className="py-6 flex flex-wrap">
          tags: &ensp;
          {metaData.tags.map((tag) => (
            <div className="mr-2">{tag}</div>
          ))}
        </div>
        <div>
          <a
            rel="license"
            href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh_TW"
            target="_blank"
          >
            <img
              alt="創用 CC 授權條款"
              src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png"
            />
          </a>
        </div>
        <div className="h-8" /> {/* space */}
      </div>
    </MainLayout>
  );
};

interface Props {
  pageContext: {
    mdData: MDData;
  };
}

interface MDData {
  path: string;
  raw: string;
  git_history_time: string;
}

interface MetaData {
  title: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
}

const customClasses = {
  h2: "text-3xl font-bold",
  img: "max-w-full",
  a: "text-black underline",
};

const customMDClass = Object.keys(customClasses).map((key) => {
  return {
    type: "output",
    regex: new RegExp(`<${key}(.*)>`, "g"),
    // @ts-ignore
    replace: `<${key} class="${customClasses[key]}" $1>`,
  };
});

export default PostTemplate;
