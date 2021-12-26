module.exports = function (title) {
  return `
<!DOCTYPE html>
<!--[if lte IE 6]><html class="preIE7 preIE8 preIE9"><![endif]-->
<!--[if IE 7]><html class="preIE8 preIE9"><![endif]-->
<!--[if IE 8]><html class="preIE9"><![endif]-->
<!--[if gte IE 9]><!-->
<!--<![endif]-->
<html lang="en">

<head>
  <!-- <meta name="google-site-verification" content="Ka6qs-uMvV9A-99I-JpknP4nlvchqQj5K4Mb15ec_q8" />

  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-146139306-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'UA-146139306-1');
    gtag('require', 'linkid');
  </script> -->
  <script type="application/ld+json">
      {
        "@type": "Person",
        "name": "The Dennis Mai",
        "description": "Dennis Mai, trying to make the web weirder, more original, more niche, more 90s. This is his personal and authentic web garden.",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "dmai.developer@gmail.com"
        }
      }
    </script>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="author" content="Dennis Mai">

  <title>${title}</title>


  <link id="favicon" rel="shortcut icon" type="image/png" sizes="16X16" href="images/favicon.ico">
  <link id="favicon-large" rel="shortcut icon" type="image/png" sizes="32X32" href="images/favicon32x32.png">
  <link id="favicon-small" rel="shortcut icon" type="image/png" sizes="16X16" href="images/favicon16x16.png">
  <link rel="stylesheet" href="/css/styles.css" type="text/css">
</head>  
  `
}
