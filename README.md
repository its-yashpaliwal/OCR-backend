# OCR Data Extraction Backend

This backend service is designed to process images using Optical Character Recognition (OCR) and extract relevant identification information. The extracted data includes identification number, name, last name, date of birth, date of issue, and date of expiry. The backend is built using Node.js, Express, Multer for file uploads, and Tesseract.js for OCR.

## Getting Started

### Prerequisites

Ensure you have the following software installed on your machine:

- Node.js

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/its-yashpaliwal/OCR-backend.git
   cd OCR-backend
2. Install dependencies
   ```bash
   npm install
   ```

## Usage
1. Start the server:
   ```bash
   node app.js
2. Upload an image
   Use the '/upload' endpoint with a POST request and attach an image file named 'image'.
3. Perform OCR and Extract Data
   The backend will process the uploaded image using Tesseract.js and extract identification information.
4. View Extracted Data
   The extracted data is logged to the console and can be further used or saved to a database as needed.

## Note
1. Ensure that Tesseract is installed on your system. You can download it from Tesseract GitHub.
2. Adjust the extraction functions in the code if the OCR output format changes.
