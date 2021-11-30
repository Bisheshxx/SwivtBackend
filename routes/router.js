const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get('/data', function (req, res) {
  const url = "https://api.github.com/search/repositories?q=stars"
  axios.get(url)
    .then(function (response) {
      const data = JSON.parse(JSON.stringify(response.data));
      let filter = [];
      for (var i of data.items) {
        let dataObj = {};
        dataObj["id"] = i.id;
        dataObj["repository_name"] = i.name;
        dataObj["author"] = i.owner.login;
        dataObj["author_url"] = i.owner.url;
        dataObj["issues"] = i.open_issues;
        dataObj["no_of_star"] = i.watchers_count;
        dataObj["watcher"] = i.watchers_count;
        dataObj["forks"] = i.forks;
        dataObj["desc"] = i.description;
        dataObj["repo_url"] = i.html_url;
        dataObj["default_branch"] = i.default_branch;
        dataObj["last_update"] = i.updated_at;
        filter.push(dataObj);
      }
      console.log(data);
      return res.status(200).json({ success: true, 'data': filter });
    })
    .catch(function (e) {
      return res.status(500).json({ success: false, message: err });
    })
})

module.exports = router