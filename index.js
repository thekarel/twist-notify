const core = require('@actions/core');
const http = require('@actions/http-client');

async function run() {
  try {
    const client = new http.HttpClient('thekarel/twist-notify');

    const url = core.getInput('url');
    console.log("url.length", url.length);
    const topic = core.getInput('topic');
    const message = core.getInput('message');


    const payload = JSON.stringify({ topic, message })
    const additional = { headers: { 'Content-Type': 'application/json' } }

    await client.post(url, payload, additional);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
