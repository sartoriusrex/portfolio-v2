document.addEventListener( "DOMContentLoaded", function() {
	let captchaDiv;

  if ("IntersectionObserver" in window) { //Not supported by IE
		captchaDiv = document.querySelectorAll(".captcha");
		
    let captchaObserver = new IntersectionObserver( function( entries, observer ) {
      entries.forEach( function( entry ) {
        if ( entry.isIntersecting ) {
					let captcha = entry.target;

					captcha.setAttribute("data-netlify-recaptcha", "true");

          captcha.classList.remove("captcha");
					captchaObserver.unobserve( captcha );
        }
      });
    }, { rootMargin: "0px 0px -20% 0px" } );

    captchaDiv.forEach( function( captcha ) {
      captchaObserver.observe( captcha );
		});
		
  } else {  
    let lazyloadThrottleTimeout;
    captchaDiv = document.querySelectorAll(".captcha");
    
    function lazyload () {
      if( lazyloadThrottleTimeout ) {
        clearTimeout( lazyloadThrottleTimeout );
      }

      lazyloadThrottleTimeout = setTimeout( function() {
				const scrollTop = window.pageYOffset;

        captchaDiv.forEach( function( captcha ) {
            if( img.offsetTop < ( window.innerHeight + scrollTop ) ) {
							captcha.setAttribute("data-netlify-recaptcha", "true");

              img.classList.remove('captcha');
            }
				});
				
        if( captchaDiv.length == 0 ) { 
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