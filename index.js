const core = require("@actions/core");
const github = require("@actions/github");

const labelFilter = require("./src/filter");

try {
    const labelsJsonStr = core.getInput("labels-json-str");
    const prefix = core.getInput("prefix");
    const stripPrefix = core.getInput("strip-prefix");

    const filteredLabelsJsonStr = labelFilter(labelsJsonStr, prefix, stripPrefix);

    core.setOutput("filtered-labels-json-str", filteredLabelsJsonStr);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
