!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},t.parcelRequired7c6=o);var a=o("bpxeT"),i=o("2TvXO"),s=o("jGMOa"),c=o("dauUa"),u=o("jxsHo"),l=o("hmUQ5"),d=o("6JpON");function f(){return(f=e(a)(e(i).mark((function t(n){var r,o,a;return e(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),!(r=n.target[0].value)){t.next=16;break}return l.spiner.start(),c.API.setSearchQuery(r),t.next=7,c.API.fetchKeyword();case 7:if((o=t.sent).length){t.next=12;break}return e(d).Notify.warning("💔 Sorry but we can`t find films for this word"),l.spiner.stop(),t.abrupt("return");case 12:(0,u.renderFilms)(o,s.filmBoxRef),a=(0,u.pagination)(c.API.getPage(),c.API.getMax()),(0,u.renderPagination)(a,s.filmBoxRef,u.listClickHandlerMain),l.spiner.stop();case 16:case"end":return t.stop()}}),t)})))).apply(this,arguments)}e(a)(e(i).mark((function t(){var n,r;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l.spiner.start(),e.next=3,c.API.fetchPopularMovies();case 3:n=e.sent,(0,u.renderFilms)(n,s.filmBoxRef),r=(0,u.pagination)(c.API.getPage(),c.API.getMax()),(0,u.renderPagination)(r,s.filmBoxRef,u.listClickHandlerMain),l.spiner.stop();case 8:case"end":return e.stop()}}),t)})))(),s.formRef.addEventListener("submit",(function(e){return f.apply(this,arguments)}));a=o("bpxeT"),i=o("2TvXO");var v={};v=function e(t,n,r){function o(i,s){if(!n[i]){if(!t[i]){var c=void 0;if(!s&&c)return c(i,!0);if(a)return a(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[i]={exports:{}};t[i][0].call(l.exports,(function(e){return o(t[i][1][e]||e)}),l,l.exports,e,t,n,r)}return n[i].exports}for(var a=void 0,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.create=n.visible=void 0;var r=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.createElement("div");return n.innerHTML=e.trim(),!0===t?n.children:n.firstChild},o=function(e,t){var n=e.children;return 1===n.length&&n[0].tagName===t},a=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)};n.visible=a,n.create=function(e,t){var n=function(e,t){var n=r('\n\t\t<div class="basicLightbox '.concat(t.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),a=n.querySelector(".basicLightbox__placeholder");e.forEach((function(e){return a.appendChild(e)}));var i=o(a,"IMG"),s=o(a,"VIDEO"),c=o(a,"IFRAME");return!0===i&&n.classList.add("basicLightbox--img"),!0===s&&n.classList.add("basicLightbox--video"),!0===c&&n.classList.add("basicLightbox--iframe"),n}(e=function(e){var t="string"==typeof e,n=e instanceof HTMLElement==1;if(!1===t&&!1===n)throw new Error("Content must be a DOM element/node or string");return!0===t?Array.from(r(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(t)),i=function(e){return!1!==t.onClose(s)&&function(e,t){return e.classList.remove("basicLightbox--visible"),setTimeout((function(){return!1===a(e)||e.parentElement.removeChild(e),t()}),410),!0}(n,(function(){if("function"==typeof e)return e(s)}))};!0===t.closable&&n.addEventListener("click",(function(e){e.target===n&&i()}));var s={element:function(){return n},visible:function(){return a(n)},show:function(e){return!1!==t.onShow(s)&&function(e,t){return document.body.appendChild(e),setTimeout((function(){requestAnimationFrame((function(){return e.classList.add("basicLightbox--visible"),t()}))}),10),!0}(n,(function(){if("function"==typeof e)return e(s)}))},close:i};return s}},{}]},{},[1])(1);c=o("dauUa"),s=o("jGMOa");var b=o("aNvF6");d=o("6JpON");function p(){return(p=e(a)(e(i).mark((function t(n){var r,o,a,s,u;return e(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n.target.classList.contains("js-films-list")){t.next=2;break}return t.abrupt("return");case 2:return t.prev=2,r=Number(n.target.closest(".movie_card").attributes.getNamedItem("js-id").value),t.next=6,c.API.fetchById(r);case 6:if(o=t.sent){t.next=9;break}throw new Error("❌ Something go wrong, so we can`t load your film");case 9:(a=h(g(o))).show(),_(a),m(r,o),(s=document.querySelector(".trailer-btn")).hidden=!0,(u=o.videos.results).length>0&&(u.every((function(e){return!e.type.includes("Trailer")}))?s.hidden=!0:s.hidden=!1),s.addEventListener("click",(function(){var e=w(x(u.find((function(e){if("Trailer"===e.type)return e}))));e.show(),_(e)})),t.next=24;break;case 20:t.prev=20,t.t0=t.catch(2),e(d).Notify.failure(t.t0.message),console.log(t.t0.message);case 24:case"end":return t.stop()}}),t,null,[[2,20]])})))).apply(this,arguments)}function m(t,n){var r=document.querySelector(".movie__to-watched"),o=document.querySelector(".movie__to-queue");b.storage.checkWatched(t)&&r.setAttribute("js-disabled",""),b.storage.checkQueue(t)&&o.setAttribute("js-disabled",""),r.addEventListener("click",(function(t){t.preventDefault(),t.target.hasAttribute("js-disabled")?e(d).Notify.warning("🎬 Your film has already sucessfully been added"):(b.storage.addFilmToWatch(n),r.setAttribute("js-disabled",""))})),o.addEventListener("click",(function(t){t.preventDefault(),t.target.hasAttribute("js-disabled")?e(d).Notify.warning("🎬 Your film has already sucessfully been added"):(b.storage.addFilmToQueue(n),o.setAttribute("js-disabled",""))}))}function h(e){return v.create(e,{onShow:y})}function g(e){var t=e.poster_path,n=e.original_title,r=e.vote_average,o=e.vote_count,a=e.popularity,i=e.genres,s=e.overview;return'\n  <div class="modal">\n    <button class="button__modal" type="button">\n    </button>\n    <div class="movie__description-card">\n      <div class="div__movie-img" >\n        <img\n          class="movie__img"\n          src="https://image.tmdb.org/t/p/w500'.concat(t,'"\n          alt="info of movie"\n        />\n      </div>\n      <div class="movie__desc">\n        <p class="movie__title">').concat(n,'</p>\n        <table class="movie__characters">\n          <tbody class="character__table">\n            <tr>\n              <td class="character">Vote / Votes</td>\n              <td class="character__item "><span class="vote">').concat(r.toFixed(1),'</span><span class="vote__slash">/</span><span class="vote__grey">').concat(o,'</span></td>\n            </tr>\n            <tr>\n              <td class="character">Popularity</td>\n              <td class="character__item">').concat(a.toFixed(1),'</td>\n            </tr>\n            <tr>\n              <td class="character">Original Title</td>\n              <td class="character__item">').concat(n,'</td>\n            </tr>\n            <tr>\n              <td class="character">Genre</td>\n              <td class="character__item">').concat(i[0].name,'</td>\n            </tr>\n          </tbody>\n        </table>\n        <p class="movie__about">About</p>\n        <p class="movie__about-description">\n        ').concat(s,'\n        </p>\n        <ul class="button__list">\n          <li class="button__item">\n            <button class="movie__to-watched" type="button">\n              add to Watched\n            </button>\n          </li>\n          <li class="button__item">\n            <button class="movie__to-queue" type="button">add to queue</button>\n          </li>\n        </ul>\n        <button class="trailer-btn" type="button">watch trailer</button>\n      </div>\n    </div>\n  </div>')}function _(e){var t=e.element().querySelector("button"),n=function(r){r.preventDefault(),e.close(),t.removeEventListener("click",n)};t.addEventListener("click",n)}function y(e){var t=function(n){if("Escape"!==n.code)return!1;e.close(),document.removeEventListener("keydown",t)};document.addEventListener("keydown",t)}function w(e){return v.create(e,{onShow:y})}function x(e){var t=e.key;return'<iframe\n  width="1141"\n  height="641"\n  src="https://www.youtube.com/embed/'.concat(t,'"\n  frameborder="0"\n  allowfullscreen\n></iframe>\n  <button type="button" class="button__trailer--close"></button>')}s.filmBoxRef.addEventListener("click",(function(e){return p.apply(this,arguments)}))}();
//# sourceMappingURL=index.19d21b0d.js.map
