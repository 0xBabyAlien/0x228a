const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join(process.cwd(), '404.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  res.status(404).setHeader('Content-Type', 'text/html');
  res.end(html);
};
