module.exports = zn.Middleware.ServerContext({
    methods: {
        requestAccept: function (serverRequest, serverResponse){
            
        },
        doRouter: function (router, request, response, context){
            if(zxnz && zxnz.sql && zxnz.sql.Builder) {
                var Builder = zxnz.sql.Builder;

                Builder.parser.upon('parseUpdates', function (parser, data){
                    data.zxnz_updated_time = '{{now()}}';
                });

                Builder.parser.upon('parseValues', function (parser, data){
                    var _session = request.getSession();
                    if(_session){
                        data.zxnz_created_user = _session.getValue('user').name;
                    }
                });
            }
        }
    }
});