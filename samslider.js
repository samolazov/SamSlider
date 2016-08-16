// JavaScript Document

// SLIDER
if (document.querySelectorAll(".slider div").length > 1) {document.body.onload = samSlider()}
function samSlider() {
	"use strict";
	var slider = document.getElementsByClassName("slider")[0],
		slides = slider.getElementsByTagName("div"),
		baseZIndex = 20, n;

	//create pagination
	var ul = document.createElement("ul");
	slider.appendChild(ul);
	for (n = 0; n < slides.length; n++) {
		var li = document.createElement("li");
		li.setAttribute("id", "li" + n);
		li.onclick = function () {
			var itemNumber = Number(this.id.slice(2));
			setActiveSlide(itemNumber);
			setActivePagination(itemNumber);
		};
		ul.appendChild(li);
	}
	var lis = slider.getElementsByTagName("li");
	setActiveSlide(0);
	setActivePagination(0);
	slide(0);
	function setActiveSlide(nn) { //nn - active slide number
		var i, a;
		for (i = 0; i < slides.length; i++) {
			if (i < nn) {a = i - nn + slides.length;} else {a = i - nn}
			slides[i].style.zIndex = baseZIndex - a;
		}
	}
	function setActivePagination(nnn) { //nnn - active pagination number
		for (n = 0; n < slides.length; n++) {lis[n].removeAttribute("style")}
		lis[nnn].style.background = "#b00";
		slider.onmouseout = function () {slide(nnn)};
	}
	function slide(nn) {
		var goOn = setInterval(slideGo, 3000);
		slider.onmouseover = function () {clearInterval(goOn)};
		document.body.onblur = function () {
			clearInterval(goOn);
			document.body.onfocus = function () {slide(nn)};
		};

		function slideGo() {
			//set next slide for pagination
			var nextSlide; //nnn - next slide number
			if (nn < slides.length - 1) {nextSlide = nn + 1} else {nextSlide = 0}
			setActivePagination(nextSlide);

			//fading animation
			var id = setInterval(frame, 10),
				opacity = 100;
			function frame() {
				if (opacity === 0) {
					clearInterval(id);
					for (n = 0; n < slides.length; n++) {
						slides[n].style.opacity = 1;
					}
					if (nn < slides.length - 1) {nn++} else {nn = 0}
					setActiveSlide(nn);
				} else {
					opacity--;
					slides[nn].style.opacity = opacity / 100;
				}
			}
		}
	}
}