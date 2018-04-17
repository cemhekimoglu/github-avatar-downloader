var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
  url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers: {
    'Authorization': 'token ' + secrets.GITHUB_TOKEN,
    'User-Agent': 'request'
  }
};

  if(repoOwner && repoName) {
    request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
  } else {
    console.log('please specify repoOwner and repoName')
  }
}

function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream('./avatars/' + filePath + '.png'));
}


getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(contributor) {
    downloadImageByURL(contributor.avatar_url, contributor.login);
  });
});