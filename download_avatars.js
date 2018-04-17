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

  request(options, function(err, res, body) {
    // cb(err, body);
    cb(err, JSON.parse(body));
    // JSON.parse(body).forEach(function(contributor) {
    //   console.log(contributor.avatar_url);
    // })
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream('./avatars/' + filePath + '.png'));
}


getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
  result.forEach(function(contributor) {
    downloadImageByURL(contributor.avatar_url, contributor.login);
  });
});