const config = {
    dbServer: {
        host: 'db-8dke6.cdb.ntruss.com',
        port: 3306,
        user: 'mysql_dba',
        password: 'node1234!'
        //database: ''
    },
    tunnelConfig: {
        host: '106.10.56.88',
        port: 8000,
        username: 'root',
        password: 'SWcapstone1105'
    },
    forwardConfig: {
        srcHost: '127.0.0.1',
        srcPort: 3306,
        dstHost: 'db-8dke6.cdb.ntruss.com',
        dstPort: 3306
    }
};

module.exports = config;