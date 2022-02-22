const labelFilter = (labelsJsonStr, prefixStr, stripPrefixStr) => {
    const labels = JSON.parse(labelsJsonStr);
    if (!Array.isArray(labels)) {
        throw new Error("labelsJsonStr expected to contain an array!");
    }
    const stripPrefix = stripPrefixStr !== "false" && stripPrefixStr !== "";

    const filtered = labels
        .filter((label) => label.startsWith(prefixStr))
        .map((label) => {
            return stripPrefix ? label.replace(prefixStr, "") : label;
        });
    return JSON.stringify(filtered);
};

module.exports = labelFilter;
