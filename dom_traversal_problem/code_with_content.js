const fs = require('fs');
const cheerio = require('cheerio');

fs.readFile('index.html', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const $ = cheerio.load(data);

  $('body').children().each((_, element) => {
    const tagName = element.tagName.toLowerCase();
    const isVoidElement = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/.test(tagName);
    if (!isVoidElement) {
      const openTag = `<${tagName}>`;
      const closeTag = `</${tagName}>`;
      const html = $(element).html();
      if (!html.includes(closeTag)) {
        $(element).append(closeTag);
      }
    }
  });

  fs.writeFile('index.html', $.html(), 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('HTML file updated successfully!');
  });
});
