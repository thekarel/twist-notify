const core = require('@actions/core');
const http = require('@actions/http-client');

async function run() {
  try {
    const url = core.getInput('url');
    const topic = core.getInput('topic');
    const message = core.getInput('message');

    const client = new http.HttpClient();

    const response = await client.post(url, {
      topic,
      message
    });

    // Log response status
    console.log(```Response status: ${response.status}```);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
