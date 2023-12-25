// utils.js
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
  
  module.exports = {
    extractIdentificationNumber,
    extractName,
    extractLastName,
    extractDateOfBirth,
    extractDateOfIssue,
    extractDateOfExpiry
  };
  