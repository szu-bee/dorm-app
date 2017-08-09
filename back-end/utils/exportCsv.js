const fs = require('fs');

const exportCsv = (res, fileName, model) => {
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }

  const stream = model.findAndStreamCsv({})
    .pipe(fs.createWriteStream(fileName));

  stream.on('finish', () => {
    const content = fs.readFileSync(fileName);
    res.send(content);
  });
}

module.exports = exportCsv;