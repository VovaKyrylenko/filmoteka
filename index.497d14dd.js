function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequired7c6=r);var i=r("iCfuO"),a=r("9dB6Q"),s=r("KTnyM"),c=r("lm9xO"),l=r("7Y9D8");(async()=>{c.spiner.start();const e=await a.API.fetchPopularMovies();(0,s.renderFilms)(e,i.filmBoxRef);const t=(0,s.pagination)(a.API.getPage(),a.API.getMax());(0,s.renderPagination)(t,i.filmBoxRef,s.listClickHandlerMain),c.spiner.stop()})(),i.formRef.addEventListener("submit",(async function(t){t.preventDefault();const n=t.target[0].value;if(n){c.spiner.start(),a.API.setSearchQuery(n);const t=await a.API.fetchKeyword();if(!t.length)return e(l).Notify.warning("💔 Sorry but we can`t find films for this word"),void c.spiner.stop();(0,s.renderFilms)(t,i.filmBoxRef);const o=(0,s.pagination)(a.API.getPage(),a.API.getMax());(0,s.renderPagination)(o,i.filmBoxRef,s.listClickHandlerMain),c.spiner.stop()}}));var u={};u=function e(t,n,o){function r(a,s){if(!n[a]){if(!t[a]){var c=void 0;if(!s&&c)return c(a,!0);if(i)return i(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[a]={exports:{}};t[a][0].call(u.exports,(function(e){return r(t[a][1][e]||e)}),u,u.exports,e,t,n,o)}return n[a].exports}for(var i=void 0,a=0;a<o.length;a++)r(o[a]);return r}({1:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.create=n.visible=void 0;var o=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.createElement("div");return n.innerHTML=e.trim(),!0===t?n.children:n.firstChild},r=function(e,t){var n=e.children;return 1===n.length&&n[0].tagName===t},i=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)};n.visible=i,n.create=function(e,t){var n=function(e,t){var n=o('\n\t\t<div class="basicLightbox '.concat(t.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),i=n.querySelector(".basicLightbox__placeholder");e.forEach((function(e){return i.appendChild(e)}));var a=r(i,"IMG"),s=r(i,"VIDEO"),c=r(i,"IFRAME");return!0===a&&n.classList.add("basicLightbox--img"),!0===s&&n.classList.add("basicLightbox--video"),!0===c&&n.classList.add("basicLightbox--iframe"),n}(e=function(e){var t="string"==typeof e,n=e instanceof HTMLElement==1;if(!1===t&&!1===n)throw new Error("Content must be a DOM element/node or string");return!0===t?Array.from(o(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(t)),a=function(e){return!1!==t.onClose(s)&&function(e,t){return e.classList.remove("basicLightbox--visible"),setTimeout((function(){return!1===i(e)||e.parentElement.removeChild(e),t()}),410),!0}(n,(function(){if("function"==typeof e)return e(s)}))};!0===t.closable&&n.addEventListener("click",(function(e){e.target===n&&a()}));var s={element:function(){return n},visible:function(){return i(n)},show:function(e){return!1!==t.onShow(s)&&function(e,t){return document.body.appendChild(e),setTimeout((function(){requestAnimationFrame((function(){return e.classList.add("basicLightbox--visible"),t()}))}),10),!0}(n,(function(){if("function"==typeof e)return e(s)}))},close:a};return s}},{}]},{},[1])(1);a=r("9dB6Q"),i=r("iCfuO");var d=r("gSWVZ");l=r("7Y9D8");function f(e){const t=e.element().querySelector("button"),n=o=>{o.preventDefault(),e.close(),t.removeEventListener("click",n)};t.addEventListener("click",n)}function m(e){const t=n=>{if("Escape"!==n.code)return!1;e.close(),document.removeEventListener("keydown",t)};document.addEventListener("keydown",t)}i.filmBoxRef.addEventListener("click",(async function(t){if(t.target.classList.contains("js-films-list"))return;try{const o=Number(t.target.closest(".movie_card").attributes.getNamedItem("js-id").value),r=await a.API.fetchById(o);if(!r)throw new Error("❌ Something go wrong, so we can`t load your film");const i=(n=function({poster_path:e,original_title:t,vote_average:n,vote_count:o,popularity:r,genres:i,overview:a}){return`\n  <div class="modal">\n    <button class="button__modal" type="button">\n    </button>\n    <div class="movie__description-card">\n      <div class="div__movie-img" >\n        <img\n          class="movie__img"\n          src="https://image.tmdb.org/t/p/w500${e}"\n          alt="info of movie"\n        />\n      </div>\n      <div class="movie__desc">\n        <p class="movie__title">${t}</p>\n        <table class="movie__characters">\n          <tbody class="character__table">\n            <tr>\n              <td class="character">Vote / Votes</td>\n              <td class="character__item "><span class="vote">${n.toFixed(1)}</span><span class="vote__slash">/</span><span class="vote__grey">${o}</span></td>\n            </tr>\n            <tr>\n              <td class="character">Popularity</td>\n              <td class="character__item">${r.toFixed(1)}</td>\n            </tr>\n            <tr>\n              <td class="character">Original Title</td>\n              <td class="character__item">${t}</td>\n            </tr>\n            <tr>\n              <td class="character">Genre</td>\n              <td class="character__item">${i[0].name}</td>\n            </tr>\n          </tbody>\n        </table>\n        <p class="movie__about">About</p>\n        <p class="movie__about-description">\n        ${a}\n        </p>\n        <ul class="button__list">\n          <li class="button__item">\n            <button class="movie__to-watched" type="button">\n              add to Watched\n            </button>\n          </li>\n          <li class="button__item">\n            <button class="movie__to-queue" type="button">add to queue</button>\n          </li>\n        </ul>\n        <button class="trailer-btn" type="button">watch trailer</button>\n      </div>\n    </div>\n  </div>`}(r),u.create(n,{onShow:m}));i.show(),f(i),function(t,n){const o=document.querySelector(".movie__to-watched"),r=document.querySelector(".movie__to-queue"),i=t=>{t.preventDefault(),t.target.hasAttribute("js-disabled")?e(l).Notify.warning("🎬 Your film has already sucessfully been added"):(d.storage.addFilmToWatch(n),o.setAttribute("js-disabled",""))},a=t=>{t.preventDefault(),t.target.hasAttribute("js-disabled")?e(l).Notify.warning("🎬 Your film has already sucessfully been added"):(d.storage.addFilmToQueue(n),r.setAttribute("js-disabled",""))};d.storage.checkWatched(t)&&o.setAttribute("js-disabled","");d.storage.checkQueue(t)&&r.setAttribute("js-disabled","");o.addEventListener("click",i),r.addEventListener("click",a)}(o,r);const s=document.querySelector(".trailer-btn");s.hidden=!0;const c=r.videos.results;c.length>0&&(c.every((e=>!e.type.includes("Trailer")))?s.hidden=!0:s.hidden=!1),s.addEventListener("click",(()=>{const e=function(e){return u.create(e,{onShow:m})}(function({key:e}){return`<iframe\n  width="1141"\n  height="641"\n  src="https://www.youtube.com/embed/${e}"\n  frameborder="0"\n  allowfullscreen\n></iframe>\n  <button type="button" class="button__trailer--close"></button>`}(c.find((e=>{if("Trailer"===e.type)return e}))));e.show(),f(e)}))}catch(t){e(l).Notify.failure(t.message),console.log(t.message)}var n}));
//# sourceMappingURL=index.497d14dd.js.map
