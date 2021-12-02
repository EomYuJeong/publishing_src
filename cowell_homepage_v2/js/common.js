(function ($) {
    $(function () {
        $(window).on("load resize", function () {
            var displayWidth = $(window).width();
            if (displayWidth < 980) {
                /* MOBILE ------------------------------*/
                var leftCheck = [];
                leftCheck[0] = 0, leftCheck[1] = 0;


                $('.top_link').off('mouseenter');
                $('.navigation').off('mouseleave');

                leftStart();

                $('.nav_btn').on({
                    click: function () {
                        LeftMenuFn();
                    }
                });

                $('.gnb_bg').on({
                    click: function () {
                        leftClose();
                    }
                });

                function LeftMenuFn() {
					console.log("leftCheck[0] : " + leftCheck[0] + " , leftCheck[1] : " + leftCheck[1]);
					
                    if (leftCheck[1] == 1) {
                        leftOpen();
                    } else if (leftCheck[0] == 1) {
                        leftClose();
                    }
                }

                function leftStart() {
                    leftCheck[1] = 1;
                }

                function leftOpen() {
                    leftCheck[0] = 1, leftCheck[1] = 0;
                    $('.nav_btn').addClass('nav_close');
                    $('#gnb').stop().animate({
                        right: '0px'
                    }, 300);
                    $('.gnb_bg').fadeIn(300);
                }

                function leftClose() {
                    leftCheck[0] = 0, leftCheck[1] = 1;
                    $('.nav_btn').removeClass('nav_close');
                    $('#gnb').stop().animate({
                        right: '-260px'
                    }, 300);
                    $('.gnb_bg').fadeOut(300);
                }

                $('.sub_menu').css({
                    display: "none"
                });
                $(".top_link").unbind("click").bind("click", function (e) {				
                    
					
                    var menu = $(this).parent();
					
					if(menu.attr('id') == 'topmenu3' || menu.attr('id') == 'topmenu5'){
					   
					}else{
						e.preventDefault();
						menu.toggleClass('active').children('.sub_menu').slideDown(300);
						menu.siblings().removeClass('active');

						$('.navigation > li').not('.active').children('.sub_menu').slideUp(300);
						
					}
					
					
                    
                });


                $('.navigation .gnb_topmenu').each(function (index, item) {                    
                    if ($(item).hasClass('active')) {
                        console.log("active");
                        $(item).children('.sub_menu').css('display', 'block');
                    }
                });
            } else {
                /* PC ----------------------------------*/
                $('.nav_btn').off('click');
                $('.top_link').off('click');

                $('.sub_menu').css({
                    display: "none"
                });
                $('.gnb_bg').css({
                    display: "none"
                });

                $('.top_link').on({
                    mouseenter: function () {
                        $('.sub_menu, .gnb_bg').slideDown(300);
                    }
                });
                $('.navigation').on({
                    mouseleave: function () {
                        $('.sub_menu, .gnb_bg').slideUp(300);
                    }
                });
            }
            
            $('.btn_top').on('click',function(){
                $(window).scrollTop(0);
            });
            
            
        });
    });
})(jQuery)
