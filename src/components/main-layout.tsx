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
      <main className="bg-white mx-0 lg:mx-40 xl:mx-60 ">
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
  "https://images.unsplash.com/photo-1470004914212-05527e49370b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80";

interface Props {
  title?: string;
  image?: string;
  children: React.ReactNode;
}

export default MainLayout;
