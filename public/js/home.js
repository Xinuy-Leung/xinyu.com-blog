$(document).ready(function(){
	console.log('1');
	var $menu_button = $('.header-container .header .menu-control .menu-button')
	var $menu = $menu_button.siblings('.dropdown-menu');
	$menu_button.click(function (){
		$menu.toggleClass('show');
		console.log('2');
	});
	$(document).click(function(e){
		if($menu.hasClass('show')){
			var $target = $(e.target);
			if(!$target.is('.menu-button span')){
				$menu.removeClass('show');
			}
		}
	});
}
);
