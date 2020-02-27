module.exports = zn.Controller('user', {
    validate: true,
    methods: {
        login: {
            validate: false,
            method: 'GET/POST',
            value: function (request, response){
                response.createSession({
                    values: {
                        user: { 
                            name: 'yangyxu',
                            email: 'yangyxu@cisco.com',
                            age: 30
                        }
                    }
                });

                response.success('Login Success.');
            }
        },
        logout: {
            method: 'GET/POST',
            value: function (request, response){
                response.invalidateSession();
                response.success('Logout Success.');
            }
        },
        user: {
            method: 'GET',
            value: function (request, response){
                var _session = request.getSession();
                response.success(_session.getValue('user'));
                
            }
        },
        test: {
            method: 'GET/POST',
            value: function (request, response){
                
                this.beginTransaction()
                    .query("select  * from zn_chunrui_oa_customer", function (){

                    }, function (sql, data){
                        console.log(data);
                        response.success(data);
                    })
                    .commit();
                
            }
        }
    }
});