import * as React from "react";
import Showdown from "showdown";
import * as yaml from "yaml";
import MainLayout from "../components/main-layout";

export default function IndexPage({ pageContext }: Props) {
  const { mdData } = pageContext;
  const fullData = mdData
    .map((f) => {
      const converter = new Showdown.Converter({
        metadata: true,
        disableForced4SpacesIndentedSublists: true,
      });
      converter.makeHtml(f.raw);
      // @ts-ignore
      const metaData: MetaData = yaml.parse(converter.getMetadata(true));
      const fullData: MDFullData = {
        ...f,
        metaData,
      };
      return fullData;
    })
    .sort((a, b) => {
      const aDate = new Date(a.metaData.date);
      const bDate = new Date(b.metaData.date);
      return bDate.getTime() - aDate.getTime();
    });
  return (
    <MainLayout>
      <div className="pt-6 px-2 text-justify grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-6">
        {fullData.map((d) => {
          const { metaData } = d;
          return (
            <a href={"/posts/" + d.path} className="text-black no-underline">
              <div className="shadow-lg">
                <img
                  className="w-full h-40 object-cover"
                  src={metaData.image}
                />
                <div className="px-2 pb-6">
                  <h2 className="text-xl">{metaData.title}</h2>
                  <time dateTime={metaData.date}>{metaData.date}</time>
                </div>
              </div>
            </a>
          );
        })}
      </div>
      <div className="h-6" /> {/* space */}
    </MainLayout>
  );
}

interface Props {
  pageContext: {
    mdData: MDData[];
  };
}

interface MDData {
  path: string;
  raw: string;
  git_history_time: string;
}

interface MDFullData extends MDData {
  metaData: MetaData;
}

interface MetaData {
  title: string;
  image: string;
  date: string;
}
