module.exports = {
    //Server port
    'port': process.env.PORT || 3000,
    //Secret Key for JWT
    'secret': 'super secret key',
    //DB connection
    'database':'mongodb://admin:admin@ds147267.mlab.com:47267/noderest'
};