var projects_vm = new Vue({
    el: '#projects',
    data: {
        projects: {},
        add_project_title: '',
        add_task_title: '',
        select_project: {},
        show_add_project_title: 'block',
        show_add_project_body: 'none',
        show_add_task: 'none',
        show_setting_project: 'none',
        add_task_placeholder: '添加任务',
        add_project_placeholder: "列表名称",
        apiUrl_projects: "/api/user/projects",
        apiUrl_project: "/api/user/project"
    },
    methods: {
        //显示project的设置界面
        show_select_project_setting: function () {
            this.show_setting_project = 'block';
        },
        //隐藏project的设置界面
        hide_select_project_setting: function () {
            this.show_setting_project = 'none';
        },
        //显示添加project
        show_add_project: function () {
            projects_vm.show_add_project_title = 'none';
            projects_vm.show_add_project_body = 'block';
        },
        //
        hide_add_project: function () {
            projects_vm.show_add_project_title = 'block';
            projects_vm.show_add_project_body = 'none';
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
                    projects_vm.select_project = json.added_project;
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
        //更新选择的项目
        update_select_project: function () {
            this.$http.put(this.apiUrl_project, {
                project: projects_vm.select_project
            }).then(function (data) {
                var json = data.body;
                console.log(json);
                this.show_setting_project = 'none';
            });
        },
        //添加一个任务
        add_task: function () {
            //console.log(projects_vm.add_task_title);
            var new_task = {
                title: projects_vm.add_task_title,
                status: "Incomplete"
            }
            projects_vm.select_project.tasks.push(new_task);
            projects_vm.add_task_title = '';
            //更新选择的项目
            projects_vm.update_select_project();
        },
        //删除所选的项目
        del_select_project: function () {
            console.log('del project:', this.select_project);
            var project_id = projects_vm.select_project._id;
            this.$http.delete(this.apiUrl_project, {
                body: {
                    project_id: project_id
                }
            }).then(function (data) {
                var json = data.body;
                console.log(json);
                //删除
                projects_vm.projects.map(function (p, index, arr) {
                    if (p._id === project_id) {
                        arr.splice(index, 1);
                    }
                });
                if (projects_vm.projects.length > 0) {
                    projects_vm.select_project = projects_vm.projects[0];
                }
            });
        },
        //删除一个任务
        del_task: function (task) {
            console.log('del task:', task);
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


projects_vm.$watch('add_task_title', function (newValue, oldValue) {
    //如果输入 新任务，出现添加任务按钮。
    console.log('inner:', newValue) // 后只输出一次 "inner" 5
    if (newValue.length > 1) {
        projects_vm.show_add_task = 'block';
    } else {
        projects_vm.show_add_task = 'none';
    }
})