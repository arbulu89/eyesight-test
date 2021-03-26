$('.delete-entry').on('click', function (){
	$entry = $(this).parent()[0];
	delete_test(
			$(this).parent()[0].id,
			function(data) {
				console.log(data);
				if (data == true) {
					$entry.remove();
				}
			});
});

function delete_test(test_id, callback) {
	$.ajax({
    url: '/test/'+test_id,
    type: 'DELETE',
    success: function(data){
			window.location.href = "#popup-removed";
			callback(true);
    },
		error: function(data){
			window.location.href = "#popup-error";
    }
  });
}
