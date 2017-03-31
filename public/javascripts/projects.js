var projects_vm = new Vue({
    el: '#projects',
    data: {
        projects: {},
        add_project_title: '',
        add_task_title: '',
        select_project: {},
        apiUrl_projects: "/api/user/projects",
        apiUrl_project: "/api/user/project"
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
        },
        //添加一个列表项目
        add_project: function () {
            console.log(projects_vm.add_project_title);
            this.$http.post(this.apiUrl_project, {
                add_project_title: projects_vm.add_project_title
            }).then(function (data) {
                var json = data.body;
                if (json.status === 1) {
                    //login success
                    //加入到 projects 里
                    projects_vm.projects.push(json.added_project);
                    //默认选中新添加的项目
                    projects_vm.select_project=added_project;
                    //添加标题清空
                    projects_vm.add_project_title = "";
                }
                if (json.status === 0) {

                }
                console.log(json.status);
            });
        },
        //添加一个任务
        add_task: function () {
            //console.log(projects_vm.add_task_title);
            var new_task = {
                title: projects_vm.add_task_title
            }
            projects_vm.select_project.tasks.push(new_task);
            projects_vm.add_task_title = '';
            this.$http.put(this.apiUrl_project, {
                project: projects_vm.select_project
            }).then(function (data) {
                var json = data.body;

                console.log(json);
            });
        }
    },
    created: function () {
        this.$http.get(this.apiUrl_projects + "?" + Math.random()).then(function (data) {
            var json = data.body;
            console.log(json);
            projects_vm.projects = json.projects;
            if (json.projects.length > 0) {
                projects_vm.select_project = json.projects[0];
            }

        });
    }
});