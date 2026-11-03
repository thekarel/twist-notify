import * as core from '@actions/core';

async function run() {
  try {
    const url = core.getInput('url');
    console.log("url.length", url.length);
    const topic = core.getInput('topic');
    const message = core.getInput('message');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: topic,
        content: message
      })
    });

    console.log(`Response status: ${response.status}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
