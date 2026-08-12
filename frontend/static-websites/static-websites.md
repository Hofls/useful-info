### Google
* `Google analytics`
  * https://analytics.google.com/analytics
  * Click on "Admin" (bottom left) -> Data collection -> Data streams -> Add stream -> Web
  * Fill site url, get js script, put it in <header> tags of your html page, deploy the page
* `Google search`
  * https://search.google.com/search-console
  * Add website/page to google:
    * Top left -> Add property (property = your website/page) -> URL prefix
    * Ownership (usually ownership is auto verified, thanks to google analytics)
  * Check if url is indexed by google:
    * Open "URL Inspection Tool", insert url

### Free hosting
* Warning! Some social networks can remove posts with links to free webpages (e.g. reddit removes links to netlify.app)
* `Github pages`
  * Domain - username.github.io
* `Netlify`
  * Domain - site-name.netlify.app
  * Manual redeploy:
    * Go to `https://app.netlify.com/sites/INSERT_SITE_NAME_HERE/deploys`
    * Drag-and-drop your site (folder with index.html)
* `Vercel`
  * Domain - site-name.vercel.app
* `Firebase`
  * Domain - site-name.web.app
* `Static.app`
  * site-name.static.app
