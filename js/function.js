(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 
10: 
11: 	/* Preloader Effect */
12: 	$window.on('load', function(){
13: 		$(".preloader").fadeOut(600);
14: 	});
15: 
16: 	/* Sticky Header */	
17: 	if($('.active-sticky-header').length){
18: 		$window.on('resize', function(){
19: 			setHeaderHeight();
20: 		});
21: 
22: 		function setHeaderHeight(){
23: 	 		$("header.main-header").css("height", $('header .header-sticky').outerHeight());
24: 		}	
25: 	
26: 		$window.on("scroll", function() {
27: 			var fromTop = $(window).scrollTop();
28: 			setHeaderHeight();
29: 			var headerHeight = $('header .header-sticky').outerHeight()
30: 			$("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
31: 			$("header .header-sticky").toggleClass("active", (fromTop > 600));
32: 		});
33: 	}	
34: 	
35: 	/* Slick Menu JS */
36: 	$('#menu').slicknav({
37: 		label : '',
38: 		prependTo : '.responsive-menu'
39: 	});
40: 
41: 	if($("a[href='#top']").length){
42: 		$(document).on("click", "a[href='#top']", function() {
43: 			$("html, body").animate({ scrollTop: 0 }, "slow");
44: 			return false;
45: 		});
46: 	}
47: 
48: 	/* Hero Slider Layout JS */
49: 	const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
50: 		slidesPerView : 1,
51: 		speed: 1000,
52: 		spaceBetween: 0,
53: 		loop: true,
54: 		autoplay: {
55: 			delay: 4000,
56: 		},
57: 		pagination: {
58: 			el: '.hero-pagination',
59: 			clickable: true,
60: 		},
61: 	});
62: 
63: 	/* testimonial Slider JS */
64: 	if ($('.testimonial-slider').length) {
65: 		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
66: 			slidesPerView : 1,
67: 			speed: 1000,
68: 			spaceBetween: 30,
69: 			loop: true,
70: 			autoplay: {
71: 				delay: 5000,
72: 			},
73: 			pagination: {
74: 				el: '.testimonial-pagination',
75: 				clickable: true,
76: 			},
77: 			navigation: {
78: 				nextEl: '.testimonial-btn-next',
79: 				prevEl: '.testimonial-btn-prev',
80: 			},
81: 			breakpoints: {
82: 				768:{
83: 					slidesPerView: 1,
84: 				},
85: 				991:{
86: 					slidesPerView: 1,
87: 				}
88: 			}
89: 		});
90: 	}
91: 
92: 	/* Services Slider JS */
93: 	if ($('.services-slider').length) {
94: 		const projects_slider = new Swiper('.services-slider .swiper', {
95: 			slidesPerView : 1,
96: 			speed: 1000,
97: 			spaceBetween: 30,
98: 			loop: true,
99: 			autoplay: {
100: 				delay: 5000,
101: 			},
102: 			pagination: {
103: 				el: '.services-pagination',
104: 				clickable: true,
105: 			},
106: 			breakpoints: {
107: 				768:{
108: 					slidesPerView: 2,
109: 				},
110: 				991:{
111: 					slidesPerView: 3,
112: 				}
113: 			}
114: 		});
115: 	}
116: 
117: 	/* Projects Single Image Slider JS */
118: 	if ($('.project-single-slider').length) {
119: 		const projects_slider = new Swiper('.project-single-slider .swiper', {
120: 			slidesPerView : 1,
121: 			speed: 1000,
122: 			spaceBetween: 30,
123: 			loop: true,
124: 			autoplay: {
125: 				delay: 5000,
126: 			},
127: 			pagination: {
128: 				el: '.projects-pagination',
129: 				clickable: true,
130: 			},
131: 			breakpoints: {
132: 				768:{
133: 					slidesPerView: 1,
134: 				},
135: 				991:{
136: 					slidesPerView: 1,
137: 				}
138: 			}
139: 		});
140: 	}
141: 
142: 	/* Skill Bar */
143: 	if ($('.skills-progress-bar').length) {
144: 		$('.skills-progress-bar').waypoint(function() {
145: 			$('.skillbar').each(function() {
146: 				$(this).find('.count-bar').animate({
147: 				width:$(this).attr('data-percent')
148: 				},2000);
149: 			});
150: 		},{
151: 			offset: '70%'
152: 		});
153: 	}
154: 
155: 	/* Youtube Background Video JS */
156: 	if ($('#herovideo').length) {
157: 		var myPlayer = $("#herovideo").YTPlayer();
158: 	}
159: 
160: 	/* Init Counter */
161: 	if ($('.counter').length) {
162: 		$('.counter').counterUp({ delay: 6, time: 3000 });
163: 	}
164: 
165: 	/* Text Effect Animation */
166: 	if ($('.text-anime-style-2').length) {				
167: 		let	 staggerAmount 		= 0.03,
168: 			 translateXValue	= 20,
169: 			 delayValue 		= 0.1,
170: 			 easeType 			= "power2.out",
171: 			 animatedTextElements = document.querySelectorAll('.text-anime-style-2');
172: 		
173: 		animatedTextElements.forEach((element) => {
174: 			let animationSplitText = new SplitText(element, { type: "chars, words" });
175: 				gsap.from(animationSplitText.chars, {
176: 					duration: 1,
177: 					delay: delayValue,
178: 					x: translateXValue,
179: 					autoAlpha: 0,
180: 					stagger: staggerAmount,
181: 					ease: easeType,
182: 					scrollTrigger: { trigger: element, start: "top 85%"},
183: 				});
184: 		});		
185: 	}
186: 
187: 	/* Image Reveal Animation */
188: 	if ($('.reveal').length) {
189:         gsap.registerPlugin(ScrollTrigger);
190:         let revealContainers = document.querySelectorAll(".reveal");
191:         revealContainers.forEach((container) => {
192:             let image = container.querySelector("img");
193:             let tl = gsap.timeline({
194:                 scrollTrigger: {
195:                     trigger: container,
196:                     toggleActions: "play none none none"
197:                 }
198:             });
199:             tl.set(container, {
200:                 autoAlpha: 1
201:             });
202:             tl.from(container, 1, {
203:                 xPercent: -100,
204:                 ease: Power2.out
205:             });
206:             tl.from(image, 1, {
207:                 xPercent: 100,
208:                 scale: 1,
209:                 delay: -1,
210:                 ease: Power2.out
211:             });
212:         });
213:     }
214: 
215: 	/* Parallaxie js */
216: 	/* var $parallaxie = $('.parallaxie');
217: 	if($parallaxie.length && ($window.width() > 991))
218: 	{
219: 		if ($window.width() > 768) {
220: 			$parallaxie.parallaxie({
221: 				speed: 0.55,
222: 				offset: 0,
223: 			});
224: 		}
225: 	} */
226: 
227: 	/* Zoom Gallery screenshot */
228: 	$('.gallery-items').magnificPopup({
229: 		delegate: 'a',
230: 		type: 'image',
231: 		closeOnContentClick: false,
232: 		closeBtnInside: false,
233: 		mainClass: 'mfp-with-zoom',
234: 		image: {
235: 			verticalFit: true,
236: 		},
237: 		gallery: {
238: 			enabled: true
239: 		},
240: 		zoom: {
241: 			enabled: true,
242: 			duration: 300, // don't foget to change the duration also in CSS
243: 			opener: function(element) {
244: 			  return element.find('img');
245: 			}
246: 		}
247: 	});
248: 
249: 	/* Contact form validation */
250: 	var $contactform = $("#contactForm");
251: 	$contactform.validator({focus: false}).on("submit", function (event) {
252: 		if (!event.isDefaultPrevented()) {
253: 			event.preventDefault();
254: 			submitForm();
255: 		}
256: 	});
257: 
258: 	function submitForm(){
259: 		/* Ajax call to submit form */
260: 		$.ajax({
261: 			type: "POST",
262: 			url: "/api/contact",
263: 			data: $contactform.serialize(),
264: 			success : function(text){
265: 				if (text === "success"){
266: 					formSuccess();
267: 				} else {
268: 					submitMSG(false, text, "#msgSubmit");
269: 				}
270: 			}
271: 		});
272: 	}
273: 
274: 	function formSuccess(){
275: 		$contactform[0].reset();
276: 		submitMSG(true, "Message Sent Successfully!", "#msgSubmit")
277: 	}
278: 
279: 	/* Audit form validation */
280: 	var $auditform = $("#auditForm");
281: 	$auditform.validator({focus: false}).on("submit", function (event) {
282: 		if (!event.isDefaultPrevented()) {
283: 			event.preventDefault();
284: 			submitAuditForm();
285: 		}
286: 	});
287: 
288: 	function submitAuditForm(){
289: 		/* Ajax call to submit form */
290: 		$.ajax({
291: 			type: "POST",
292: 			url: "/api/audit",
293: 			data: $auditform.serialize(),
294: 			success : function(text){
295: 				if (text === "success"){
296: 					auditFormSuccess();
297: 				} else {
298: 					submitMSG(false, text, "#auditMsgSubmit");
299: 				}
300: 			}
301: 		});
302: 	}
303: 
304: 	function auditFormSuccess(){
305: 		$auditform[0].reset();
306: 		submitMSG(true, "Audit Request Sent Successfully!", "#auditMsgSubmit")
307: 	}
308: 
309: 	function submitMSG(valid, msg, targetId){
310: 		if(valid){
311: 			var msgClasses = "h4 text-success";
312: 		} else {
313: 			var msgClasses = "h4 text-danger";
314: 		}
315: 		$(targetId).removeClass().addClass(msgClasses).text(msg);
316: 	}
317: 	/* Contact and Audit form validation end */
318: 
319: 	/* Animated Wow Js */	
320: 	new WOW().init();
321: 
322: 	/* Popup Video */
323: 	if ($('.popup-video').length) {
324: 		$('.popup-video').magnificPopup({
325: 			type: 'iframe',
326: 			mainClass: 'mfp-fade',
327: 			removalDelay: 160,
328: 			preloader: false,
329: 			fixedContentPos: true
330: 		});
331: 	}
332: 	
333: })(jQuery);
