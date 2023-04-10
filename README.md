# Zoom Webhook sample

Use of this sample app is subject to our [Terms of Use](https://explore.zoom.us/en/legal/zoom-api-license-and-tou/).

---

**NOTE:** This Sample App has been updated to use the [Webhook Secret Token](https://developers.zoom.us/docs/api/rest/webhook-reference/#verify-webhook-events) instead of the [Webhook Verification Token](https://developers.zoom.us/docs/api/rest/webhook-reference/#verify-webhook-events) to validate requests are sent from Zoom.

---

This is a Node.js / Express server that receives [Zoom Platform Webhooks](https://developers.zoom.us/docs/api/rest/webhook-reference/#enable-webhooks) and [Zoom Video SDK Webhooks](https://developers.zoom.us/docs/api/rest/webhook-reference/#enable-webhooks).

If you would like to skip these steps and just deploy the finished code to Heroku, click the Deploy to Heroku button. (You will still need to configure a few simple things, so skip to [Deployment](#deployment).)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/zoom/webhook-sample)

## Installation

In terminal, run the following command to clone the repo:

`$ git clone https://github.com/zoom/webhook-sample.git`

## Setup

1. In terminal, cd into the cloned repo:

   `$ cd webhook-sample`

1. Then install the dependencies:

   `$ npm install`

1. Create an environment file to store your Webhook Secret Token:

   `$ touch .env`

1. Add the following code to the .env file, and insert your [Zoom Webhook Secret Token](https://developers.zoom.us/docs/api/rest/webhook-reference/#verify-webhook-events):

   ```
   ZOOM_WEBHOOK_SECRET_TOKEN=ZOOM_WEBHOOK_SECRET_TOKEN_HERE
   ```

   ![Zoom Webhook Secret Token](https://developers.zoom.us/img/nextImageExportOptimizer/webhook-secret-token-opt-640.WEBP "Zoom Webhook Secret Token")

   > The Webhook Secret Token allows you to [verify webhook requests come from Zoom](https://developers.zoom.us/docs/api/rest/webhook-reference/#verify-webhook-events) and for Zoom to [validate that you control your webhook endpoint](https://developers.zoom.us/docs/api/rest/webhook-reference/#validate-your-webhook-endpoint).

1. Save and close .env.

1. Start the server:

   `$ npm run start`

1. We need to expose the local server to the internet to accept post requests, we will use [Ngrok](https://ngrok.com) (free) for this.

   Once installed, open a new terminal tab and run:

   `$ ngrok http 4000`

   > NOTE: [I've put ngrok in my PATH so I can call it globally.](https://stackoverflow.com/a/36759493/6592510)

1. Copy the ngrok https url and paste it in the Bot endpoint URL input on your Zoom App's Features section. Remember to include `/webhook` path.

   Example: `https://abc123.ngrok.io/webhook`

1. Click "Validate".

   ![Zoom Webhook Configuration](https://developers.zoom.us/img/nextImageExportOptimizer/webhook-validate-opt-640.WEBP "Zoom Webhook Configuration")

1. Choose the events you'd like to subscribe to.

1. Click "Save".

   ![Zoom Webhooks Configured](https://developers.zoom.us/img/nextImageExportOptimizer/webhook-validate-success-opt-640.WEBP "Zoom Webhooks Configured")

## Usage

1. Trigger the respective Webhook.

   For example, if you chose the [Start Meeting Webhook](https://developers.zoom.us/docs/api/rest/reference/zoom-api/events/#operation/meeting.started), start a Zoom Meeting. You will see the Webhook headers and payload logged in terminal.

   ```json
   {
     "host": "abc123.ngrok.io",
     "user-agent": "Zoom Marketplace/1.0a",
     "content-length": "335",
     "authorization": "{LEGACY_WEBHOOK_VERIFICATION_TOKEN}",
     "clientid": "{CLIENT_ID}",
     "content-type": "application/json; charset=utf-8",
     "x-forwarded-for": "{X_FORWARDED_FOR}",
     "x-forwarded-proto": "https",
     "x-zm-request-timestamp": "X_ZM_REQUEST_TIMESTAMP",
     "x-zm-signature": "v0={HASHED_WEBHOOK_SECRET_TOKEN}",
     "x-zm-trackingid": "{X_ZM_TRACKINGID}",
     "accept-encoding": "gzip"
   }
   ```

   ```json
   {
     "event": "meeting.started",
     "payload": {
       "account_id": "{ACCOUNT_ID}",
       "object": {
         "duration": 0,
         "start_time": "2021-11-02T20:43:19Z",
         "timezone": "America/Denver",
         "topic": "{TOPIC}",
         "id": "{MEETING_ID}",
         "type": 4,
         "uuid": "{MEETING_UUID}",
         "host_id": "{HOST_ID}"
       }
     },
     "event_ts": 1635885799302
   }
   ```

## Deployment

### Heroku (button)

1. After clicking the "Deploy to Heroku" button, enter a name for your app (or leave it blank to have a name generated for you), and insert your [Zoom Webhook Secret Token](https://developers.zoom.us/docs/api/rest/webhook-reference/#verify-webhook-events):

   - `ZOOM_WEBHOOK_SECRET_TOKEN` (Your Zoom Webhook Secret Token, found on your App's Features page)

1. Then click "Deploy App".

1. Copy the Heroku url and paste it in the Event notification endpoint URL input on your Zoom App's Features section. Remember to include `/webhook` path.

   Example: `https://abc123.herokuapp.com/webhook`

### Heroku (CLI)

1. If you cloned this repo, you may use the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) to deploy your server. Remember to [set your config vars (envoirnment variables)](https://devcenter.heroku.com/articles/config-vars).

1. Copy the Heroku url and paste it in the Event notification endpoint URL input on your Zoom App's Features section. Remember to include `/webhook` path.

   Example: `https://abc123.herokuapp.com/webhook`

### Other Server Hosting

1. For Other Server Hosting information, see [this tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment#choosing_a_hosting_provider).

1. Copy the deployed url and paste it in the Event notification endpoint URL input on your Zoom App's Features section. Remember to include `/webhook` path.

   Example: `https://abc123.compute-1.amazonaws.com/webhook`

Now you are ready to [receive Zoom webhooks](#usage).

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us)   or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://explore.zoom.us/docs/en-us/developer-support-plans.html) plans.
