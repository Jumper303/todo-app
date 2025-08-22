import pkg from 'aws-sdk';
const { config } = pkg;
import fs from 'fs';
import { v4 as uuid } from "uuid";
import { TextractClient } from "@aws-sdk/client-textract";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import { AnalyzeDocumentCommand } from "@aws-sdk/client-textract";

config.getCredentials(function(err) {
  if (err) { 
    console.log(err.stack); 
  }
  // credentials not loaded
  else {
    console.log("Access key:", config.credentials.accessKeyId);
  }
});

console.log("Region: ", config.region);
console.log("Profile: ", process.env.AWS_PROFILE);

// ==================================================

function uploadFile(bucketName, fileName) {
  // Create unique name for uploaded object key
  var keyName = "document-"+ uuid();

  // Create bucket if it does not exist
  var createBucketPromise = new pkg.S3({ apiVersion: "2006-03-01" }).headBucket({ Bucket: bucketName })
  .promise().then(function (data) {
    if (data.$response.httpResponse.statusCode === 200) {
      console.log("Bucket already exists");
    } else {
      console.log("Create bucket");
      new pkg.S3({ apiVersion: "2006-03-01" }).createBucket({ Bucket: bucketName }).promise();
    }
  });

  createBucketPromise
  .then(function () {
    fs.readFile( "./data/"+fileName, function (err, data) {
      if (err) throw err; // file read error
      var s3bucket = new pkg.S3({apiVersion: "2006-03-01", params: {Bucket: bucketName}});
      s3bucket.upload({Key: keyName, Body: data}).promise().then(function () {
        console.log("File uploaded");
      }).catch(function (err) {
        // file upload error
        console.error(err, err.stack);
      });
    });
  })
  .catch(function (err) {
    console.error(err, err.stack);
  });
}

// uploadFile("jumper-sample-bucket", "sample_card.png");

const REGION = "eu-west-1"; //e.g. "us-east-1"
const PROFILE = "private";

const textractClient = new TextractClient({region: REGION, 
  credentials: fromIni({profile: PROFILE,}), 
});

const bucket = 'jumper-sample-bucket'
const key = 'document-17cf1a82-b191-4664-880c-35b902a3e488'

// Set params
const params = {
    Document: {
      S3Object: {
        Bucket: bucket,
        Name: key
      },
    },
    FeatureTypes: ['TABLES', 'FORMS', 'QUERIES'],
    QueriesConfig: { 
      Queries: [ 
         { 
            Alias: "AddressQuery",
            Pages: [ "1" ],
            Text: "What are the texts in the two rows under the Anschrift/Address/Adresse field, in uppercase?"
         }
      ]
   },
  }

const displayBlockInfo = async (response) => {
    try {
        response.Blocks.forEach(block => {
            // console.log(`ID: ${block.Id}`)
            // console.log(`Block Type: ${block.BlockType}`)
            if ("Text" in block && block.Text !== undefined){
                console.log(`Text: ${block.Text}`)
            }
         
            // if ("Confidence" in block && block.Confidence !== undefined){
            //     console.log(`Confidence: ${block.Confidence}`)
            // }
            // else{
            //     console.log(`Confidence: undefined`)
            // }
            // if (block.BlockType == 'CELL'){
            //     console.log("Cell info:")
            //     console.log(`   Column Index - ${block.ColumnIndex}`)
            //     console.log(`   Row - ${block.RowIndex}`)
            //     console.log(`   Column Span - ${block.ColumnSpan}`)
            //     console.log(`   Row Span - ${block.RowSpan}`)
            // }
            // if ("Relationships" in block && block.Relationships !== undefined){
            //     console.log(block.Relationships)
            //     console.log("Geometry:")
            //     console.log(`   Bounding Box - ${JSON.stringify(block.Geometry.BoundingBox)}`)
            //     console.log(`   Polygon - ${JSON.stringify(block.Geometry.Polygon)}`)
            // }
            // console.log("-----")
        });
      } catch (err) {
        console.log("Error", err);
      }
}

const analyze_document_text = async () => {
    try {
        const analyzeDoc = new AnalyzeDocumentCommand(params);
        const response = await textractClient.send(analyzeDoc);
        console.log(JSON.stringify(response));
        // displayBlockInfo(response)
        return response; // For unit tests.
      } catch (err) {
        console.log("Error", err);
      }
}

analyze_document_text()