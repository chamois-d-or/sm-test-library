import React from "react";
import Head from "next/head";
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, menu, footer, categories, lang, altLangs }) => {
  return (
    <div>
      <Head>
        <title> Prismic E-commerce Demo </title>
      </Head>
      { menu.data ?
        <Header menu={menu} categories={categories} lang={lang} altLangs={altLangs}/>
        : <span/>
      }
      <main>{children}</main>
      { footer.data ?
        <Footer footer={footer}/>
        : <span/>
      }
    </div>
  )
};

export default Layout;