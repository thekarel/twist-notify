const core = require('@actions/core');
const axios = require('axios')

async function run() {
  try {
    const url = core.getInput('url');
    console.log("url.length", url.length);
    const topic = core.getInput('topic');
    const message = core.getInput('message');

    const response = await axios.post(url, {
      title: topic,
      content: message
    });

    console.log(`Response status: ${response.status}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
