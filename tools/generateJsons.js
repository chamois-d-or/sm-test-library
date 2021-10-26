smJson=JSON.stringify({
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

function generateSMJson(){
    var fs = require('fs');
    fs.writeFile("sm.json", smJson, function(err, result) {
        if(err) console.log('error', err);
      });
    return null
}

generateSMJson()