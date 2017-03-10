var content_edit_vm = new Vue({
    el: '#content_edit',
    data: {
      btn:{
        update:'更新'
      },
        editor: {},
        content: {},
        apiUrl: "/api/v1/post"
    },
    methods: {
        onclick: function(e) {
            var content = this.editor.getData();
            this.content.content = content;
            this.btn.update='正在更新';
            this.$http.put(this.apiUrl, this.content).then(function(data) {
                var json = data.body;
                console.log(json);
                this.btn.update='更新完成';
                //this.content = json;
            });
        }
    },
    created: function() {
        var content_id = $('#content_id').attr('content_id');

        this.$http.get("/api/v1/content/" + content_id).then(function(data) {
            var json = data.body;
            $(document).attr("title", json.title);
            console.log(json);
            this.content = json;
            var editor = CKEDITOR.replace('editor');
            editor.setData(json.content);
            content_edit_vm.editor = editor;
        });
    }
});
