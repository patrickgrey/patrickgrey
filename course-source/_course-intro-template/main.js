import { ScrollToTop } from "_components/ScrollToTop";

("use strict");

var pageModule = (function () {
	var module = {};
	module.init = function () {
		ScrollToTop();
	};
	return module;
})();

pageModule.init();
