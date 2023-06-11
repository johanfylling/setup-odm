# Setup OPA Dependency Manager (ODM) GitHub Action

GitHub action to configure [ODM](https://github.com/johanfylling/opa-dependency-manager) in your GitHub Actions workflow.

## Basic Usage

Here we see a simple template that checks out the repository code, installs the latest ODM, runs all Rego tests, and then builds a bundle.

```yml
name: Test and build
on: [push]
jobs:
  Run-OPA-Tests:
    runs-on: ubuntu-latest
    steps:
    - name: Check out repository code
      uses: actions/checkout@v3

    - name: Setup ODM
      uses: johanfylling/setup-odm@v1
      with:
        version: latest

    - name: Run Tests
      run: odm test -v

    - name: Build Bundle
      run: odm build -v
```
