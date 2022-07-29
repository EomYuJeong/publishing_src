(function ($) {
	$(function () {
		$(window).on("load resize", function () {
			let displayWidth = $(window).width();
			const about_text = "'생존' 이 아닌\n'성장' 을 말하십시오.\n최적의 Solution을 \n제안해 드립니다.";
			const about_text_box = document.querySelector(".about-left");
			
			$(window).scroll(function () {

				let scrollTop = $(window).scrollTop();
				let $gnb = $('.header');
				let $gnb_menu = $('.gnb-wrap ul li');
				let window_width = $(window).width();


				/*gnb*/
				if (scrollTop >= 0 && scrollTop < $('#about').offset().top - 100) {

					$gnb.removeClass("black white");
					$gnb_menu.removeClass('on');

				} else if (scrollTop >= $('#about').offset().top - 100 && (scrollTop < $('#service').offset().top - 100)) {

					$gnb.removeClass("black white");
					$gnb.addClass("black");
					$gnb_menu.removeClass('on');
					$gnb_menu.eq(0).addClass('on');

				} else if (scrollTop >= $('#service').offset().top - 100 && scrollTop < $('#portfolio').offset().top - 100) {
					$gnb.removeClass("black white");
					$gnb.addClass("black");
					$gnb_menu.removeClass('on');
					$gnb_menu.eq(1).addClass('on');

				} else if (scrollTop >= $('#portfolio').offset().top - 100 && scrollTop < $('#contact').offset().top - 100) {

					$gnb.removeClass("black white");
					$gnb.addClass("white");
					$gnb_menu.removeClass('on');
					$gnb_menu.eq(2).addClass('on');

				} else {

					$gnb.removeClass("black white");
					$gnb.addClass("white");
					$gnb_menu.removeClass('on');
					$gnb_menu.eq(3).addClass('on');
				}
			});


			if (displayWidth < 980) {
				/* MOBILE ------------------------------*/
				/*about*/
				about_text_box.innerHTML = about_text.replace(/\n/g, '<br>');

			} else {
				/* PC     ------------------------------*/
				let isVisibleAbout = false;
				gsap.registerPlugin(ScrollTrigger);
				/*about*/
				
				let idx = 0;

				function typing() {
					if (idx < about_text.length) {
						let txt = about_text[idx++]
						about_text_box.innerHTML += txt === "\n" ? "<br/>" : txt;
					} else {
						return false;
					}
				}

				$(window).scroll(function () {

					let scrollTop = $(window).scrollTop();
					let $gnb = $('.header');
					let $gnb_menu = $('.gnb-wrap ul li');
					let window_width = $(window).width();


					/*gnb*/
					if (scrollTop >= 0 && scrollTop < $('#about').offset().top - 100) {

						$gnb.removeClass("black white");
						$gnb_menu.removeClass('on');

					} else if (scrollTop >= $('#about').offset().top - 100 && (scrollTop < $('#service').offset().top - 100)) {

						$gnb.removeClass("black white");
						$gnb.addClass("black");
						$gnb_menu.removeClass('on');
						$gnb_menu.eq(0).addClass('on');

					} else if (scrollTop >= $('#service').offset().top - 100 && scrollTop < $('#portfolio').offset().top - 100) {
						$gnb.removeClass("black white");
						$gnb.addClass("black");
						$gnb_menu.removeClass('on');
						$gnb_menu.eq(1).addClass('on');

					} else if (scrollTop >= $('#portfolio').offset().top - 100 && scrollTop < $('#contact').offset().top - 100) {

						$gnb.removeClass("black white");
						$gnb.addClass("white");
						$gnb_menu.removeClass('on');
						$gnb_menu.eq(2).addClass('on');

					} else {

						$gnb.removeClass("black white");
						$gnb.addClass("white");
						$gnb_menu.removeClass('on');
						$gnb_menu.eq(3).addClass('on');
					}





					if ((scrollTop >= $('.section-about').offset().top - 200) && !isVisibleAbout) {

						isVisibleAbout = true;
						setInterval(typing, 100);

						let tl = gsap.timeline();
						gsap.registerPlugin(ScrollTrigger);

						tl.to("#about-txt", {
							delay: 5,
							onComplete: txtLeft,
						})

						tl.to(".section-about .txt-right", {
							opacity: 1,
							top: '19px',
							delay: 0.5
						})

						tl.to(".about-list .ico-box", {
							scrollTrigger: {
								trigger: ".about-list .ico-box",
							},
							opacity: 1,
							stagger: 0.3,
							top: 0
						})

						tl.to(".about-list .list-cont", {
							opacity: 1,
							stagger: 0.3,
							top: 0
						})
					}

				});


				ScrollTrigger.matchMedia({
					'(min-width:769px)': function minWidth769px() {
						horizontalScroll();
						displayWorkSection();
						displayPortfolio();
					}
				})

				function txtLeft() {
					$('#about-txt').addClass('after');
				}

				function horizontalScroll() {
					/*horizon*/
					let h_sections = gsap.utils.toArray(".horizontal-box");
					let targetEl = document.querySelector(".horizontal-wrap");
					let offset_section = document.querySelector(".horizontal-wrap").offsetTop;
					let window_w = window.innerWidth;

					let timeline = gsap.timeline({
						scrollTrigger: {
							trigger: targetEl,
							start: function start() {
								return "top top";
							},
							end: function end() {
								return "+=".concat(targetEl.offsetWidth, "px");
							},
							scrub: 1,
							pin: true,
							ease: 'none'
						}
					});
					timeline.addLabel('horizon').fromTo('.horizontal-wrap', {
						xPercent: 0,
						x: '0'
					}, {
						xPercent: -100,
						x: '100vw',
						ease: 'none',
						delay: 0.05
					}).fromTo('.horizontal-wrap', {
						delay: 0
					}, {
						delay: 0.01
					}, 'horizon+=0.15');

					/* section1 : strength */
					let h_tl = gsap.timeline({
						scrollTrigger: {
							trigger: ".section-strength",
							start: "top center",
							toggleActions: "restart none none none",

						}
					})

					h_tl.from(".section-strength h2", {
						x: 100,
						opacity: 0,
					})

					h_tl.from(".section-strength .card-list ul li", {
						duration: 2,
						opacity: 0,
						stagger: 0.2,
						force3D: true,
						y: 60,
					})


					/* section2 : organization */
					let h_tl2 = gsap.timeline({
						scrollTrigger: {
							trigger: ".section-organization",
							start: window_w * 1.8,
							toggleActions: "restart none reverse none",
						}
					});

					h_tl2.from('.section-organization h2', {
						opacity: 0,
						x: 100,
						onComplete: displayCircle,
					});


					h_tl2.from(".section-organization .org-table .circle-box", {
						duration: 1,
						opacity: 0,
						stagger: 0.1,
						force3D: true,
						x: 60,
					})

					/* section3 : step */
					let h_tl3 = gsap.timeline({
						scrollTrigger: {
							trigger: ".company-step",
							start: window_w * 3.5,
							toggleActions: "restart none reverse none",
						}
					});

					h_tl3.from(".company-step h2", {
						opacity: 0,
						x: 100,
					})

				}

				function displayCircle() {
					$('.org-table circle').addClass("line");
				}

				function displayWorkSection() {

					let wl = gsap.timeline({
						scrollTrigger: {
							trigger: ".section-work",
							start: "top 60%",
						}
					});

					wl.from(".section-work h2", {
						duration: 0.3,
						opacity: 0,
					})

					wl.from(".section-work .txt-sm", {
						duration: 0.3,
						opacity: 0,
					})

					wl.from(".section-work .img", {
						duration: 0.3,
						opacity: 0,
					})

					let title_list = gsap.utils.toArray(".section-work .work-list dl");

					title_list.forEach((element, i) => {
						ScrollTrigger.create({
							trigger: element,
							start: "top 80%",
							onEnter: function () {
								element.childNodes[1].classList.add("active")
								element.childNodes[3].classList.add("active")
							},
							onLeave: function () {

							},
							onEnterBack: function () {

							},
							onLeaveBack: function () {

							},
						})
					})
				}

				function displayPortfolio() {
					let c_arr = $(".company-list .item").toArray();
					let c_list = gsap.utils.toArray(".company-list .item");

					let tl = gsap.timeline({
						scrollTrigger: {
							trigger: ".section-portfolio",
							start: "top 40%",
							toggleActions: "restart none none none",
						}
					});

					tl.from(".section-portfolio h2", {
						opacity: 0,
						y: 100
					})
					tl.from(".section-portfolio .txt-sm", {
						opacity: 0,
						y: 100
					})

					c_arr.sort(function () {
						return 0.5 - Math.random()
					})

					for (let i = 0; i < c_arr.length; i++) {

						let j = Math.floor(Math.random() * (i + 1));

						let temp = c_arr[i];
						c_arr[i] = c_arr[j];
						c_arr[j] = temp;
					}

					tl.from(c_arr, {
						opacity: 0,
						y: 50,
						stagger: 0.1,
						ease: "back.out(1.7)"
					})

					let $pin_section = document.querySelectorAll(".works-pin-box");
					let pin = gsap.timeline({
						scrollTrigger: {
							trigger: ".works-pin-box",
							pin: true,
							scrub: 0.3,
							start: "top top",
							end: "+=50% bottom"
						}
					})

					pin.to(".works-pin-box .item-list li", {
						top: 0,
						left: 0,
					})

					pin.to(".works-pin-box .item-list li .dscrt", {
						opacity: 1
					})

					pin.to(".works-pin-box .item-list li", {
						opacity: 1
					})
				}


			}
		});
	});
})(jQuery)


$('.header .btn-black,.step-box,.section-main .btn').on("click", function () {
	$('.dmm').addClass('on');
	$('.layer-contact').addClass('on');
})

$('.layer-contact .btn-b').on("click", function () {
	$('.dmm').removeClass('on');
	$('.layer-contact').removeClass('on');
})

/*hamburger*/
$('.btn-menu').on('click', function () {
	$('.gnb-cont').addClass('on');
})
$('.gnb-cont .btn-close').on('click', function () {
	$('.gnb-cont').removeClass('on');
})
