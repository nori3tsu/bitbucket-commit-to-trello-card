'use strict';
const request = require("request-promise");
const outdent = require('outdent');

async function handle(event) {
  const body = JSON.parse(event.body);

  await Promise.all(body.push.changes.map(async (changeEvent) => {
    await Promise.all(changeEvent.commits.map(async (commit) => {
      const matched = commit.message.match(/tr\[(\w+)\]/);
      if (!matched) {
        console.log(`not matched: ${commit.message}`)
        return;
      }

      const id = matched[1];
      const text = outdent `
      * commit: [${commit.hash}](${commit.links.html.href})
      * Author: ${commit.author.raw}
      * Date:   ${commit.date}

      \`\`\`
      ${commit.message}
      \`\`\`
      `
      return await pushMessageToTrello(id, text);
    }));
  }))
}

async function pushMessageToTrello(id, text) {
  const key = process.env.TRELLO_KEY;
  const token = process.env.TRELLO_TOKEN;

  var options = { method: 'POST',
  url: `https://api.trello.com/1/cards/${id}/actions/comments`,
  qs: { text: text, key: key, token: token } };

  return await request(options)
}

module.exports.webhook = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({}),
  };

  handle(event).then(() => {
    console.log("success!!")
  }).catch((err) => {
    console.log("failure...")
    console.log(err)
  }).then(() => {
    callback(null, response);
  })
};
