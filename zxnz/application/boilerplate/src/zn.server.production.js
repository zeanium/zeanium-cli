module.exports = {
    host: '0.0.0.0',
    port: 8080,
    catalog: '/src/',
    databases: [
        {
            default: true,
            modules: ['@zeanium/database-mysql', 'zeanium-database-mysql'],
            port: 3306,
            host: '0.0.0.0',
            user: 'root',
            password: 'pwd',
            database:'zxnz_xxx_production'
        }
    ]
};