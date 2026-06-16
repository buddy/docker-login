# Buddy Docker Login

GitHub Action for logging in to the [Buddy](https://buddy.works) Docker registry using the BDY CLI.

## Features

- Authenticate with Buddy's Docker registry
- Works with `buddy/login` environment variables or direct inputs
- Supports on-premises Buddy installations via custom API endpoint

## Usage

### Basic (with `buddy/login`)

```yaml
steps:
  - uses: buddy/login@v1
    with:
      token: ${{ secrets.BUDDY_TOKEN }}
      region: US
  - uses: buddy/docker-login@v1
```

### Direct (without `buddy/login`)

```yaml
steps:
  - uses: buddy/docker-login@v1
    with:
      token: ${{ secrets.BUDDY_TOKEN }}
      region: us
```

### On-premises

```yaml
steps:
  - uses: buddy/docker-login@v1
    with:
      token: ${{ secrets.BUDDY_TOKEN }}
      api_url: https://buddy.example.com/api
```

By default, this action automatically installs the latest BDY CLI from the production channel. If you need a specific version or channel, use [`buddy/setup`](https://github.com/buddy/setup) before this action.

## Inputs

| Input     | Description                                                        | Required | Default                      |
| --------- | ------------------------------------------------------------------ | -------- | ---------------------------- |
| `token`   | Buddy personal access token                                        | No       | `BUDDY_TOKEN` env var        |
| `region`  | Buddy region (`us`, `eu`, `as`)                                    | No       | `BUDDY_REGION` env var       |
| `api_url` | Buddy API endpoint for on-premises installations                   | No       | `BUDDY_API_ENDPOINT` env var |
| `debug`   | Run the BDY CLI in DEBUG mode and dump `~/.bdy/cli.log` on failure | No       | `false`                      |

## Environment Variables

When using [`buddy/login`](https://github.com/buddy/login), the following environment variables are automatically set and used as defaults:

- `BUDDY_TOKEN` - Buddy personal access token
- `BUDDY_REGION` - Buddy region
- `BUDDY_API_ENDPOINT` - Buddy API endpoint (on-premises only)

## Example Workflow

```yaml
name: Build and Push

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: buddy/login@v1
        with:
          token: ${{ secrets.BUDDY_TOKEN }}
          region: US

      - uses: buddy/docker-login@v1

      - run: docker build -t container.registry.sh/my-workspace/my-app:latest .
      - run: docker push container.registry.sh/my-workspace/my-app:latest
```

## Debugging

If a BDY CLI command fails, the action throws an error that includes the exit code, the command that was run, and its captured output.

Enabling debug runs the BDY CLI in DEBUG mode, so it writes verbose logs to `~/.bdy/cli.log`, and on failure dumps that log (plus a stack trace) into the workflow output. Enable it in either of these ways:

- **Per step** — set the `debug` input on this action:

  ```yaml
  - uses: buddy/docker-login@v1
    with:
      debug: true
  ```

- **Whole run** — enable [GitHub step debug logging](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging), either by ticking **Enable debug logging** in the "Re-run jobs" dialog or by setting the `ACTIONS_STEP_DEBUG` repository secret/variable to `true`.

## License

[MIT](LICENSE.md)
