(function() {
    angular
        .module('myApp')
        .service('chatService', chatService);

    chatService.$inject = [
        '$http',
        '$q',
        '$window',
        'Upload'
    ];
    function chatService($http,$q,$window,Upload) {
        return {

            send_msg: function (file) {

                return Upload.upload({
                    url: '/chat/sendimage',
                    data: {file: file}

            });
                
            },

            send_File: function (files) {

                return Upload.upload({
                    url: '/chat/sendFile',
                    data: {file: files}

                });
            },

            getChatinfo:function()
            {

                return $http({
                   method:'GET',
                    url:'/chat/getChatInfo'
                });
            }
        }
    };
})();