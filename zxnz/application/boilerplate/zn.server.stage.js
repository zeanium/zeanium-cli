module.exports = {
    host: '0.0.0.0',
    port: 4141,
    catalog: '/',
    node_paths: ['../../zeanium/', '../../zxnz/'],
    databases: [
        {
            default: true,
            modules: ['@zeanium/database-mysql', 'zeanium-database-mysql'],
            port: 3306,
            host: '183.134.66.17',
            user: 'root',
            password: 'ddm@2019',
            database:'zxnz_freeorder_admin'
        }
    ]
};