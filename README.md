# Bitbucket Commit To Trello Cards

This repository is to link Bitbucket's commit and Trello 's card using API.

You can do the same with zapier, but it takes time to reflect from commit to card. By using this repository mechanism, it can be reflected almost in real time.

## Getting Started

### Trello Settings

Generate a Trello's key and token for Bitbucket.

1. Generate a key.
    * [https://trello.com/app-key](https://trello.com/app-key)
2. Generate a token. (replace {GENERATED KEY}.)
    * [https://trello.com/1/authorize?key={GENERATED_KEY}&name=&expiration=never&response_type=token&scope=read,write](https://trello.com/1/authorize?key={GENERATED_KEY}&name=&expiration=never&response_type=token&scope=read,write)

### Installing

Replace Trello's key and token on serverless.yml.

```
functions:
  webhook:
    handler: handler.webhook
    environment:
      TRELLO_KEY: {GENERATED KEY}     <- replace it.
      TRELLO_TOKEN: {GENERATED TOKEN} <- replace it.
```

Install the stack and memory ServiceEndpoint.

```
$ npm install
$ serverless deploy -v
~
ServiceEndpoint: https://xxx.execute-api.us-east-1.amazonaws.com/dev
~
```

## Bitbucket Settings

1. Open your Bitbucket's repository > Settings > Webhooks.
2. Tap Add webhook, ServiceEndpoint/webhook generated previously enters a URL field and save.
    * example: `https://xxx.execute-api.us-east-1.amazonaws.com/dev/webhook`
    
## Testing

You can confirm a Trello's card id from url.

For example: `https://trello.com/c/{Card ID}/xxx`.

Finally, commit and push your repository with template of `tr[Trello's Card ID] messages`, so  will be reflected your commit to your card.

For example:

```
tr[xxxxxxxx] test commit.
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
