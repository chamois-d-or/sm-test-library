import Prismic from "@prismicio/client";
import Link from "next/link";

import smConfig from "./sm.json";

if (!smConfig.apiEndpoint) {
  console.warn("Looks like Slice Machine hasn't been bootstraped already.\nCheck the `Getting Started` section of the README file :)");
}

export const apiEndpoint = smConfig.apiEndpoint;

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = "";

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === "uniform-page") {
    return `/uniform/${doc.uid}`;
  }
  if (doc.type === "page") {
    return `/${doc.lang}/${doc.uid}`;
  }
  if (doc.type === "home-page") {
    return `/${doc.lang}`;
  }
  if (doc.type === "product-page") {
    return `/${doc.lang}/product/${doc.uid}`;
  }
  if (doc.type === "blog-page") {
    return `/marketing/${doc.uid}`;
  }
  if (doc.type === "marketing-homepage") {
    return `/marketing/`;
  }
  return "/";
};

export const customLink = (type, element, content, children, index) => (
  <Link
    key={index}
    href={linkResolver(element.data)}
    as={linkResolver(element.data)}
  >
    <a>{content}</a>
  </Link>
);

export const Router = {
  routes: [
    {
      "type":"page",
      "path":"/:lang/:uid"
    },
    {
      "type":"product-page",
      "path":"/:lang/product/:uid"
    },
    {
      "type":"blog-page",
      "path":"/marketing/:uid"
    },
    {
      "type":"marketing-homepage",
      "path":"/marketing/"
    },
    {
      "type":"home-page",
      "path":"/:lang"
    },],
  href: (type) => {
    const route = Router.routes.find(r => r.type === type);
    return route && route.href;
  }
};

export const Client = (req = null, options = {}) => (
  Prismic.client(apiEndpoint, Object.assign({ routes: Router.routes }, options))
);
