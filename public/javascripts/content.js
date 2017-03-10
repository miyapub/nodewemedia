var content_vm = new Vue({
    el: '#content',
    data: {
        content_id: '',
        content: {}
    },
    created: function () {
        var content_id = $('#content_id').attr('content_id');
        this.content_id = content_id;
        this.$http.get("/api/v1/content/" + content_id).then(function (data) {
            var json = data.body;
            console.log(json);
            content_vm.content = json;
            $(document).attr("title", json.title);
        });
    },
    methods: {
        select_a: function (e) {
            this.$http.get("/api/v1/select_a/" + this.content_id).then(function (data) {
                var json = data.body;
                console.log(json);
                content_vm.content.select_a_vote_count+=1;
            });
        },
        select_b: function (e) {
            this.$http.get("/api/v1/select_b/" + this.content_id).then(function (data) {
                var json = data.body;
                console.log(json);
                content_vm.content.select_b_vote_count+=1;
            });
        }
    }
    ///select_b/:content_id
});