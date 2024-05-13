const cheerio = require('cheerio');

function extractHeadingText(html) {
  // Load the HTML content with cheerio
  const $ = cheerio.load(html);

  // Find all <h1> and <h2> elements
  const headings = $('h1, h2');

  // Extract the text content from each heading
  const headingTexts = [];
  headings.each((index, element) => {
    const headingText = $(element).text();
    headingTexts.push(headingText);
  });

  return headingTexts;
}

// Example usage
const htmlContent = '<h1><span style="font-size:11px"><span style="font-family:Arial,Helvetica,sans-serif"><big><span style="background-color:#f39c12">i should try and test tgjs&nbsp;</span></big></span></span></h1>';
const extractedTexts = extractHeadingText(htmlContent);
console.log(extractedTexts); 