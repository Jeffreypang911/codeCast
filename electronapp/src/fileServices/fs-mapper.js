const fs = require('fs');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const path = require('path');
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');
const axios = require('../../api');

//Create promise.each function that takes array and resolver function
Promise.each = async function(arr, fn) {
  //collect resolved promises
  let resolved = [];
  //check for valid array
  if (!Array.isArray(arr)) return Promise.reject('Must pass an array to .each');
  //for each promise, resolve and push result
  for (let promiseObj of arr) await fn(promiseObj.promise)
  .then(async (result) => {
    await resolved.push({id: promiseObj.id, content: result});
  }).catch((err) => {
    throw err;
  });
  return await resolved;
  //return array for resolved promises
}

//function to resolve promises for Promise.each()
function resolver(promise) {
  return Promise.resolve(promise);
}

//makes filepath from __dirname relative
function makeRelative(fpath, root) {
  //split root and filepath to compare
  let pathArr = fpath.split('/');
  let rootArr = root.split('/');

  //compare path and root nodes
  let relative = pathArr.filter((node, i) => {
    return node !== rootArr[i];
  });
  //return relative path as string
  return relative.join('/');
}

//returns new promise with Buffer object for async file read
function readFile(target) {
  return new Promise((resolve, reject) => {
    fs.readFile(target, function(err, content) {
      if (err) reject(err);
      resolve(content);
    });
  });
}

//reads file and stores id and result in fileStore object as key: value pair
async function fileReader(root, fpath, target) {
  //concat fpath array and join to root to make absolute
  let filePath;

  Array.isArray(fpath) ? filePath = fpath.join('/') : filePath = fpath;

  let readTarget = path.join(root, filePath, target);

  //return new promise with decoded file
  return readFile(readTarget).then(async (result) => {
    return await decoder.write(result);
  }).catch((err) => {
    throw err;
  });
}

async function makeJSON(array, root, targetDir) {
  //generates JSON object representing directory structure from array
  let promises = [];
  let dirObj = {};
  let fileObj = {};
  let pathObj = {};

  for (let file of array) {
    //set variable for object traversal
    let current = dirObj;
    //split filepath and assign filename to variable
    let fpath = file.split('/');
    let targetFile = fpath.pop();
    //list of files and extensions to ignore
    const ignore = ['.ico', '.png', '.jpg', '.DS_Store', '.svg', 
      'node_modules', 'package-lock.json', '.git', '.scssc', '.psd', '.pdf',
      'directory.json', 'content.json', 'filepaths.json', '.gif', '.webp'];

    const check = new RegExp(ignore.join('|')).test(targetFile);

    //check for valid file extensions
    if (!check) {
      //check to see if files are in subdirectory
      if (fpath.length > 0) {
        //for each node assign child and move one level deeper
        fpath.forEach(async (node, i) => {
          current[node] ? current[node][fpath[i + i]] : current[node] = {};
          current = current[node];
          //if last node: 
          //1) assign file and hash, and 
          //2) read file and push returned promise to promises array
          if(i === fpath.length - 1) {
            let fileID = uuidv1();
            let staticID = uuidv4();
            await promises.push({ id: [fileID], promise: fileReader(root, fpath, targetFile) });
            current[staticID] = {fileNames: [targetFile], fileIDs: [fileID]};
            pathObj[staticID] = fpath.join('/');
          }
        });
      //if child of root dir append to root object and do same as above
      } else {
        let fileID = uuidv1();
        let staticID = uuidv4();
        await promises.push({ id: [fileID], promise: fileReader(root, fpath, targetFile) });
        current[staticID] = {fileNames: [targetFile], fileIDs: [fileID]};
        pathObj[staticID] = fpath.join('/');
        
      }
    }
  }
  //resolve all promises in array 

  Promise.each(await promises, resolver).then((resolved) => {
    resolved.forEach((res, i) => {
      fileObj[res.id] = res.content;
    });

    // TEMPORARY POST REQUEST INSIDE MAPPER
    axios({
      method: 'post',
      url: `/api/electron`,
      data: {
        streamID: null,
        directory: dirObj,
        content: fileObj,
        paths: pathObj
      },
      maxContentLength: Infinity
    })
    .then(() => console.log('Post success to /api/electron in fs mapper'))
    // TODO error handle without infinite axios loop
    .catch((err) => {
      console.error('Post failure', err)
    })
  })
  //  END OF TEMPORARY CHANGE

  //iterate through resolved promises and assign id hashes to file contents
  //write directory and content objects to file
  // fs.writeFile(`${targetDir}/content.json`, JSON.stringify(fileObj), (err) => {
  //   if (err) throw err;
  // });
  // fs.writeFile(`${targetDir}/directory.json`, JSON.stringify(dirObj), (err) => {
  //   if (err) throw err;
  // });
  // fs.writeFile(`${targetDir}/filepaths.json`, JSON.stringify(pathObj), (err) => {
  //   if (err) throw err;
  // });
}

//when readDir is complete, call function to build directory and file content objects
function done(targetDir) {
  return (err, res, root) => {
    if (err) throw err;

    makeJSON(res, root, targetDir);

  }
}

//takes directory path and callback
function readDir(dir, done, root = dir) {
  // collects results
  let results = [];
  // reads directory passed to readDir()
  fs.readdir(dir, function(err, items) {
    //returns error if err
    if (err) return done(err);
    //init index counter for current dir
    let i = 0;
    //magical recursive IIFE
    (function next() {
      let item = items[i++];
      //return when dir is walked
      if (!item) return done(null, results, root);
      //add to filepath
      item = path.join(dir, item);
      //stat returns quantifiable properties of item, used here to parse files vs. dirs
      fs.stat(item, (err, stat) => {
        if (stat && stat.isDirectory()) {
          if (item && !item.includes('node_modules') && !item.includes('.git')) {
            //if dir call self recursively for each subdir
            return readDir(item, function(err, res) {
              results = [...results, ...res];
              return next();
            }, root);
          }
        } else {
          //if files push to results
          results.push(makeRelative(item, root));
        }
        return next();
      });
    })();
  });
};

module.exports = {
  readDir,
  done
}