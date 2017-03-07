var post_vm = new Vue({
    el: '#post',
    data: {
        editor: {},
        content: {
            title: '',
            content: ''
        },
        apiUrl: "/api/v1/post/"
    },
    methods: {
        onclick: function(e) {
            var content = this.editor.getData();
            this.content.content = content;

            this.$http.post(this.apiUrl, this.content).then(function(data) {
                var json = data.body;
                console.log(json);
            });
        }
    },
    created: function() {

        setTimeout(function() {
            var editor = CKEDITOR.replace('editor');
            post_vm.editor = editor;
        }, 2000);

        /*
        this.editor = new Jodit('#editor', {
            "toolbarButtonSize": "large",
            //"theme": "dark"
        });*/
        //var content_id = $('#content_id').attr('content_id');
        /*this.$http.get("/api/v1/content/"+content_id).then(function(data) {
            var json = data.body;
            $(document).attr("title",json.title);
            console.log(json);
            this.content = json;
        });*/
        /*
        $('#editor').wysiwyg({
            hotKeys: {
                'ctrl+b meta+b': 'bold',
                'ctrl+i meta+i': 'italic',
                'ctrl+u meta+u': 'underline',
                'ctrl+z meta+z': 'undo',
                'ctrl+y meta+y meta+shift+z': 'redo'
            }
        });
        */
    }
});
