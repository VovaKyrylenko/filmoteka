function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequired7c6=a);var i=a("iCfuO"),s=a("9dB6Q"),r=a("KTnyM"),l=a("lm9xO"),c=a("7Y9D8");(async()=>{l.spiner.start();const e=await s.API.fetchPopularMovies();(0,r.renderFilms)(e,i.filmBoxRef);const t=(0,r.pagination)(s.API.getPage(),s.API.getMax());(0,r.renderPagination)(t,i.filmBoxRef,r.listClickHandlerMain),l.spiner.stop()})(),i.formRef.addEventListener("submit",(async function(t){t.preventDefault();const n=t.target[0].value;if(n){l.spiner.start(),s.API.setSearchQuery(n);const t=await s.API.fetchKeyword();if(!t.length)return e(c).Notify.warning("💔 Sorry but we can`t find films for this word"),void l.spiner.stop();(0,r.renderFilms)(t,i.filmBoxRef);const o=(0,r.pagination)(s.API.getPage(),s.API.getMax());(0,r.renderPagination)(o,i.filmBoxRef,r.listClickHandlerMain),l.spiner.stop()}}));var d=a("9B8F0"),u=(s=a("9dB6Q"),i=a("iCfuO"),a("gSWVZ"));c=a("7Y9D8");async function f(t){if(!t.target.classList.contains("js-films-list")){i.filmBoxRef.removeEventListener("click",f);try{const o=Number(t.target.closest(".movie_card").attributes.getNamedItem("js-id").value),a=await s.API.fetchById(o);if(!a)throw new Error("❌ Something go wrong, so we can`t load your film");const r=(n=function({poster_path:e,original_title:t,vote_average:n,vote_count:o,popularity:a,genres:i,overview:s}){return`\n  <div class="modal">\n    <button class="button__modal" type="button">\n    </button>\n    <div class="movie__description-card">\n      <div class="div__movie-img" >\n        <img\n          class="movie__img"\n          src="https://image.tmdb.org/t/p/w500${e}"\n          alt="info of movie"\n        />\n      </div>\n      <div class="movie__desc">\n        <p class="movie__title">${t}</p>\n        <table class="movie__characters">\n          <tbody class="character__table">\n            <tr>\n              <td class="character">Vote / Votes</td>\n              <td class="character__item "><span class="vote">${n.toFixed(1)}</span><span class="vote__slash">/</span><span class="vote__grey">${o}</span></td>\n            </tr>\n            <tr>\n              <td class="character">Popularity</td>\n              <td class="character__item">${a.toFixed(1)}</td>\n            </tr>\n            <tr>\n              <td class="character">Original Title</td>\n              <td class="character__item">${t}</td>\n            </tr>\n            <tr>\n              <td class="character">Genre</td>\n              <td class="character__item">${i[0].name}</td>\n            </tr>\n          </tbody>\n        </table>\n        <p class="movie__about">About</p>\n        <p class="movie__about-description">\n        ${s}\n        </p>\n        <ul class="button__list">\n          <li class="button__item">\n            <button class="movie__to-watched" type="button">\n              add to Watched\n            </button>\n          </li>\n          <li class="button__item">\n            <button class="movie__to-queue" type="button">add to queue</button>\n          </li>\n        </ul>\n        <button class="trailer-btn" type="button">watch trailer</button>\n      </div>\n    </div>\n  </div>`}(a),d.create(n,{onShow:v,onClose:()=>{document.body.style.overflow="",i.filmBoxRef.addEventListener("click",f)}}));r.show(),document.body.style.overflow="hidden",m(r),function(t,n){const o=document.querySelector(".movie__to-watched"),a=document.querySelector(".movie__to-queue"),i=t=>{t.preventDefault(),t.target.hasAttribute("js-disabled")?e(c).Notify.warning("🎬 Your film has already sucessfully been added"):(u.storage.addFilmToWatch(n),o.setAttribute("js-disabled",""))},s=t=>{t.preventDefault(),t.target.hasAttribute("js-disabled")?e(c).Notify.warning("🎬 Your film has already sucessfully been added"):(u.storage.addFilmToQueue(n),a.setAttribute("js-disabled",""))};u.storage.checkWatched(t)&&o.setAttribute("js-disabled","");u.storage.checkQueue(t)&&a.setAttribute("js-disabled","");o.addEventListener("click",i),a.addEventListener("click",s)}(o,a);const l=document.querySelector(".trailer-btn");l.hidden=!0;const b=a.videos.results;b.length>0&&(b.every((e=>!e.type.includes("Trailer")))?l.hidden=!0:l.hidden=!1),l.addEventListener("click",(()=>{const e=function(e){return d.create(e,{onShow:v})}(function({key:e}){return`<iframe\n  width="1141"\n  height="641"\n  src="https://www.youtube.com/embed/${e}"\n  frameborder="0"\n  allowfullscreen\n></iframe>\n  <button type="button" class="button__trailer--close"></button>`}(b.find((e=>{if("Trailer"===e.type)return e}))));e.show(),m(e)}))}catch(t){e(c).Notify.failure(t.message),console.log(t.message)}var n}}function m(e){const t=e.element().querySelector("button"),n=o=>{o.preventDefault(),e.close(),t.removeEventListener("click",n)};t.addEventListener("click",n)}function v(e){const t=n=>{if("Escape"!==n.code)return!1;e.close(),document.removeEventListener("keydown",t)};document.addEventListener("keydown",t)}i.filmBoxRef.addEventListener("click",f);
//# sourceMappingURL=index.98d8dcdf.js.map
