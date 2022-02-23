const filter = require('./filter');

test('should not error out if prefix is undefined', () => {
    expect(filter('[]', undefined, ''));
});

test('should not error out if stripPrefix is undefined', () => {
    expect(filter('[]', '', undefined));
});

test("should throw error if labels can't be parsed", () => {
    expect(() => filter('xyz', '', '')).toThrow();
    expect(() => filter(undefined, '', '')).toThrow();
});

test('should throw error if labels is not an array', () => {
    expect(() => filter('{}', '', '')).toThrow();
});

test('should return same labels if no prefix', () => {
    expect(filter('[]', '', '')).toBe('[]');
    expect(filter('[]', undefined, undefined)).toBe('[]');
    expect(filter('["test", "env:dev"]', '', '')).toBe('["test","env:dev"]');
});

test('should filter labels with supplied prefix', () => {
    expect(filter('["test", "test2", "env:dev", "env:staging"]', 'env:', '')).toBe('["env:dev","env:staging"]');
});

test('should not strip prefix if no stripPrefix provided', () => {
    expect(filter('["test", "env:dev"]', 'env:', '')).toBe('["env:dev"]');
    expect(filter('["test", "env:dev"]', 'env:', undefined)).toBe('["env:dev"]');
});

test('should strip prefix if stripPrefix is provided', () => {
    expect(filter('["test", "env:dev", "env:prod"]', 'env:dev', 'env:')).toBe('["dev"]');
    expect(filter('["test", "env:dev", "env:prod"]', 'env:', 'env:')).toBe('["dev","prod"]');
    expect(filter('["test", "env:dev", "env:prod"]', 'env:', 'something-else')).toBe('["env:dev","env:prod"]');
});
