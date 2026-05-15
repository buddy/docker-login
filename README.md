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

| Input     | Description                                      | Required | Default                      |
| --------- | ------------------------------------------------ | -------- | ---------------------------- |
| `token`   | Buddy personal access token                      | No       | `BUDDY_TOKEN` env var        |
| `region`  | Buddy region (`us`, `eu`, `as`)                  | No       | `BUDDY_REGION` env var       |
| `api_url` | Buddy API endpoint for on-premises installations | No       | `BUDDY_API_ENDPOINT` env var |

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

## License

[MIT](LICENSE.md)
