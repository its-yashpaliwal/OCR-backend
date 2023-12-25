const express = require('express');
const multer = require('multer');
const app = express();
const fs = require('fs');
var Tesseract = require('tesseract.js');

//middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const connectToMongo = require('./db');
connectToMongo();

const PORT = process.env.PORT | 5000;


// Define functions to extract information from OCR text
function extractIdentificationNumber(ocrText) {
  const identificationNumberRegex = /\b(\d+\s\d+\s\d+\s\d+\s\d+)\b/;
  const match = ocrText.match(identificationNumberRegex);
  return match ? match[1] : null;
}

function extractName(ocrText) {
  const nameRegex = /Name\s*(\S+\s+\S+)/;
  const match = ocrText.match(nameRegex);
  return match ? match[1] : null;
}

function extractLastName(ocrText) {
  const lastNameRegex = /name\s*(\S+)/;
  const match = ocrText.match(lastNameRegex);
  return match ? match[1] : null;
}

function extractDateOfBirth(ocrText) {
  const dobRegex = /Date\sof\sBirth\s*([\s\S]+?\d{4})/;
  const match = ocrText.match(dobRegex);
  return match ? match[1].trim() : null;
}

function extractDateOfIssue(ocrText) {
  const issueRegex = /Date\sof\sIssue\s*([\s\S]+?\d{4})/;
  const match = ocrText.match(issueRegex);
  return match ? match[1].trim() : null;
}

function extractDateOfExpiry(ocrText) {
  const expiryRegex = /Date\sof\sExpiry\s*([\s\S]+?\d{4})/;
  const match = ocrText.match(expiryRegex);
  return match ? match[1].trim() : null;
}



var Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + '/images');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

var upload = multer({
  storage: Storage
}).single('image');
//route
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', async (req, res) => {
  
  await upload(req, res, err => {
    if (err) {
      console.log(err);
      return res.send('Something went wrong');
    }

    var image = fs.readFileSync(
      __dirname + '/images/' + req.file.originalname,
      {
        encoding: null
      }
    );
    Tesseract.recognize(image)
      .progress(function(p) {
        console.log('progress', p);
      })
      .then(function(result) {
        const ocrText = result.text;
        const identificationNumber = extractIdentificationNumber(ocrText);
        const name = extractName(ocrText);
        const lastName = extractLastName(ocrText);
        const dateOfBirth = extractDateOfBirth(ocrText);
        const dateOfIssue = extractDateOfIssue(ocrText);
        const dateOfExpiry = extractDateOfExpiry(ocrText);
        
        // Create JSON object
        const jsonResult = {
          identification_number: identificationNumber,
          name: name,
          last_name: lastName,
          date_of_birth: dateOfBirth,
          date_of_issue: dateOfIssue,
          date_of_expiry: dateOfExpiry
        };
        console.log(jsonResult);
        res.send(ocrText);
      });
  });
});

app.get('/showdata', (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
