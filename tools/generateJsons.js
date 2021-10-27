const smJson=JSON.stringify({
    "apiEndpoint": process.env.NEXT_PUBLIC_API_ENDPOINT,
    "libraries": [
      "@/slices/ecommerce",
      "@/slices/marketing",
      "@/slices/navigation",
      "@/slices"
    ],
    "_latest": "0.1.0",
    "storybook": "http://localhost:8888"
  }, null, 2)

const prismicRepoName = /([a-zA-Z0-9-]+)?(\.cdn)?\.prismic\.io/.exec(process.env.NEXT_PUBLIC_API_ENDPOINT)[1] //Regex to get repo ID

function generateSMJson(){
    var fs = require('fs');
    fs.writeFile("sm.json", smJson, function(err, result) {
        if(err) console.log('error', err);
      });
    return null
}

function modifyIntegrationFieldsProductListWithCTA() {
  const fs = require('fs');
  const fileName = './../slices/ecommerce/ProductListWithCta/model.json';
  const file = require(fileName);
  
  file.variations[0].items.topProduct.config.catalog = prismicRepoName+"--products";
  file.variations[1].items.topProduct.config.catalog = prismicRepoName+"--custom_products";
      
  fs.writeFile("/Users/alexandrec/Documents/First_Project/demo-sm-next-ecom/demo-sm-next-ecom/slices/ecommerce/ProductListWithCta/model.json", JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    //console.log(JSON.stringify(file, null, 2));
    console.log('writing to ' + fileName);
  });
}

function modifyIntegrationFieldsProductOverviewWithImageGrid() {
  const fs = require('fs');
  const fileName = './../slices/ecommerce/ProductOverviewWithImageGrid/model.json';
  const file = require(fileName);
  
  file.variations[0].primary.product.config.catalog = prismicRepoName+"--products";
      
  fs.writeFile("/Users/alexandrec/Documents/First_Project/demo-sm-next-ecom/demo-sm-next-ecom/slices/ecommerce/ProductOverviewWithImageGrid/model.json", JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    //console.log(JSON.stringify(file, null, 2));
    console.log('writing to ' + fileName);
  });
}

function modifyIntegrationFieldsPromoSectionImageTiles() {
  const fs = require('fs');
  const fileName = './../slices/ecommerce/PromoSectionImageTiles/model.json';
  const file = require(fileName);
  
  file.variations[0].primary.intent.config.catalog = prismicRepoName+"--intents";
      
  fs.writeFile("/Users/alexandrec/Documents/First_Project/demo-sm-next-ecom/demo-sm-next-ecom/slices/ecommerce/PromoSectionImageTiles/model.json", JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    //console.log(JSON.stringify(file, null, 2));
    console.log('writing to ' + fileName);
  });
}

modifyIntegrationFieldsPromoSectionImageTiles()
modifyIntegrationFieldsProductOverviewWithImageGrid()
modifyIntegrationFieldsProductListWithCTA()
generateSMJson()