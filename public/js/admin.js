$(function() {
            $('.del').click(function(e) {
                    var target = $(e.target)
                    var id = target.data('id')

                    $.ajax({
                            type: 'delete',
                            url: '/xinyu/blog/delete/' + id
                        })
                        .done(function(results) {
                                if (results.success === 1) {

                                }
                            }
                        })
            })
