var reg_vm = new Vue({
    el: '#reg',
    data: {
        username_placeholder: LANG.username_placeholder,
        userpass_placeholder: LANG.userpass_placeholder,
        reg_pan_title: LANG.reg_pan_title,
        reg: LANG.reg,
        msg: "^_^",
        username: "",
        userpass: "",
        reg_status: "",
        apiUrl_reg: "/api/reg",
        apiUrl_can_be_use: "/api/reg/username_can_use"
    },
    methods: {
        onclick: function (e) {
            this.$http.post(this.apiUrl_reg, {
                username: this.username,
                userpass: this.userpass
            }).then(function (data) {
                var json = data.body;
                console.log(json);
                if (json.status === 1) {
                    reg_vm.msg = LANG.msg_reg_success;
                    window.location.href = '/login.html';
                } else {
                    reg_vm.msg = LANG.msg_reg_failed;
                }
            });
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

reg_vm.$watch('username', function (newValue, oldValue) {

    console.log('inner:', newValue) // 后只输出一次 "inner" 5
    reg_vm.$http.post(reg_vm.apiUrl_can_be_use, {
        username: reg_vm.username
    }).then(function (data) {
        var json = data.body;
        console.log(json);
        if (json.status === 0) {
            reg_vm.msg = LANG.msg_username_can_not_be_reg;
        }
        if (json.status === 1) {
            reg_vm.msg = LANG.msg_username_can_be_reg;
        }
    });
})