var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');
// secrets.GITHUB_TOKEN


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
    JSON.parse(body).forEach(function(contributor) {
      console.log(contributor.avatar_url);
    })
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream(filePath));
}
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});