import "../styles/globals.css";
import React from 'react'
import NextApp from 'next/app'
import { Client } from "../prismic-configuration";
import { UniformTracker } from "@uniformdev/optimize-tracker-react";
import localTracker from "../tools/localUniformTracker";

export default class MyApp extends NextApp {
  static async getInitialProps(appCtx) {
    // console.log(appCtx.ctx.req.headers['accept-language'])
    const client = Client();
    const menu = (await client.getSingle("menu")) || {};
    const footer = (await client.getSingle("footer")) || {};
    const menuMarketing = (await client.getSingle("menu-marketing")) || {};
    const footerMarketing = (await client.getSingle("footer-marketing")) || {};
    let categoriesClean = [];
    if(menu.data){
      const categoriesId = menu.data.menu_tabs.map(function(tab) {
        return tab.tab.id
      })
      if (typeof categoriesId[0] !== 'undefined'){
        const categories = (await client.getByIDs(categoriesId)) || {};
        if(categories.results){
          categoriesClean = categories.results.map(function(category) {
            return {
              id: category.data.id,
              name: category.data.name,
              featured: category.data.featured,
              sections: category.data.slices,
            }
          });
        }
      }
    }
  // const response = await fetch(
  //   "https://uniform.app/api/v1/manifest?projectId=cbbfbe77-7a2b-4e5a-82bc-b256e6fb1153",
  //   {
  //   method: "post",
  //   headers: {
  //       "x-api-key":
  //       "uf1fpfqxs5cgrfq04h6x6p6umgg2d0l7uw872ta9n2j8508n64t4c7l2lw99z9up0m7xpa3306sxklnethwr2lvjs9hn2vj08",
  //   },
  //   }
  // );
  //const data = await response.json()
    return {
      props: {
        //data: localTracker(data),
        menu: menu,
        footer: footer,
        menuMarketing: menuMarketing,
        footerMarketing: footerMarketing,
        categories: categoriesClean,
      },
    };
  }

  render() {
    const { Component, pageProps, props } = this.props
    return (
      <UniformTracker trackerInstance={localTracker}>
        <Component {...pageProps} menu={props.menu} menuMarketing={props.menuMarketing} footer={props.footer} footerMarketing={props.footerMarketing} categories={props.categories} />
      </UniformTracker>
    )
  }
}