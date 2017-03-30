var login_vm = new Vue({
    el: '#login',
    data: {
        username_placeholder: LANG.username_placeholder,
        userpass_placeholder: LANG.userpass_placeholder,
        login_pan_title: LANG.login_pan_title,
        reg: LANG.reg,
        login: LANG.login,
        username: '',
        userpass: '',
        msg: '^_^',
        apiUrl: "/api/login/"
    },
    methods: {
        onclick: function (e) {
            if (this.userpass.length === 0) {
                this.msg = LANG.msg_please_input_userpass;
            } else {
                this.msg = LANG.msg_logging;
                this.$http.post(this.apiUrl, {
                    username: this.username,
                    userpass: this.userpass
                }).then(function (data) {
                    var json = data.body;
                    if (json.status === 1) {
                        //login success
                        login_vm.msg = LANG.msg_login_success;
                        window.location.href = '/index.html';
                    }
                    if (json.status === 0) {
                        login_vm.msg = LANG.msg_login_failed;
                    }
                    console.log(json.status);
                    //this.content = json;
                });
            }

        }
    },
    created: function () {
        //var content_id = $('#content_id').attr('content_id');
        /*this.$http.get("/api/v1/content/"+content_id).then(function(data) {
            var json = data.body;
            $(document).attr("title",json.title);
            console.log(json);
            this.content = json;
        });*/
    }
});
login_vm.$watch('username', function (newValue, oldValue) {

    console.log('inner:', newValue) // 后只输出一次 "inner" 5

});

login_vm.$watch('userpass', function (newValue, oldValue) {

    console.log('inner:', newValue) // 后只输出一次 "inner" 5

});