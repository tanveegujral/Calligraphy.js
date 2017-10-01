var opentype = require('opentype.js'),
	defaultParams = {
		inputString: 'Hello',
		parentElement: 'my-div',
		fontType: '1',
		fontSize: 105,
		fontColor: 'Yellow',
		animationType: 'oneByOne',
		duration: 0.5,
		delay: 2
	},
	init = function init(inputString, parentElement, options) {
		Object.assign(defaultParams, { inputString: inputString }, { parentElement: parentElement }, options);
	},
	setSvgHeader = function setSvgHeader() {
		var parentElement = document.querySelector(defaultParams.parentElement),
			width = parentElement.getBoundingClientRect().width,
			height = defaultParams.fontSize * 2;
		parentElement.innerHTML =
			'<svg width=' +
			width +
			' height=' +
			height +
			' version="1.1" xmlns="http://www.w3.org/2000/svg" id="handwriting_svg"></svg>';
	},
	generateSvg = function generateSvg() {
		opentype.load('/fonts/' + defaultParams.fontType + '.otf', function(err, font) {
			if (err) {
				alert('Font could not be loaded: ' + err);
			} else {
				var paths = [],
					parentElement = document.querySelector(defaultParams.parentElement),
					svgElement = document.getElementById('handwriting_svg'),
					svgPaths,
					splitSring = defaultParams.inputString.split(''),
					x = parentElement.getBoundingClientRect().left,
					y = defaultParams.fontSize * 2 - 10;

				for (var i = 0; i < splitSring.length; i++) {
					if (i > 0) {
						svgPaths = document.querySelectorAll('#handwriting_svg path');
						x += svgPaths[i - 1].getBoundingClientRect().width;
					}
					if (splitSring[i] == ' ') x += defaultParams.fontSize / 2;
					paths.push(font.getPath(splitSring[i], x, y, defaultParams.fontSize));
					var html = paths[i].toSVG(2);
					svgElement.innerHTML += html;
				}

				animateSvg();
			}
		});
	},
	animateSvg = function() {
		var svgElement = document.getElementById('handwriting_svg'),
			svgPaths = document.querySelectorAll('#handwriting_svg path'),
			delay = defaultParams.delay;
		for (var i = 0; i < svgPaths.length; i++) {
			var length = svgPaths[i].getTotalLength();

			svgPaths[i].setAttribute('stroke', defaultParams.fontColor);
			svgPaths[i].setAttribute('fill', 'none');
			svgPaths[i].setAttribute('stroke-width', '2');

			// Clear any previous transition
			svgPaths[i].style.animation = svgPaths[i].style.WebkitTransition = 'none';
			// Set up the starting positions
			svgPaths[i].style.strokeDasharray = length + ' ' + length;
			svgPaths[i].style.strokeDashoffset = length;
			// Trigger a layout so styles are calculated & the browser
			// picks up the starting position before animating
			svgPaths[i].getBoundingClientRect();
			// Define our transition
			svgPaths[i].style.animation = svgPaths[i].style.WebkitTransition =
				'stroke-dashoffset ' + defaultParams.duration + 's ease-in-out';
			svgPaths[i].style.animationDelay = svgPaths[i].style.webkitTransitionDelay = delay + 's';
			if (defaultParams.animationType == 'oneByOne') delay += defaultParams.duration;
			else delay = defaultParams.delay;
			// Go!
			svgPaths[i].style.strokeDashoffset = '0';
		}
	};

var HandWriting = function HandWriting(inputString, parentElement, options) {
	init(inputString, parentElement, options);
	setSvgHeader();
	generateSvg();
};

window.HandWriting = HandWriting;
