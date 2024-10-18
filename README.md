<p align="center">
  <a href="https://github.com/evg4b/goreleaser-npm-publisher" title="goreleaser-npm-publisher">
    <img alt="goreleaser-npm-publisher logo" width="30%" src="https://raw.githubusercontent.com/evg4b/goreleaser-npm-publisher/main/.github/logo.svg">
  </a>
</p>

<div align="center">
  <h1>goreleaser-npm-publisher-action</h1>
</div>

<p align="center">
  <a href="https://github.com/super-linter/super-linter" title="NPM Version">
    <img alt="GitHub Super-Linter" src="https://img.shields.io/github/actions/workflow/status/evg4b/goreleaser-npm-publisher-action/linter.yml?logo=github&label=Lint%20Codebase">
  </a>
  <a href="https://github.com/evg4b/goreleaser-npm-publisher-action/actions/workflows/ci.yml" title="CI">
    <img alt="CI" src="https://img.shields.io/github/actions/workflow/status/evg4b/goreleaser-npm-publisher-action/ci.yml?logo=github&label=Continuous%20Integration">
  </a>
  <a href="#" title="Coverage">
    <img alt="Coverage" src="./badges/coverage.svg">
  </a>
  <br>
  <a href="https://github.com/evg4b/goreleaser-npm-publisher-action/actions/workflows/codeql-analysis.yml" title="CodeQL">
    <img alt="CI" src="https://img.shields.io/github/actions/workflow/status/evg4b/goreleaser-npm-publisher-action/codeql-analysis.yml?logo=github&label=CodeQL">
  </a>
  <a href="https://github.com/evg4b/goreleaser-npm-publisher-action/actions/workflows/check-dist.yml" title="Check dist">
    <img alt="CI" src="https://img.shields.io/github/actions/workflow/status/evg4b/goreleaser-npm-publisher-action/check-dist.yml?logo=github&label=Check%20Transpiled%20JavaScript">
  </a>
</p>

<p align="center">
  Github Action for <a href="https://github.com/evg4b/goreleaser-npm-publisher">goreleaser-npm-publisher</a>.
  <br>
  Automated tool for building and publishing NPM packages from Go binaries.
</p>

## Usage

To publish your binaries to the registry, just run
`goreleaser-npm-publisher-action` after `goreleaser` action.

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4

  - name: Run GoReleaser
    uses: goreleaser/goreleaser-action@v6
    with:
      distribution: goreleaser
      version: '~> v2'
      args: release --clean
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  - name: Build and publish NPM packages
    uses: evg4b/goreleaser-npm-publisher-action@v1.0.0
    with:
      token: ${{ secrets.NPM_AUTH_TOKEN }}
```

Also, you can customize the packages with next options:

| Option          | Type     | Description                                                                           |
| --------------- | -------- | ------------------------------------------------------------------------------------- |
| **project**     | string   | Path to the root of go package                                                        |
| **builder**     | string   | The name of the builder whose output should be used for building packages             |
| **clear**       | boolean  | Clean `dist/npm` folder before build                                                  |
| **prefix**      | string   | NPM package scope prefix                                                              |
| **description** | string   | NPM package description                                                               |
| **files**       | string[] | Files witch should be included to the NPM package (`README.md`, `license` by default) |
| **token**       | string   | The NPM auth token                                                                    |

> [!NOTE]
>
> You can read more about the internal processes of package building and the
> internal structure of platform-specific packages on the
> [goreleaser-npm-publisher](https://github.com/evg4b/goreleaser-npm-publisher)
> tool page.

## Authorization

`goreleaser-npm-publisher` recommends using auth_token for authorization by
simply passing it in the corresponding parameter. If you need a different type
of authorization, you can run npm login before starting the action, which will
also work

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4

  - name: Run GoReleaser
    uses: goreleaser/goreleaser-action@v6
    with:
      distribution: goreleaser
      version: '~> v2'
      args: release --clean
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  - name: Login to the NPM
    # Log into the registry however you like.
    run: npm login ...

  - name: Build and publish NPM packages
    uses: evg4b/goreleaser-npm-publisher-action@v1.0.0
```
