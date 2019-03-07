import path from 'path';

const entryModule = {
    entry: {
        source: path.join(__dirname, '../src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'js/[name].js',
        publicPath: '/',
    },
};

export default entryModule;
