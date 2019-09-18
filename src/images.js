import bioImage from './images/bio.jpeg';

// jjd images
import jjdImageSm from './images/projects/jjd-sm.png';
import jjdImageMd from './images/projects/jjd-md.png';
import jjdImageLg from './images/projects/jjd-lg.png';
import jjdImageSmPlaceholder from './images/placeholders/jjd-sm-ph.png';
import jjdImageMdPlaceholder from './images/placeholders/jjd-md-ph.png';
import jjdImageLgPlaceholder from './images/placeholders/jjd-lg-ph.png';

// usdt images
import usdtImageSm from './images/projects/usdt-sm.png';
import usdtImageMd from './images/projects/usdt-md.png';
import usdtImageLg from './images/projects/usdt-lg.png';
import usdtImageSmPlaceholder from './images/placeholders/usdt-sm-ph.png';
import usdtImageMdPlaceholder from './images/placeholders/usdt-md-ph.png';
import usdtImageLgPlaceholder from './images/placeholders/usdt-lg-ph.png';

// raven images
import ravenImageSm from './images/projects/raven-sm.png';
import ravenImageMd from './images/projects/raven-md.png';
import ravenImageLg from './images/projects/raven-lg.png';
import ravenImageSmPlaceholder from './images/placeholders/raven-sm-ph.png';
import ravenImageMdPlaceholder from './images/placeholders/raven-md-ph.png';
import ravenImageLgPlaceholder from './images/placeholders/raven-lg-ph.png';

// Favicon Images
import SmallFav from './images/icons/favicon-16x16.png';
import LargeFav from './images/icons/favicon-32x32.png';
import Fav from './images/icons/favicon.ico';


// =========Code Below


// Select images
let biopic = document.querySelector("#biopic");
let jjdpic = document.querySelector("#jjd");
let usdtpic = document.querySelector("#usdt");
let ravenpic = document.querySelector("#raven");

const sizes = `
		(max-width: 400px) 300px,
		(max-width: 750px) 600px,
		900px,
	`

// mount placeholders
export function mountImages() {
	biopic.src = bioImage;

	jjdpic.sizes = sizes;
	usdtpic.sizes = sizes;
	ravenpic.sizes = sizes;

	jjdpic.srcset = `
		${jjdImageSmPlaceholder} 350w,
		${jjdImageMdPlaceholder} 550w,
		${jjdImageLgPlaceholder} 800w,
	`

	jjdpic.src = jjdImageSmPlaceholder;

	usdtpic.srcset = `
		${usdtImageSmPlaceholder} 350w,
		${usdtImageMdPlaceholder} 550w,
		${usdtImageLgPlaceholder} 800w,
	`

	usdtpic.src = usdtImageSmPlaceholder;

	ravenpic.srcset = `
		${ravenImageSmPlaceholder} 350w,
		${ravenImageMdPlaceholder} 550w,
		${ravenImageLgPlaceholder} 800w,
	`

	ravenpic.src = ravenImageSmPlaceholder;
}


// Intersection Observer to lazyload images
document.addEventListener( "DOMContentLoaded", function() {
	let lazyloadImages;

  if ("IntersectionObserver" in window) { //Not supported by IE
		lazyloadImages = document.querySelectorAll(".lazy");
		
    let imageObserver = new IntersectionObserver( function( entries, observer ) {
      entries.forEach( function( entry ) {
        if ( entry.isIntersecting ) {
					let image = entry.target;

					if( image.id === "jjd" ) {
						image.srcset = `
							${jjdImageSm} 350w,
							${jjdImageMd} 550w,
							${jjdImageLg} 800w,
						`

						image.src = jjdImageSm;
					}
					else if ( image.id === "usdt") {
						image.srcset = `
							${usdtImageSm} 350w,
							${usdtImageMd} 550w,
							${usdtImageLg} 800w,
						`

						image.src = usdtImageSm;
					} else {
						image.srcset = `
							${ravenImageSm} 350w,
							${ravenImageMd} 550w,
							${ravenImageLg} 800w,
						`

						image.src = ravenImageSm;
					}

          image.classList.remove("lazy");
					imageObserver.unobserve( image );
        }
      });
    }, { rootMargin: "0px 0px -20% 0px" } );

    lazyloadImages.forEach( function( image ) {
      imageObserver.observe( image );
		});
		
  } else {  
    let lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    
    function lazyload () {
      if( lazyloadThrottleTimeout ) {
        clearTimeout( lazyloadThrottleTimeout );
      }

      lazyloadThrottleTimeout = setTimeout( function() {
				const scrollTop = window.pageYOffset;

        lazyloadImages.forEach( function( img ) {
            if( img.offsetTop < ( window.innerHeight + scrollTop ) ) {
								if( img.id === "jjd" ) {
									img.srcset = `
										${jjdImageSm} 350w,
										${jjdImageMd} 550w,
										${jjdImageLg} 800w,
									`
			
									img.src = jjdImageSm;
								}
								else if ( img.id === "usdt") {
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
				
        if( lazyloadImages.length == 0 ) { 
          document.removeEventListener( "scroll", lazyload );
          window.removeEventListener( "resize", lazyload );
          window.removeEventListener( "orientationChange", lazyload );
        }
      }, 20);
    }

    document.addEventListener( "scroll", lazyload );
    window.addEventListener( "resize", lazyload );
    window.addEventListener( "orientationChange", lazyload );
  }
});

export function mountFavicons() {
	if( !document.getElementById('favicon-small') ) {
		let faviconSmall = document.createElement('link');
		faviconSmall.id = 'favicon-small';
		faviconSmall.rel = 'shortcut icon';
		faviconSmall.type="image/png";
		faviconSmall.sizes="16x16";
		faviconSmall.href = SmallFav;
		document.head.appendChild(faviconSmall);
	}

	if( !document.getElementById('favicon-large') ) {
		let faviconLarge = document.createElement('link');
		faviconLarge.id = 'favicon-small';
		faviconLarge.rel = 'shortcut icon';
		faviconLarge.type="image/png";
		faviconLarge.sizes="16x16";
		faviconLarge.href = LargeFav;;
		document.head.appendChild(faviconLarge);
	}

	if( !document.getElementById('favicon') ) {
		let favicon = document.createElement('link');
		favicon.id = 'favicon-small';
		favicon.rel = 'shortcut icon';
		favicon.type="image/png";
		favicon.sizes="16x16";
		favicon.href = Fav;
		document.head.appendChild(favicon);
	}
}