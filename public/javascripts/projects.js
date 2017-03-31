var projects_vm = new Vue({
    el: '#projects',
    data: {
        projects: {},
        add_project_title: '',
        add_task_title: '',
        select_project: {},
        show_add_project_title:'block',
        show_add_project_body:'none',
        add_task_placeholder:'任务名称',
        add_project_placeholder:"列表名称",
        apiUrl_projects: "/api/user/projects",
        apiUrl_project: "/api/user/project"
    },
    methods: {
        //显示添加project
        show_add_project:function(){
            projects_vm.show_add_project_title='none';
            projects_vm.show_add_project_body='block';
        },
        //
        hide_add_project:function(){
            projects_vm.show_add_project_title='block';
            projects_vm.show_add_project_body='none';
        },
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
                    projects_vm.select_project=json.added_project;
                    //添加标题清空
                    projects_vm.add_project_title = "";
                    //隐藏添加框
                    projects_vm.hide_add_project();
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
                title: projects_vm.add_task_title,
                status:"Incomplete"
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