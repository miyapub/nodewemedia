var projects_vm = new Vue({
    el: '#projects',
    data: {
        projects: {},
        select_project: {},
        apiUrl_projects: "/api/user/projects"
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
        },
        select: function (project) {
            console.log(project);
            projects_vm.select_project = project;
        }
    },
    created: function () {
        this.$http.get(this.apiUrl_projects + "?" + Math.random()).then(function (data) {
            var json = data.body;
            console.log(json);
            projects_vm.projects = json.projects;
            projects_vm.select_project = json.projects[0];
        });
    }
});