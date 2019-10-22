const verify = require('./lib/verify');
const {parse} = require('url');
const increment = require('./lib/increment-views');

module.exports = async (req, res) => {
    const orig = req.headers.origin;
    if (/https:\/\/(.*\.)?venkat\.sh/.test(orig)) {
        res.setHeader('Access-Control-Allow-Origin', orig);
        res.setHeader('Access-Control-Allow-Methods', 'GET');
    }

    // ensure no duplicate views
    verify(req);
    const {
        query: {id}
    } = parse(req.url, true);

    if (!id) {
        const err = new Error('Missing `id` parameter');
        err.statusCode = 400;
        throw err;
    }

    const {snapshot} = await increment(id);
    return {total: snapshot.val()};
};
