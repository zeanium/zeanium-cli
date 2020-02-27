module.exports = zxnz.Model("zxnz_test_user", {
    mixins: [
        zxnz.ref.Base
    ],
    properties: {
        name: {
            value: null,
            type: ['varchar', 100],
            default: ''
        }
    }
});