var chai_1 = require('chai');
var path_1 = require('path');
var tsconfig = require('./tsconfig');
describe('tsconfig', function () {
    var tests = [
        {
            path: path_1.join(__dirname, '../..'),
            error: 'Unable to resolve config file'
        },
        {
            path: path_1.join(__dirname, '../tests/invalidfile'),
            error: "Unexpected token 's' at 1:1 in " + path_1.join(__dirname, '../tests/invalidfile/tsconfig.json') + "\nsome random string\n^"
        },
        {
            path: path_1.join(__dirname, '../tests/empty'),
            result: {
                compilerOptions: {},
                files: [
                    path_1.join(__dirname, '../tests/empty/cwd.ts'),
                    path_1.join(__dirname, '../tests/empty/foo/bar.ts')
                ]
            }
        },
        {
            path: path_1.join(__dirname, '../tests/valid'),
            result: {
                compilerOptions: {
                    module: 'commonjs',
                    noImplicitAny: true,
                    out: '../../built/local/tsc.js',
                    removeComments: true,
                    sourceMap: true,
                    preserveConstEnums: true
                },
                files: [
                    path_1.join(__dirname, '../tests/valid/src/foo.ts')
                ]
            },
            filename: path_1.join(__dirname, '../tests/valid/tsconfig.json')
        },
        {
            path: path_1.join(__dirname, '../tests/bom'),
            result: {
                compilerOptions: {
                    module: 'commonjs',
                    noImplicitAny: true,
                    outDir: 'dist',
                    removeComments: true,
                    sourceMap: true,
                    preserveConstEnums: true
                },
                files: [
                    path_1.join(__dirname, '../tests/bom/src/bom.ts')
                ]
            },
            filename: path_1.join(__dirname, '../tests/bom/tsconfig.json')
        },
        {
            path: path_1.join(__dirname, '../tests/exclude'),
            result: {
                compilerOptions: {
                    module: 'commonjs',
                    out: '../../built/local/tsc.js'
                },
                files: [
                    path_1.join(__dirname, '../tests/exclude/included/foo.ts')
                ],
                exclude: [
                    path_1.join(__dirname, '../tests/exclude/excluded'),
                    path_1.join(__dirname, '../tests/exclude/cwd.ts')
                ]
            },
            filename: path_1.join(__dirname, '../tests/exclude/tsconfig.json')
        },
        {
            path: path_1.join(__dirname, '../tests/cwd'),
            result: {
                compilerOptions: {
                    module: 'commonjs',
                    noImplicitAny: true,
                    outDir: 'dist',
                    removeComments: true,
                    sourceMap: true,
                    preserveConstEnums: true
                },
                files: [
                    path_1.join(__dirname, '../tests/cwd/foo.d.ts'),
                    path_1.join(__dirname, '../tests/cwd/foo.ts'),
                    path_1.join(__dirname, '../tests/cwd/foo.tsx')
                ]
            },
            filename: path_1.join(__dirname, '../tests/cwd/tsconfig.json')
        },
        {
            path: path_1.join(__dirname, '../tests/glob'),
            result: {
                compilerOptions: {},
                files: [
                    path_1.join(__dirname, '../tests/glob/src/foo.ts')
                ],
                filesGlob: ['src/**/*.ts']
            },
            filename: path_1.join(__dirname, '../tests/glob/tsconfig.json')
        },
        {
            path: path_1.join(__dirname, '../tests/glob-negation'),
            result: {
                compilerOptions: {},
                files: [
                    path_1.join(__dirname, '../tests/glob-negation/src/foo.ts')
                ],
                filesGlob: ['!test/**/*']
            },
            filename: path_1.join(__dirname, '../tests/glob-negation/tsconfig.json')
        },
        {
            path: path_1.join(__dirname, '../tests/glob-multi'),
            options: {
                compilerOptions: {
                    target: 'es6'
                }
            },
            result: {
                compilerOptions: {
                    target: 'es6'
                },
                files: [
                    path_1.join(__dirname, '../tests/glob-multi/a/foo.ts'),
                    path_1.join(__dirname, '../tests/glob-multi/b/foo.ts')
                ],
                filesGlob: ['a/**/*.ts', 'b/**/*.ts']
            },
            filename: path_1.join(__dirname, '../tests/glob-multi/tsconfig.json')
        },
        {
            path: path_1.join(__dirname, '../tests/glob-positive-negative'),
            options: {
                resolvePaths: false
            },
            result: {
                compilerOptions: {
                    declaration: false,
                    module: 'commonjs',
                    noImplicitAny: false,
                    removeComments: true,
                    target: 'es5'
                },
                exclude: [],
                files: [
                    'foo/bar.ts'
                ],
                filesGlob: ['!foo/**/*.ts', 'foo/bar.ts']
            },
            filename: path_1.join(__dirname, '../tests/glob-positive-negative/tsconfig.json')
        },
        {
            path: path_1.join(__dirname, '../tests/mixed'),
            options: {
                filterDefinitions: true,
                resolvePaths: false
            },
            result: {
                compilerOptions: {},
                files: [
                    'bar.d.ts'
                ]
            },
            filename: path_1.join(__dirname, '../tests/mixed/tsconfig.json')
        }
    ];
    describe('sync', function () {
        tests.forEach(function (test) {
            describe(test.path, function () {
                it('should try to find config', function () {
                    var result;
                    try {
                        result = tsconfig.loadSync(test.path, test.options);
                    }
                    catch (err) {
                        chai_1.expect(err.message).to.equal(test.error);
                        return;
                    }
                    chai_1.expect(result).to.deep.equal(test.result);
                });
                if (test.filename) {
                    it('should resolve filename', function () {
                        chai_1.expect(tsconfig.resolveSync(test.path)).to.equal(test.filename);
                    });
                }
            });
        });
    });
    describe('async', function () {
        tests.forEach(function (test) {
            describe(test.path, function () {
                it('should try to find config', function () {
                    return tsconfig.load(test.path, test.options)
                        .then(function (config) { return chai_1.expect(config).to.deep.equal(test.result); }, function (error) { return chai_1.expect(error.message).to.equal(test.error); });
                });
                if (test.filename) {
                    it('should resolve filename', function () {
                        return tsconfig.resolve(test.path)
                            .then(function (filename) { return chai_1.expect(filename).to.equal(test.filename); });
                    });
                }
            });
        });
    });
});
//# sourceMappingURL=tsconfig.spec.js.map