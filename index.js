const core = require('@actions/core');
const http = require('@actions/http-client');

async function run() {
  try {
    const url = core.getInput('url');
    const topic = core.getInput('topic');
    const message = core.getInput('message');

    const client = new http.HttpClient();

    await client.post(url, {
      topic,
      message
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
