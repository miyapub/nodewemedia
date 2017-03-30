var login_status_vm = new Vue({
    el: '#login_status',
    data: {
        label: {
            username: "",
            logout: "",
        },
        apiUrl_login: "/api/login_status",
        apiUrl_logout: "/api/logout"
    },
    methods: {
        logout: function () {
            this.$http.get(this.apiUrl_logout + "?" + Math.random()).then(function (data) {
                var json = data.body;
                console.log(json);
                if (json.status === 1) {
                    window.location.href = '/login.html';
                }
            });
        }
    },
    created: function () {
        this.$http.get(this.apiUrl_login + "?" + Math.random()).then(function (data) {
            var json = data.body;
            console.log(json);
            if (json.status === 0) {
                //未登录状态
                login_status_vm.label.username = LANG.guess;

                if (typeof ($("#login_status").attr("must-login")) != "undefined") {
                    window.location.href = '/login.html';
                }
            } else {
                login_status_vm.label.username = json.username;
                login_status_vm.label.logout = LANG.logout;
            }
        });
    }
});