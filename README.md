# Twist Notify

> Send updates from your workflows to a Twist channel

# Setup

Twist allows you to quickly set up inbound webhooks for posting messages.

To get a `TWIST_URL` go to https://twist.com/app_console/ and create
an app with either Thread or Channel integration.

> _Thread integration_: post your message from GitHub to the same thread as a new
> message (probably what you want)
>
> _Channel integration_: creates a new thread with a new message each time
> (probably not what you want)

All you need to add is the "Integration name" and make note of the "Shareable
Install URL" (ignore the Webhooks and Bot sections).

Visit the install URL to pick which channel and thread you want to
target (create them beforehand).

Save and note the "Post content manually" URL from the integration - save it as
`TWIST_URL` in GitHub secrets.

Existing installations can be managed at https://twist.com/integrations/manage/

Twist dev documentation: https://developer.twist.com/v3/#integrations

## Targeting multiple threads

You need to install the app from above into each thread you want to target from
GitHub actions and save the URLs into separate secrets.

# Example

To try the action

- save the following file as `.github/workflows/try-twist-notify.yaml`
- create a repo secret `TWIST_URL` (see above)

Then you can run the workflow manually

```yaml
name: Send a test message
on:
  workflow_dispatch:
    inputs:
      topic:
        description: "The topic to create"
        required: false
        type: string
        default: "Test"
      message:
        description: "The markdown message to send"
        required: false
        type: string
        default: "Hello"
jobs:
  message:
    runs-on: ubuntu-latest
    steps:
      - name: Notify Twist
        uses: thekarel/twist-notify@main
        with:
          # topic is ignored when using a Thread integration
          topic: ${{ inputs.topic }}
          message: ${{ inputs.message }}
          url: ${{ secrets.TWIST_URL }}
```

# Markdown

You can post markdown messages:

```yaml
message: 👍 Deployed ${{ inputs.workload }} to ${{ inputs.stage }} [🔗](${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }})
```
