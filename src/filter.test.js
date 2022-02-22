const filter = require("./filter");

test("should return same labels if no prefix", () => {
    expect(filter("[]", '', 'false')).toBe("[]");
    expect(filter('["test", "env:dev"]', "", "false")).toBe('["test","env:dev"]');
});

test("should throw error if labels can't be parsed", () => {
    expect(() => filter("xyz", "", "false")).toThrow();
});

test("should throw error if labels is not an array", () => {
    expect(() => filter("{}", "", "false")).toThrow();
});

test("should filter labels with supplied prefix", () => {
    expect(filter('["test", "test2", "env:dev", "env:staging"]', "env:", "false")).toBe('["env:dev","env:staging"]');
});

test("should not strip prefix if stripPrefix is '' or 'false'", () => {
    expect(filter('["test", "env:dev"]', "env:", "")).toBe('["env:dev"]');
    expect(filter('["test", "env:dev"]', "env:", "false")).toBe('["env:dev"]');
});

test("should strip prefix if stripPrefix is not '' or 'false'", () => {
    expect(filter('["test", "env:dev"]', "env:", "true")).toBe('["dev"]');
    expect(filter('["test", "env:dev"]', "env:", "0")).toBe('["dev"]');
    expect(filter('["test", "env:dev"]', "env:", "1")).toBe('["dev"]');
});
