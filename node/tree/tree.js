let path = require('path');
let fs = require('fs');
let async = require('async');

let outputDictOfFilesAndDirs = { files: [], dirs: [] };

function getPathsOfFilesAndDirs(dirPath, callback) {
  fs.readdir(dirPath, function (err, files) {
    if (err) return callback(err);

    let filePaths = [];

    async.eachSeries(
      files,
      function (fileName, eachCallback) {
        let filePath = path.join(dirPath, fileName);

        fs.stat(filePath, function (err, stat) {
          if (err) return eachCallback(err);

          if (stat.isDirectory()) {
            getPathsOfFilesAndDirs(filePath, function (err, subDirFiles) {
              if (err) return eachCallback(err);
              outputDictOfFilesAndDirs['dirs'].push(filePath);
              filePaths = filePaths.concat(subDirFiles);
              eachCallback(null);
            });
          } else {
            if (stat.isFile()) {
              filePaths.push(filePath);
              outputDictOfFilesAndDirs['files'].push(filePath);
            }
            eachCallback(null);
          }
        });
      },
      function (err) {
        callback(err, filePaths);
      }
    );
  });
}

function reverseKeysOfDict(dict) {
  const keys = Object.keys(dict);
  let reversedDict = keys.map((key) => dict[key].reverse());
  return reversedDict;
}

function showFilesAndDirs(path) {
  getPathsOfFilesAndDirs(path, function (err) {
    reverseKeysOfDict(outputDictOfFilesAndDirs);
    console.log(err || outputDictOfFilesAndDirs);
  });
}

showFilesAndDirs(process.argv[2]);

module.exports = showFilesAndDirs;
