var footer_vm = new Vue({
    el: '#footer',
    data: {
        footer:'',
        apiUrl:"/api/v1/config/"
    },
    created: function() {
      this.footer = '2017';
        //var content_id = $('#content_id').attr('content_id');
        /*this.$http.get("/api/v1/content/"+content_id).then(function(data) {
            var json = data.body;
            $(document).attr("title",json.title);
            console.log(json);
            this.content = json;
        });*/
    }
});
