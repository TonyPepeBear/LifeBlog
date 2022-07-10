import * as React from "react";
import { Helmet } from "react-helmet";

const IndexPage = () => {
  return (
    <main>
      <div>
        <Helmet>
          <title>Home</title>
          <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime" />
        </Helmet>
        <h1 className="text-xl">Hi</h1>
      </div>
    </main>
  );
};

export default IndexPage;
