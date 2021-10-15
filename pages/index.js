import { Client } from "../prismic-configuration";
import SliceZone from "next-slicezone";
import { useGetStaticPaths } from "next-slicezone/hooks";

import resolver from "../sm-resolver.js";
import Layout from "../components/Layout";
import useUpdatePreviewRef from '../tools/useUpdatePreviewRef' //import from where you store this file

import { getInitialLocale } from '../tools/getInitialLocale'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Page = (props) => {
  useUpdatePreviewRef(props.previewData.ref, props.id)
  useUpdateToolbarDocs(homepageToolbarDocs(props.uid, props.previewData.ref), [props])
  const router = useRouter()
  React.useEffect(() => {
    router.replace('/[lang]', `/${getInitialLocale()}`)
  })
  return (
    <Layout menu={props.menu} footer={props.footer} categories={props.categories} lang={props.lang} altLangs={props.alternate_languages}>
      <SliceZone {...props} resolver={resolver} />
    </Layout>
  );
};

// Fetch content from prismic
// export const getStaticProps = useGetStaticProps({
//   client: Client(),
//   type: 'home-page', 
//   queryType: 'single',
// });

export async function getStaticProps(context) {
  console.log(context)
  const document = await Client().getSingle('home-page')
  if (!document) {
    return {
      notFound: true,
    }
  }
  return {
    props:{
      ...document,
      previewData: context.previewData || {},
      preview: context.preview || {},
      slices: document.data.slices
    }, // will be passed to the page component as props
  }
}

const useUpdateToolbarDocs = (docQuery, deps) => {
  useEffect(() => {
    docQuery()
  }, deps)
}

const homepageToolbarDocs = (uid, ref = null) => (async () => {
  const pageDocsPromise = getHomepageDocs(ref)
  //const layoutPromise = getLayout(ref, { fetch: 'layout.prismic_display_name' })
  //const prismicDocs = await Promise.all([pageDocsPromise, layoutPromise])
  const prismicDocs = await Promise.all([pageDocsPromise])
  const [{page}] = prismicDocs

  return {
    page
  }
})

const asyncHandler = (cb) => (
  async (...args) => {
    try {
      return await cb(...args)
    } catch (error) {
      console.log(error)
      return null
    }
  }
)

const getHomepageDocs = asyncHandler(async (ref = null) => {
  const page = await getDocumentByUID('home-page', { ref }) || null // , fetch: 'homepage.slices' 
  
  return { page }
})

const getDocumentByUID = asyncHandler(async (type, options = {}) => (
  Client().getSingle(type, options)
))

export default Page;
