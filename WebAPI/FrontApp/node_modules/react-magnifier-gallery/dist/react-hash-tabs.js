(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactHashTabs"] = factory(require("react"));
	else
		root["ReactHashTabs"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(6)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAC7lBMVEUAAAAAAAB/f39VVVU/Pz9mZmZVVVVISEg/P19UVFRMTExFRUVVVVVOTk5ISEhVVVVPT09LS0tUVFRQUFBMTExISFRRUVFNTU1KSlVRUVFOTk5LS0tRUVFMTExKSlJPT09NTU1LS1JQUFBNTU1LS1JQUFBOTk5MTFJQUFBOTk5NTU1LS1FPT09NTU1LS1FPT09OTk5MTFFQUFBOTk5MTFFQUFBOTk5NTVFMTFBPT09NTVJMTFBPT09OTk5MTFBPT09OTk5NTVFMTE9OTk5NTVFMTFBPT09NTVFMTFBPT09OTlFNTVBPT09OTk5NTVBMTE9OTk5NTVBMTE9OTk5OTlFNTVBPT09NTVBPT09OTlFNTVBMTE9OTk5NTVBNTU9OTk5OTlBNTU9PT09OTlBNTVBPT09OTlBNTVBMTE9OTlFNTVBNTU9OTlFOTlBNTU9OTk5OTlBNTU9MTE9OTlBNTU9NTU9OTlBNTVBNTU9OTlBOTlBNTU9OTlBOTlBNTU9NTU9OTlBNTU9NTU9OTlBOTk9NTU9OTlBOTlBNTU9OTlBOTlBNTVBOTlBMTE9NTU9OTlBOTk9NTU9OTlBOTk5NTU9NTVBOTk5NTU9NTVBOTlBMTE9NTVBOTlBOTk9NTVBOTlBOTk5NTU9NTVBOTk5MTE9NTVBOTk5OTk9NTVBOTlBOTk9NTVBOTlBOTk9MTFBNTVBOTk5MTE9NTVBOTk5OTk9NTVBOTk5OTk9MTFBOTlBOTk9MTFBNTVBOTk5MTFBNTVBOTk5OTk9MTFBOTk5OTk9MTFBNTU5OTk9MTFBNTVBOTk9NTVBOTk5MTFBOTk5OTlBMTFBNTU5OTk9MTFBNTU5OTk9OTlBMTE5OTk5OTlBMTFBOTk5OTlBMTFBNTU5OTlBMTFBOTk9OTlBMTE5OTk5OTlBMTE5NTU5OTlBMTFBMTE5OTlBMTFBMTE5OTlBOTlBMTE5OTk9OTlBMTE5MTE5OTlBMTE5MTE5OTlBOTlC1GccoAAAA+XRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc/Q0tPU1dbX2Nna29zd3t/g4eLj5OXn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7m0JnKAAAVWElEQVR42u2d+WNU5bnHH7ICQtgJIJXUBVFAguKu5ELAEjYVKsgiGNa6oYhctaJA2JRqBUW93EJlqS3cAg2ChE1FNoEQ0BTttQIXSFiSTDbIZOb57f6QCFkmk1nO8r7n+X7+gnmf72fOOe9OJIWoDon9R0yeuWDZ2vQd+46eOH0+z1V82e31ui8Xu/LOnz5xdN+O9LXLFsycPKJ/YocoAg6hdeKQZxat3f39BS8HgffCd7vWLHxmSI9WqKCmRCT0m7p44/FiDpPiYxsWT0nuFIGK6hP9zY++vuZoKRtKSebq14beDA0Up2GvSR8dLGHTKN7/4cS7YlFnJf/33SYuz3KzBbizlk/oimeBSsSlzN/lYktx7Zw3oCkqrwCtHn33SDnbQvnhPwxtiQRspFH/d4562Va8mYuSGyIJO+j+yvZSVoKSjBldkYe1X/spH55kpfh56W/QO7Dqrf/0piJWkKKN4/BFYDrtpu5ws7K4Mya3RUbm0fbZrz2sOJ6vftcGSZlB06e2lbMWuLeOaYK8jCVy0N9KWCOK/5oSidQMo8vbZ1k7ziy8BckZ8uifdIA1Ze8EvArCHu5ZVsgaU/ABhojCIHb0XtaePaMwQhQaHeadZ0eQO7c90gyaXmvK2DFcWXUnEg2GiOH72GF88zjWkAT86p/0AzuQf6bGINsAiJt5lh3KmZexiKg+Wqbls4PJm9MCGfuh1XwXO5yCuVCgLlovKGQBFKRh2YDPd/8cEfEzMxfMwhBxTRq+fIEFkTsNw4NViZp4moVxMhXzxVcZ9D0L5PgAJE9ERD12slAyuiF96rDCw2LxLG8nPP6YV4tYNK4Z0ZLzT/mBxZPdX2z8N6YjfmbmDZ1kPv1nXUb2FZS8JvA90DsbwVfpEj4gbdZnBUKvhvcTUXNET55H5DU591sx8bffhLh9sT5eRv7j8pC1by6MFhD/9VsQdN2kO34B+chLSNkfF539JdDiM0RcH6ubOzf/R84g3/o53deh8cf+EeEGNiaw2JEbCDpnItpAOXyT8/IfX4RcA8fltA5h07UINTg+ddTC4e6Y9w+a7Nuck/9TJcgzeIpGOST+hssRZmgsc8TmgQR8/YfeG7hB//yTLyLH0DmfpHv+08uRYji4n9f79b8KEYbLCo0/BK4/jPzC56C2U8Q9MfdjCKfu0DP/x4qRnTEUDtYx/5leJGcUnpe0iz/qvxGbkXyk2WkCTbYiM2NJb6xT/vH4/De+M6DRTTS3/IS8jOfHG3XJ/27s+zGF3Lv0yL9vIbIyB5cWMwOPYde3aZQO0WDtH2Z/TMQ9RvX8X8Twj6l4n1M7/1cRkdm8rHL+byIf83ld3fznIh0rmK1q/ouQjTXMR/4wQD3SkIt1vKVe/rOQiugvQfT/LGaGYuM/SMRqlBoRGo/xP+vHBBXaQf44xv9twK3MzFAy5v9soVSR2eF7MP9vEy4lVojccgFJ2EWuAqvE4n9CDvbxo+0rRZscRgp2ctDm1eJRWP9vM+n27hjB/h/bWWZn/jNRf/t50cYFwBgAVADPILvy74n930pQaNP5Adfj/AdFOGXLBbSN0AFUhgN2nCOE858U4k/W5/8Sqq4Slq8OSMYMsFK4e1ubfwLO/1SM3F9ZmX9DnP+rHIesvGdmOeqtHh9al/84VFtFnrQq/+64/0FJiiy6YyQO978oSrY19wzh/idlWWnJHgDUWV0suGboVtz/pzAu02+cjMUIgNqjAdEmC4D7fxXnHXPz7481QIrj7WNm/i2xBkR5TjUzUYDPUF/1WWVe/iNRXR0YbtoiwEsorg5cMOuasS2orR5sMif/p1BZXTBlXrA9XgD6vATamiDAJtRVH9YZn/+TqKpODDM6/1a4B0grzjU3WIA/oaZ6YfCu8d6oqGZ47zUy/5hsVFQ3sqIMFAAnQWvITOPyvxEnQWpIsXF7hf6BaooeDEhBLfWkr0FfgNgHoCnfGfMd+J+opK4YcoBYB3vXgSd9iRxDpiDeAAFW2NsGIigQOh+Fn38Pj90CQIHQKb89bAF2sv0CEPXejTBDYmu4+Q9iJQSAAqHSP7z8o7JVEQAKhMax8E4Tn8jqCAAFQmJcWIdB/Z9SAkCBEPg5nMOjprNiAkCB4Hk+jMNgLqgnABQIlpzQD46ZzSoKAAWC5Peh5t+6UFEBiB7ehVwDpqBFiAIsYGUFgALBMCfEleCFKgsABQInP7Q14vNZbQGgQMDMDuk0EJfyAkABMx8BaayBAFAgMN4MYQwgXw8BoEAgXAp+LECVOyED+a1QoF5eCvpAyLMaCUD00E5k7JfTwR4gOYm1EgAK1Mf44PKP+EE3AaCAf7IbBCXAcNZPACjgl6FBCbBXSwGggB++CqaOvVhTAaBA3SQGUcU1+goABeriz0FsBirTWQAo4JsrgW8Tmsd6C0D04A4EXouAp4Riz2svABTwQU6gy0NHswMEgAK1GaldHzAsAaBAiD3B7uwUAaBADQK7WnSZgwSAAtV4P5CKNS10lABQoAr5jXWaBzRKAChwjUA2Cu53ngBED2xH+AF+BnZhJwoABSqp/2rZtx0qABRgZua0ek+EOOtYAaAAM5+OUP1IGDMFgALMj9RTob85WwAosLqeQYASpwsgXYFC/0MB6t0NSAQFDMX/jNA2EQIQ3Z8hVoB0f3VpWy5EAMEKlLX0U5VnWYwAchWY7KcmX0sSQKoCO+suSLxHlgAyFShvXWc5prI0AUQqkFpnMXYIFECgAlvqPBXKLVIAcQpcqevAmKdZqABE922TZMCYOqqwSa4AshRY77sEDYslCyBJAZfv40JSWLYAghRI9tn8D8ULIEaB93w2/iQEkKLAv9TfEGSbADIU6OKj3a9AADkKTPPR6u0Q4Br3fiFuMLBhKQSQo0Bx7aMC+jEEEKRAUq3mvgMBJCkwr1Zjj0IASQocqjUT6IUAkhTwNKvRzkcZAohSYGCNVr4LAWQp8HaNNh6BAP64Z6vTBDhQvYFxHgggSwH3dRpMBaskgOMU6FetcfMhgDQFqh8cuwsCSFMgo2q7IgohgDQF8qveIdONIYA4BaquCZgIAeQpUPUeseUQIDju3qK/AB9XaU8WBJCnwNEqi0HcEECeAmXXFoX0YgggUIGeVxsyCQJIVODaNvFlEECiAkuvNuIgBJCowN6r44AlEECiAkW/jAXezBAgTHp9rqMBCaovB9NHAD0VGFT521+DADIVeKXyl6+BADIVWFn5uzMhgEwFKjcHRJRCAJkKVHYDEhgCCFWgIxGpuy1UVwE0UqBii+hUCGC8Apu1EGACEREthgAmcJcOCiwkIqKNEECqAhUnRh6HAFIVqFgUVAwBpCrgIiJqzRBArALNiSgRAshVoBsRDYEAchUYSETPQAALFEhXs7pTiGgRBLCCO5VUYD4RrYUAchVYRUS7IYBcBXYQ0fcQQK4CWUR0AQLIVSCHKMoLAeQq4ImgDgwBBCvQVvWBQEcKQHTnP5QZCuwPAWyhpxoK9KEREECyAsNoMgSQrEAqzYQAkhWYTgsggGQF0pQ+HEKCADYrsFT1uSABAtiqwGpKhwAqKLDJpvJupB0QQLICGbQPAkhWYI+y18XJE8AWBY7QCQggWYFsOg0BlCLRWgVO0nkIIFmBHMqDAJIVuEguCKCiAlZt2c5XfGuoVAEsU6CILkMAyQqUkhsCSFagjLwQQLICXggguz/gxStAdnewDB+BskcDStENlD0YVISBINljgfkYCpY+FIzJIOGTQZgOFj4djAUhKmH5+uBsLAmTHD/zESwKlRw/8x4sC5ccP3MGNoZIjp95I7aGSY6feTU2h0qOn3kptodLjp95Lg6IsBXbzwubjiNiJMfPnIpDoiTHzzwMx8RJjp+5Dw6KlBw/czccFSs5fua2OCxacvxcHoHj4gXHz5xDRN9BAOtQ7f6wLCLaBQGkxs+8nYjWQACp8TN/SkQLIYDU+JnnES6OFBx/xcWRuDpWbPzMKUTUAwJIjb/i8uhWEEBq/MzNiEjx7aF6x9/rc6WL6yIiomMQQGb8zJlERLQBAsiMn3kdEREthgAy42deQEREUyCAzPiZU4mIKBkCyIyfOYmIiDpBAJnxM3ckIqKIEgggMn4ubFDxmzMhgFHcvYU14tvKX70aAkiMn3ll5e9+DQJIjJ95RuUvHwoBJMbPPLDyt98MASTGz5xQ+esjiiGAwPivdgKIDkAAefEzf3O1CcsggLz4mZdcbcQkCBAi92xlfXn62qoVCCAvfubEqw2JdUMAcfFzWcy1tmRBAGnx/7IcqILlEEBa/MwfV2nPBAggLX7m8VVa1BUCSIufuUuVNkW4IICw+DmvQdVm7YQAAXHvF+wUtlVr2DwIICt+5tnVmjYAAsiKnzm5WuPiyiGAqPi5rHH19h2GAJLiZ95fo4V/gACS4mdeVKONQyGApPgrjoaoSksvBBAUP3viajY0EwL4in8bO5NvazV1EQSQEz9zWq3GJkMAOfEz967V3IalEEBM/FwYU7vFGRDgGvc5On7mzT7aPAMCSImf+QUfre4KAaTEz9zZV8N/hgBC4ucffDZ9KQSg+zJYAu/6bPxvxAsgJH7mvj6bH1skWwAx8XNBtO8KbJQsgJz4fzkfsjbj5Apwv6D4mUfXUYWWbqECyIqfrzSrqxAZIgUQFj/z53WWYrJAAcTFX3VbeE3iPdIEuH+7uPjZ3bLuenwlSwCJ8VfcFVgXv5MkgMz4mSf6qUkbtxgBpMbPV1r4K8tWIQI8IDV+5k1+CzNGhACC42ce4bc0TUqcL4Do+Lmwkf/q/NXpAsiOn3lVPfVJcbYAD+xg4fSrp0KRZxwsAOLnkxH1FWmhYwVA/Mw8p94ydXaoAIifmdn76/ortdeJAjyI+JmZeXcAtZrgPAEQ/y+MDaBaTVwOEwDxXyWvUSAF+8BRAiD+KrwXUMm6OkiAB3ci9SrcGljV9jhFAMRfnS8DrNsoZwiA+GsyIsDKxeY6QADEX4tz0YEWb672AjyE+GvzVsDla1+mtwCI3xeX4wOv4GqdBUD8vlkZRA3v1FcAxF8XdwRTxm80FeChXQi6DnYHVcjHtRQA8fthcFACRJzQTwDE74/jDYJ7lk7QTQDE75+ngvyWijmjlQAPI37/nIoO9mt6hkYCIP56mRZ0b7ppni4CIP76uXhd8OMpc/QQAPEHwhshjKe2KNBAgId3I9wAuBQXyoj6XOUFQPwBMiukGbWWBWoLgPgDJa9ZaHOqaSoLgPgD580Q11Qo8Qjw/dN6I/4gHgDNQ11VM0tRARB/ULwa8qq6JrkqCoD4g+Ns49DXVU5TTwDEHyzPhLGuOvaUYgL0/hKBBslP0WEIQKlKCYD4Q2BsOPlT5HF1BED8oXA0IiwBaIAqAiD+0Ogb7ubKDCUESEL8obE57M3V3T32C4D4Q8XdJfzt9cvtFgDxh84HBhyv0c7eAyMQfxjktTHigJUZKKSuPG/IAUvR/0Ql9SQr0pgjtvqjlHrS26gz9jagljrymWFnbHYqQTX1o6ijcaesvoZy6sd0A09Zjj6OeupGZqSBAtADXlRULzy9jD1o/xOUVC+WGHzRRotzqKlOnIkzWAB6AkXViSFkOP+DqurDX4zPn+Ivoq66kNvaBAFoNAqrCyPIFNJRWT34uzn5U3u8BLTgfLxJAqAnoAePkWmsQXXVZ4V5+VPz06iv6vw7zkQBqC/mBBTH8zCZymKUWG0WmJs/xRxGjVVmf5TJAtBNhaiyuuR3ItMZgzKrywiygE9RZ1VZbkX+1CQblVaT440tEYBuL0atVaSwM1kE5gWV5AmyjI9QbfV437r8KRajAeqNAERbKADdcB4VV4tzHclS/sONmqtE2YNkMc+j6CoxlSxnBaquDp9Ynz/FHkTdVWFfjA0CUHusDlGEn9uSLfQoQu1VwNWVbGKwB9W3n/IBZBvTUX77eY5sBGPCtrPEzvwpEruFbGZDhK0CUGN0Bu3tADYim2nzI1KwjxOtyHZuykUOdnEugRTgLheSsIf8RFKCpFJkYQclD5EiDMHcsA2UpZAyjMWWQcvxjCSFeA6BWM1UUgrcKmEx00gxXkcmVjKTlGM2UrGOWaQg85GLVcwlggHIH28BobxByoIvQZnff+gNSu7/1RgRwpigueN/U0lxxmBewETKRpLyDMHcoGmUpJAGJGF9gEnkP0RacBfWCJnCuUTShBuxTtAETiSQNrTBWmHD2duKNKIx9gsYzIZGpBWR2DNkKEsiSDdexM5Rwyh/ljRkMI6VNgjXANKSO04hOyP4uStpSjt0BgxgXzxpSyxOkgqb/4ohnXkOc0NhUTaVNCcJZ4qGM/r7IGnPDYeQY6gc6EgOIPZDJBka70eTMxiF8+RC6f0/QY7hNtwyEzTHOpODaLISiQbH8sbkLEZhnVAQ5I8gx3ETegMBsz+BHEj0YiwZDwjPgihyJn0wOxQA/36YHEuzVci3PlY0JScz/AIi9kfuo+Rw2m9CynXz93hyPk/iIVDX3/8JEkHbdcjaF39pTVIYfg5x1+TMUBJE848wJlC9778kjmRx3zGkfo3MXiSOqJnFCL6CoumRJJFfrUf2zMyfdSSp9P0e8WclkWCiXyqQHX/e85Ekm/iPy+XG7/6gDYHbv5Ca/+ZbkT4RET0iskt4tC+S/4XI8Selxf/T2AjkXoXYF0SdLHX2mRhkXoMmvxfTIch7tTHy9kGLOSIUyHuzObKuS4HZ+U6P/9KsZsjZ3zThm5ecHP/FN+KQcX3fAi+ddmr8p164DvkGMj483pFbCY+PjUa2AdJg6FdOi3/34AbINRgS/3zFOelfXnEHEg2adrNznBH/ubfikWZIxIx0wJtg9wi8+sPgtve1HhnIew8TfuHSeNzXmqbv3T22EfIzgpvSNBwaODnn10jOMCIeWa3VQVOFq/phttfoV8HI9DI90r+yaQQe/abQcvJO5RcQurdPbIGkzKN16laFnwNXPh/fChmZTfMx65U8caxg3WjM9Fo1QpT8x/9VK/0f3+2L8R5r6TJtiyKbC4s2v9AZedjyIEiad8jmq6k836b1xl/fTpoNfPuATZdSuPcvSsFbXwWu6zc7w+Ipg7xts5OxvEclGnQZ//FRS3qIZZkfj++C1R1KEtszdeleE8eMC79Z8nQitnSo/ixIGPTKykMGa1D47coZAzvhf6+RBh2TJixcfzTsISNX5roFqUkdEb2244bdBk6Zv2pHVk5Q/UVPTtb2T+dNSemGr3zHENG2W59hqdPTlq7emLHnSPbJnIv5RaVlXm9ZaVH+xZyT2Uf2ZGxcvXTu9NRhfbq1lTOX+//eLwWwehFhQgAAAABJRU5ErkJggg=="

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(0);

var _videoPlayIcon = __webpack_require__(1);

var _videoPlayIcon2 = _interopRequireDefault(_videoPlayIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gallery = function (_Component) {
  _inherits(Gallery, _Component);

  function Gallery() {
    _classCallCheck(this, Gallery);

    var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this));

    _this.previewWidth = 250;
    _this.previewHeight = 250;
    _this.state = {
      photos: [],
      selectedPhoto: {},
      lensStyle: {
        display: 'none',
        left: '0px',
        top: '0px',
        width: '0px',
        height: '0px'
      },
      zoomAreaStyle: {
        display: 'none'
      },
      zoomImgStyle: {
        left: '0px',
        top: '0px'
      },
      thumbContainerStyle: {
        left: '0px'
      }
    };

    _this.config = {
      moveLength: 0,
      viewNumber: 5,
      stepNumber: 1,
      step: 46
    };
    return _this;
  }

  _createClass(Gallery, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var photos = this.props.photos;

      this.setState({ photos: photos }, function () {
        photos.length > 0 && this.setState({ selectedPhoto: photos[0] });
        this.preload();
      }.bind(this));
    }
  }, {
    key: 'getCommonSize',
    value: function getCommonSize() {
      var commonSize = {};
      var zoomSrc = document.getElementById('zoomSrc');
      if (zoomSrc) {
        var mask = zoomSrc.getElementsByTagName('div')[0];
        var lens = mask.getElementsByTagName('span')[0];
        commonSize.mask = this.getOffset(mask);
        commonSize.mask.width = mask.offsetWidth;
        commonSize.mask.height = mask.offsetHeight;
        commonSize.lens = { width: lens.offsetWidth, height: lens.offsetHeight };
      }
      var zoomArea = document.getElementById('zoomArea');
      if (zoomArea) {
        var zoomImg = zoomArea.getElementsByTagName('img')[0];
        commonSize.zoomArea = { width: zoomArea.offsetWidth, height: zoomArea.offsetHeight };
        commonSize.zoomImg = { width: zoomImg.offsetWidth, height: zoomImg.offsetHeight };
      }
      return commonSize;
    }
  }, {
    key: 'preload',
    value: function preload() {
      var images = [];
      this.state.photos.forEach(function (photo, idx) {
        images[idx] = new Image();
        images[idx].src = photo.full;
      });
    }
  }, {
    key: 'getOffset',
    value: function getOffset(node) {
      var leftOffset = node.offsetLeft;
      var topOffset = node.offsetTop;
      while ((node = node.offsetParent) != null) {
        leftOffset += node.offsetLeft;
        topOffset += node.offsetTop;
      }
      return { 'left': leftOffset, 'top': topOffset };
    }
  }, {
    key: 'setStyle',
    value: function setStyle(stateName, obj) {
      var stateValue = this.state[stateName];
      Object.keys(obj).forEach(function (key) {
        stateValue[key] = obj[key];
      });
      this.setState({ stateName: stateValue });
    }
  }, {
    key: 'onPreview',
    value: function onPreview(photo) {
      this.setState({ selectedPhoto: photo });
    }
  }, {
    key: 'onNext',
    value: function onNext() {
      var currentLeft = this.state.thumbContainerStyle.left.split('px')[0];
      var stride = this.config.step * this.config.stepNumber;
      var countLength = (this.state.photos.length - this.config.viewNumber) * stride;
      if (this.config.moveLength < countLength) {
        this.setStyle('thumbContainerStyle', { left: parseInt(currentLeft) - stride + 'px' });
        this.config.moveLength += stride;
      }
    }
  }, {
    key: 'onPrev',
    value: function onPrev() {
      var currentLeft = this.state.thumbContainerStyle.left.split('px')[0];
      var stride = this.config.step * this.config.stepNumber;
      if (this.config.moveLength > 0) {
        if (this.config.moveLength > stride) {
          this.setStyle('thumbContainerStyle', { left: parseInt(currentLeft) + stride + 'px' });
          this.config.moveLength -= stride;
        } else {
          this.setStyle('thumbContainerStyle', { left: parseInt(currentLeft) + this.config.moveLength + 'px' });
          this.config.moveLength = 0;
        }
      }
    }
  }, {
    key: 'onMouseOverHandler',
    value: function onMouseOverHandler() {
      this.setStyle('lensStyle', { display: 'block' });
      this.setStyle('zoomAreaStyle', { display: 'block' });
    }
  }, {
    key: 'onMouseOutHandler',
    value: function onMouseOutHandler() {
      this.setStyle('lensStyle', { display: 'none' });
      this.setStyle('zoomAreaStyle', { display: 'none' });
    }
  }, {
    key: 'onMouseMoveHandler',
    value: function onMouseMoveHandler(event) {
      var commonSize = this.getCommonSize();
      var innerArea = {
        width: commonSize.mask.width - commonSize.lens.width,
        height: commonSize.mask.height - commonSize.lens.height
      };
      var x = event.clientX - commonSize.mask.left - commonSize.lens.width / 2;
      var y = event.clientY - commonSize.mask.top - commonSize.lens.height / 2;
      if (x < 0) {
        x = 0;
      } else if (x > innerArea.width) {
        x = innerArea.width;
      }
      if (y < 0) {
        y = 0;
      } else if (y > innerArea.height) {
        y = innerArea.height;
      }

      this.setStyle('lensStyle', { left: x + 'px', top: y + 'px' });
      this.setStyle('zoomImgStyle', {
        left: innerArea.width == 0 ? 0 : -(x / innerArea.width) * (commonSize.zoomImg.width - commonSize.zoomArea.width) + 'px',
        top: innerArea.height == 0 ? 0 : -(y / innerArea.height) * (commonSize.zoomImg.height - commonSize.zoomArea.height) + 'px'
      });
    }
  }, {
    key: 'displayScroll',
    value: function displayScroll() {
      var _this2 = this;

      if (this.props.displaySingle) {
        return '';
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'scroll' },
          _react2.default.createElement(
            'a',
            { className: 'prev', onClick: this.onPrev.bind(this) },
            '<'
          ),
          _react2.default.createElement(
            'a',
            { className: 'next', onClick: this.onNext.bind(this) },
            '>'
          ),
          _react2.default.createElement(
            'div',
            { className: 'items' },
            _react2.default.createElement(
              'ul',
              { id: 'imgContainer', style: this.state.thumbContainerStyle },
              this.state.photos.map(function (photo) {
                if (photo.video) {
                  return _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement('img', { className: 'video-play-icon', src: _videoPlayIcon2.default, onMouseMove: _this2.onPreview.bind(_this2, photo) })
                  );
                } else {
                  return _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement('img', { src: photo.thumb, onMouseMove: _this2.onPreview.bind(_this2, photo) })
                  );
                }
              })
            )
          )
        );
      }
    }
  }, {
    key: 'onLoadMediaHandler',
    value: function onLoadMediaHandler(event) {
      var naturalWidth = event.target.naturalWidth ? event.target.naturalWidth : event.target.videoWidth,
          naturalHeight = event.target.naturalHeight ? event.target.naturalHeight : event.target.videoHeight,
          ratio = naturalWidth / naturalHeight;
      if (ratio > 1) {
        var width = this.previewWidth > naturalWidth ? naturalWidth : this.previewWidth,
            height = parseInt(this.previewWidth / ratio) > naturalHeight ? naturalHeight : parseInt(this.previewWidth / ratio),
            size = {
          width: width + 'px',
          height: height + 'px',
          top: this.previewWidth * (1 - 1 / ratio) / 2,
          position: 'absolute'
        },
            len = this.previewWidth * this.previewWidth / naturalWidth;
        this.setState({ selectedPhotoStyle: size, zoomMaskStyle: size });
        this.setStyle('lensStyle', {
          width: len > width ? width : len, height: len > height ? height : len
        });
      } else {
        var _width = parseInt(this.previewHeight * ratio) > naturalWidth ? naturalWidth : parseInt(this.previewHeight * ratio),
            _height = this.previewHeight > naturalHeight ? naturalHeight : this.previewHeight,
            _size = {
          width: _width + 'px',
          height: _height + 'px',
          left: this.previewHeight * (1 - ratio) / 2,
          position: 'absolute'
        },
            _len = this.previewHeight * this.previewHeight / naturalHeight;
        this.setState({ selectedPhotoStyle: _size, zoomMaskStyle: _size });
        this.setStyle('lensStyle', {
          width: _len > _width ? _width : _len, height: _len > _height ? _height : _len
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.photos.length > 0) {
        return _react2.default.createElement(
          'div',
          { className: 'gallery' },
          this.state.selectedPhoto.video ? _react2.default.createElement(
            'div',
            { className: 'preview' },
            _react2.default.createElement('video', { style: this.state.selectedPhotoStyle, src: this.state.selectedPhoto.full, controls: 'true', onLoadedData: this.onLoadMediaHandler.bind(this) })
          ) : _react2.default.createElement(
            'div',
            { className: 'preview' },
            _react2.default.createElement(
              'div',
              { id: 'zoomSrc' },
              _react2.default.createElement('img', { style: this.state.selectedPhotoStyle, src: this.state.selectedPhoto.full,
                onLoad: this.onLoadMediaHandler.bind(this) }),
              _react2.default.createElement(
                'div',
                { className: 'zoomMask',
                  style: this.state.zoomMaskStyle,
                  onMouseOver: this.onMouseOverHandler.bind(this),
                  onMouseMove: this.onMouseMoveHandler.bind(this),
                  onMouseOut: this.onMouseOutHandler.bind(this) },
                _react2.default.createElement('span', { className: 'zoomLens', style: this.state.lensStyle })
              )
            ),
            _react2.default.createElement(
              'div',
              { id: 'zoomArea', style: this.state.zoomAreaStyle },
              _react2.default.createElement('img', { src: this.state.selectedPhoto.full, style: this.state.zoomImgStyle })
            )
          ),
          this.displayScroll()
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'gallery-empty' },
          'No Photo'
        );
      }
    }
  }]);

  return Gallery;
}(_react.Component);

