var login_vm = new Vue({
    el: '#login',
    data: {
        user: {
            username: '',
            userpass: ''
        },
        loginStatus: '',
        apiUrl: "/api/v1/login/"
    },
    methods: {
        onclick: function (e) {
            if (this.user.userpass.length === 0) {
                this.loginStatus = '请输入密码';
            } else {
                this.loginStatus = '正在登录，请稍候...';
                this.$http.post(this.apiUrl, this.user).then(function (data) {
                    var json = data.body;
                    if (json.state === 1) {
                        //login success
                        login_vm.loginStatus = '登录成功';
                    }
                    if (json.state === 0) {
                        login_vm.loginStatus = '登录失败';
                    }
                    console.log(json.state);
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