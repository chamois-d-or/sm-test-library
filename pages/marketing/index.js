import { Client } from "../../prismic-configuration";
import SliceZone from "next-slicezone";
import { useGetStaticProps } from "next-slicezone/hooks";

import resolver from "../../sm-resolver.js";
import Layout from "../../components/Layout";
import useUpdatePreviewRef from '../../tools/useUpdatePreviewRef' //import from where you store this file

import { useEffect } from 'react'
import LayoutMarketing from "../../components/LayoutMarketing";

const Page = (props) => {
  useUpdatePreviewRef(props.previewData.ref, props.id)
  useUpdateToolbarDocs(homepageToolbarDocs(props.uid, props.previewData.ref), [props])
  return (
    <LayoutMarketing menuMarketing={props.menuMarketing} footerMarketing={props.footerMarketing} categories={props.categories}>
      <SliceZone {...props} resolver={resolver} />
    </LayoutMarketing>
  );
};

// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: 'marketing-homepage', 
  queryType: 'single',
});

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
  const page = await getDocumentByUID('marketing-homepage', { ref }) || null // , fetch: 'homepage.slices' 
  
  return { page }
})

const getDocumentByUID = asyncHandler(async (type, options = {}) => (
  Client().getSingle(type, options)
))

export default Page;
