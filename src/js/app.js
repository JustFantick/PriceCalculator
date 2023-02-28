import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';
import * as flsFunctions from "./modules/functions.js";
import * as header from "./modules/header.js";
import { useDynamicAdapt } from "./modules/dinamicAdaptive.js";
import { footerBtnActivate } from "./modules/footer.js";
import { sortBtnActivate } from "./modules/sort-btn.js";
import { formValidationActivate } from "./modules/making-order.js";
import * as amountNsizes from "./modules/amount&sizes.js";
import { getCartWorked } from "./modules/cart.js";

flsFunctions.isWebp();
header.menuBurgerActivate();
header.cartActivate();

useDynamicAdapt();
footerBtnActivate();
if (document.querySelector('.sort-btn')) sortBtnActivate();
if (document.querySelector('.make-order-btn')) formValidationActivate();
if (document.querySelector('.sizes')) {
	amountNsizes.sizesActivate();
	amountNsizes.amountActivate();
};

if (document.querySelector('.item-description')) {
	const swiper = new Swiper('.item-img-slider', {
		modules: [Navigation, Pagination],
		speed: 300,
		spaceBetween: 60,
		loop: true,
		autoHeight: true,
		navigation: {
			nextEl: '.swiper-button-next-custom',
			prevEl: '.swiper-button-prev-custom',
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});
} else if (document.querySelector('.main-slider')) {
	const swiper = new Swiper('.main-slider', {
		modules: [Pagination, Autoplay],
		allowTouchMove: false,
		autoplay: {
			delay: 5000,
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});
}

getCartWorked();