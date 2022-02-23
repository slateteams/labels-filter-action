const labelFilter = (labelsJsonStr, prefixStr, stripPrefixStr) => {
    const labels = JSON.parse(labelsJsonStr);
    if (!Array.isArray(labels)) {
        throw new Error('labelsJsonStr expected to contain an array!');
    }

    const filtered = labels
        .filter((label) => label.startsWith(prefixStr))
        .map((label) => {
            return !!stripPrefixStr ? label.replace(stripPrefixStr, '') : label;
        });
    return JSON.stringify(filtered);
};

module.exports = labelFilter;
