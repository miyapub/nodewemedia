var content = [];
var content_vm = new Vue({
    el: '#content',
    data: {
        content: content
    },
    created: function() {
        var content_id = $('#content_id').attr('content_id');
        this.$http.get("/api/v1/content/"+content_id).then(function(data) {
            var json = data.body;
            $(document).attr("title",json.title);
            console.log(json);
            this.content = json;
        });
    }
});
