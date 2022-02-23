# PR / Issue Label Filter

This action allows to filter the PR / Issue labels JSON string to retain only a subset of labels. This comes in handy when using labels to define target environments for deployment.

For instance, if the PR has the following labels:
- `bug`
- `env:dev1`
- `env:prod`

using the action like so:
```yaml
- uses: slateteams/labels-filter-action@v1
  with:
    labels-json-str: ${{ toJSON(github.event.pull_request.labels.*.name) }}
    prefix: 'env:dev'
    strip-prefix: 'env:'
```

would output `["dev1"]` as a result.


# Usage

```yaml
verify-envs:
  runs-on: ubuntu-latest
  outputs:
    # 'filtered-labels-json-str' outputs the filtered labels in JSON string format
    environments-json-str: ${{ steps.filter.outputs.filtered-labels-json-str }}
  steps:
    - uses: slateteams/labels-filter-action@v1
      with:
        # PR / Issue labels as JSON string
        # Default: []
        labels-json-str: ${{ toJSON(github.event.pull_request.labels.*.name) }}

        # Prefix that the label should contain to be retained
        # Default: ''
        prefix: 'env:dev'

        # Prefix to strip from the retained labels
        # Default: ''
        strip-prefix: 'env:'

deploy:
  runs-on: ubuntu-latest
  strategy:
    matrix:
      # Using the output of label-filter action in matrix build
      env: ${{ needs.verify-envs.outputs.environments-json-str }}
  env:
    ENV_SLUG: ${{ matrix.env }}
  steps:
    - ...
```


# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
