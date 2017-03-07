var reg_vm = new Vue({
    el: '#reg',
    data: {
        user:{},
        apiUrl:"/api/v1/reg/"
    },
    methods: {
        onclick: function(e) {
            this.$http.post(this.apiUrl,this.user).then(function(data) {
                var json = data.body;
                console.log(json);
                //this.content = json;
            });
        }
    },
    created: function() {
        //var content_id = $('#content_id').attr('content_id');
        /*this.$http.get("/api/v1/content/"+content_id).then(function(data) {
            var json = data.body;
            $(document).attr("title",json.title);
            console.log(json);
            this.content = json;
        });*/
    }
});
