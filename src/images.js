import './images/bio.jpeg';
import './images/mai_resume.pdf';
import './images/logo.svg';
import './images/portrait-ascii.png';

// jjd images
import jjdImageSm from './images/projects/jjd-sm.png';
import jjdImageMd from './images/projects/jjd-md.png';
import jjdImageLg from './images/projects/jjd-lg.png';

// usdt images
import usdtImageSm from './images/projects/usdt-sm.png';
import usdtImageMd from './images/projects/usdt-md.png';
import usdtImageLg from './images/projects/usdt-lg.png';

// raven images
import ravenImageSm from './images/projects/raven-sm.png';
import ravenImageMd from './images/projects/raven-md.png';
import ravenImageLg from './images/projects/raven-lg.png';

// Placeholders
import './images/placeholders/jjd-sm-ph.png';
import './images/placeholders/jjd-md-ph.png';
import './images/placeholders/jjd-lg-ph.png';
import './images/placeholders/usdt-sm-ph.png';
import './images/placeholders/usdt-md-ph.png';
import './images/placeholders/usdt-lg-ph.png';
import './images/placeholders/raven-sm-ph.png';
import './images/placeholders/raven-md-ph.png';
import './images/placeholders/raven-lg-ph.png';

// icons
import './images/icons/pdf.svg';
import './images/icons/linkedin.svg';
import './images/icons/github.svg';
import './images/icons/stackoverflow.svg';
import './images/icons/skype.svg';

import './images/icons/favicon-16x16.png';
import './images/icons/favicon-32x32.png';
import './images/icons/favicon.ico';

// =========Code Below


// Intersection Observer to lazyload images
document.addEventListener("DOMContentLoaded", function () {
	let lazyloadImages;

	if ("IntersectionObserver" in window) { //Not supported by IE
		lazyloadImages = document.querySelectorAll(".lazy");

		let imageObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					let image = entry.target;

					if (image.id === "jjd") {
						image.srcset = `
							${jjdImageSm} 350w,
							${jjdImageMd} 550w,
							${jjdImageLg} 800w,
						`
					}
					else if (image.id === "usdt") {
						image.srcset = `
							${usdtImageSm} 350w,
							${usdtImageMd} 550w,
							${usdtImageLg} 800w,
						`
					} else {
						image.srcset = `
							${ravenImageSm} 350w,
							${ravenImageMd} 550w,
							${ravenImageLg} 800w,
						`
					}

					image.classList.remove("lazy");
					imageObserver.unobserve(image);
				}
			});
		}, { rootMargin: "0px 0px 20px 0px" });

		lazyloadImages.forEach(function (image) {
			imageObserver.observe(image);
		});

	} else {
		let lazyloadThrottleTimeout;
		lazyloadImages = document.querySelectorAll(".lazy");

		function lazyload() {
			if (lazyloadThrottleTimeout) {
				clearTimeout(lazyloadThrottleTimeout);
			}

			lazyloadThrottleTimeout = setTimeout(function () {
				const scrollTop = window.pageYOffset;

				lazyloadImages.forEach(function (img) {
					if (img.offsetTop < (window.innerHeight + scrollTop)) {
						if (img.id === "jjd") {
							img.srcset = `
										${jjdImageSm} 350w,
										${jjdImageMd} 550w,
										${jjdImageLg} 800w,
									`

							img.src = jjdImageSm;
						}
						else if (img.id === "usdt") {
							img.srcset = `
										${usdtImageSm} 350w,
										${usdtImageMd} 550w,
										${usdtImageLg} 800w,
									`

							img.src = usdtImageSm;
						} else {
							img.srcset = `
										${ravenImageSm} 350w,
										${ravenImageMd} 550w,
										${ravenImageLg} 800w,
									`

							img.src = ravenImageSm;
						}

						img.classList.remove('lazy');
					}
				});

				if (lazyloadImages.length == 0) {
					document.removeEventListener("scroll", lazyload);
					window.removeEventListener("resize", lazyload);
					window.removeEventListener("orientationChange", lazyload);
				}
			}, 20);
		}

		document.addEventListener("scroll", lazyload);
		window.addEventListener("resize", lazyload);
		window.addEventListener("orientationChange", lazyload);
	}
});