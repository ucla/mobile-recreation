# m.recreation.ucla.edu

The m.recreation.ucla.edu app is a simple mobile application built on top of the modern web platform. It is an offline-capable app, built on top of jQuery, Modernizr and a modified version of MWF, that queries, caches and presents information from UCLA Recreation.

## Requirements

This application has minimal server-side requirements:

1. The service endpoint must be same-origin as the app.
2. The web server must send `Content-type: text/cache-manifest` for `manifest.appcache`.

## Setup

To set up the application:

1. Download the application from https://github.com/ucla/mobile-recreation
2. Edit `assets/site.js` to point at the endpoint for the RSS feeds
3. Ensure web server sends `Content-type: text/cache-manifest` for `manifest.appcache`

## Mechanics

### Local Storage

This app uses the [Web Storage API](http://www.w3.org/TR/webstorage/). specifically the `localStorage` attribute, to improve response time and reduce network usage. On first load, it will issue a network request to retrieve the page, but on subsequent loads, it will display the cached result and asynchronously update the cache. This leads to faster response times.

### AppCache

This app uses the [AppCache API](http://www.whatwg.org/specs/web-apps/current-work/multipage/offline.html#appcache) to enable offline browsing and improve response times. As long as the user has already visited the page, when they return to the page, the app will be loaded from the local cache rather than over the network.

Note that, when any files within the app are changed, the `manifest.appcache` file must be updated or else user agents will continue to used the cached version. This is most commonly done simply by updating the datetime comment.

### Fast Click

Mobile browsers traditionally wait 300ms after a user touches the screen before firing the click event. This delay exists so double tap events are possible, but it makes the page appear less responsive. This app uses the [FastClick](https://github.com/ftlabs/fastclick) library to remove this delay and improve response times.

## License

The m.recreation.ucla.edu app is open-source software licensed under the BSD 3-clause license. The full text of the license may be found in the `LICENSE` file.

## Credits

The m.recreation.ucla.edu app was written by Eric Bollens <ebollens@ucla.edu> in conjunction with UCLA Recreation and Student Affairs IT. The app is 

The m.recreation.ucla.edu app uses the following third-party packages:

* FastClick - MIT License - https://github.com/ftlabs/fastclick
* jQuery - MIT License - http://jquery.com
* Mobile Web Framework - BSD License - https://github.com/ucla/mwf
* Modernizr - MIT or BSD License - http://modernizr.com

A sincere thanks to all the authors of these fine packages.