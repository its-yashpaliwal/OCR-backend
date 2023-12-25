// upload.js
const multer = require('multer');
const fs = require('fs');
const Tesseract = require('tesseract.js');
const { extractIdentificationNumber, extractName, extractLastName, extractDateOfBirth, extractDateOfIssue, extractDateOfExpiry } = require('./utils');

const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + '/images');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({
  storage: Storage
}).single('image');

module.exports = async (req, res) => {
  await upload(req, res, err => {
    if (err) {
      console.log(err);
      return res.send('Something went wrong');
    }

    const image = fs.readFileSync(
      __dirname + '/images/' + req.file.originalname,
      { encoding: null }
    );

    Tesseract.recognize(image)
      .progress(function (p) {
        console.log('progress', p);
      })
      .then(function (result) {
        const ocrText = result.text;
        const identificationNumber = extractIdentificationNumber(ocrText);
        const name = extractName(ocrText);
        const lastName = extractLastName(ocrText);
        const dateOfBirth = extractDateOfBirth(ocrText);
        const dateOfIssue = extractDateOfIssue(ocrText);
        const dateOfExpiry = extractDateOfExpiry(ocrText);

        const jsonResult = {
          identification_number: identificationNumber,
          name: name,
          last_name: lastName,
          date_of_birth: dateOfBirth,
          date_of_issue: dateOfIssue,
          date_of_expiry: dateOfExpiry
        };
        console.log(jsonResult);
        res.send(jsonResult);
      });
  });
};
