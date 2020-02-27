module.exports = {
    host: '0.0.0.0',
    port: 8080,
    catalog: '/',
    databases: [
        {
            default: true,
            modules: ['@zeanium/database-mysql', 'zeanium-database-mysql'],
            port: 3306,
            host: '0.0.0.0',
            user: 'root',
            password: '123456',
            database:'mysql_test'
        }
    ]
};