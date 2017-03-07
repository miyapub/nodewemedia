var contents = [];
var contents_vm = new Vue({
    el: '#contents',
    data: {
        contents: contents
    },
    created: function() {
        //var _self = this;
        //
        this.$http.get("/api/v1/contents").then(function(data){
            var json=data.body;
            this.contents=json;
        });
        //
        /*
        $.getJSON("/api/v1/contents", function(result) {
            console.log(result);
            //_self.contents = result
            contents_vm.contents=result;
        });*/
    }
});
