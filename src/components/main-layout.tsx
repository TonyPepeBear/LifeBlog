import * as React from "react";
import { Helmet } from "react-helmet";
import "../styles/main-layout.css";

const MainLayout = (props: Props) => {
  const { title = "TonyPepe - Life", children, image = defaultImage } = props;
  React.useEffect(() => {}, []);
  return (
    <article className="bg-gray-1">
      <Helmet title={title}>
        <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-P8BKJWQW7W"
        />
        <script src="/g-analytics.js" />
      </Helmet>
      <article className="h-10" /> {/* space */}
      <nav className="flex justify-center">
        <a href="/" className="no-underline">
          <div className="font-bold text-3xl cursor-pointer text-black">
            TonyPepe - Life
          </div>
        </a>
      </nav>
      <article className="h-10" /> {/* space */}
      <main className="bg-white mx-0 lg:mx-40 xl:mx-50 2xl:mx-80">
        <img
          className="w-full h-60 sm:h-80 xl:h-100 object-cover"
          src={image}
        />
        {children}
      </main>
      <footer className="py-20">
        <div className="text-center">TonyPepe &copy; 2022</div>
      </footer>
    </article>
  );
};

const defaultImage =
  "https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/b6871241-ba25-401c-871f-857eef8be900/public";

interface Props {
  title?: string;
  image?: string;
  children: React.ReactNode;
}

export default MainLayout;