exports.default = Gallery;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "#zoomSrc {\n  float: left;\n  border: 0 none;\n  position: relative;\n  padding: 0px;\n  margin: 0px;\n  width: 250px;\n  height: 250px; }\n  #zoomSrc img {\n    position: absolute;\n    width: 0;\n    height: 0; }\n  #zoomSrc span.zoomLens {\n    display: none;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    width: 50px;\n    height: 50px;\n    border: 1px solid #aaa;\n    background: rgba(255, 255, 255, 0.3); }\n\n#zoomArea {\n  z-index: 100;\n  position: absolute;\n  top: 0px;\n  left: 255px;\n  width: 250px;\n  height: 250px;\n  background: #ffffff;\n  border: 1px solid #CCCCCC;\n  display: none;\n  text-align: center;\n  overflow: hidden; }\n  #zoomArea img {\n    position: absolute;\n    left: 0;\n    top: 0; }\n\n.zoomMask {\n  cursor: crosshair;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 10; }\n\n.gallery .video-play-icon {\n  background-color: rgba(0, 0, 0, 0.2); }\n\n.gallery .preview {\n  width: 252px;\n  height: 252px;\n  border: 1px solid #dfdfdf;\n  position: relative; }\n\n.gallery .scroll {\n  clear: both;\n  margin-top: 8px;\n  width: 250px; }\n  .gallery .scroll .items {\n    float: left;\n    position: relative;\n    width: 230px;\n    height: 42px;\n    overflow: hidden; }\n    .gallery .scroll .items ul {\n      padding: 0;\n      margin: 0;\n      position: absolute;\n      left: 0;\n      width: 999999px;\n      height: 40px;\n      list-style: none outside none; }\n      .gallery .scroll .items ul li {\n        float: left;\n        width: 40px;\n        text-align: center;\n        margin: 0 3px; }\n        .gallery .scroll .items ul li img {\n          border: 1px solid #fff;\n          width: 40px;\n          height: 40px; }\n        .gallery .scroll .items ul li img:hover {\n          border: 1px solid #00f; }\n  .gallery .scroll .prev, .gallery .scroll .next {\n    cursor: pointer;\n    color: #545454;\n    display: block;\n    text-align: center;\n    width: 6px;\n    height: 40px;\n    line-height: 40px;\n    text-decoration: none; }\n  .gallery .scroll .prev {\n    float: left;\n    margin-right: 4px; }\n  .gallery .scroll .next {\n    float: right;\n    margin-left: 4px; }\n\n.gallery-empty {\n  width: 250px;\n  height: 250px;\n  line-height: 250px;\n  text-align: center;\n  font-size: 20px;\n  border: 1px solid #dfdfdf; }\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=react-hash-tabs.js.map