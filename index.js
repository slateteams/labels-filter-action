const core = require("@actions/core");

const labelFilter = require("./src/filter");

try {
    const labelsJsonStr = core.getInput("labels-json-str");
    const prefix = core.getInput("prefix");
    const stripPrefix = core.getInput("strip-prefix");

    const filteredLabelsJsonStr = labelFilter(labelsJsonStr, prefix, stripPrefix);

    core.setOutput("filtered-labels-json-str", filteredLabelsJsonStr);
    console.log('Filtered labels:', filteredLabelsJsonStr);
} catch (error) {
    core.setFailed(error.message);
}
