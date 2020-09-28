const fs = require('fs');
const f =
  'node_modules/@capacitor/android/capacitor/src/main/java/com/getcapacitor/plugin/Camera.java';

fs.readFile(f, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(
    'String filename = contentUri.getLastPathSegment()',
    'String filename = "file"'
  );

  fs.writeFile(f, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
