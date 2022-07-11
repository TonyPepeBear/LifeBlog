import * as React from "react";
import Showdown from "showdown";
import * as yaml from "yaml";
import MainLayout from "../components/main-layout";

export default function IndexPage({ pageContext }: Props) {
  const { mdData } = pageContext;
  const fullData = mdData.map((f) => {
    const converter = new Showdown.Converter({ metadata: true });
    converter.makeHtml(f.raw);
    // @ts-ignore
    const metaData: MetaData = yaml.parse(converter.getMetadata(true));
    const fullData: MDFullData = {
      ...f,
      metaData,
    };
    return fullData;
  });

  return <MainLayout>{JSON.stringify(fullData)}</MainLayout>;
}

interface Props {
  pageContext: {
    mdData: MDData[];
  };
}

interface MDData {
  path: string;
  raw: string;
}

interface MDFullData {
  path: string;
  raw: string;
  metaData: MetaData;
}

interface MetaData {
  title: string;
  image: string;
  date: string;
}
