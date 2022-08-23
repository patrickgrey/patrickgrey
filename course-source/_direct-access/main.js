// import { ScrollToTop } from "_components/ScrollToTop";

var pageModule = (function () {
  var module = {};

  /**
   * Loads a JavaScript file and returns a Promise for when it is loaded
   */
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.onload = resolve;
      script.onerror = reject;
      script.src = src;
      document.head.append(script);
    });
  };

  module.init = function () {
    // Analytics
    const head = document.querySelector("head");

    loadScript("/ilp/customs/JSLibrary/CF07_IANSanalytics.min.js")
      .then(() => {
        iansGASharedCode.detectIframeUpdate(
          document,
          "contentIframe",
          head.dataset.moduleCode,
          "Direct Access URL",
          "Direct Access URL",
          head.dataset.accessType,
          "bypages",
          head.dataset.courseMode,
          head.dataset.courseProvider
        );
      })
      .catch(() =>
        console.error(
          "!!!This is OK if you are developing locally!!! Analytics script did not load. "
        )
      );

    // ScrollToTop();
    const contentIframe = document.querySelector("#contentIframe");
    const backToSyllabus = document.querySelector("#backToSyllabus");

    function updateNavBar(iframe) {
      try {
        if (iframe.src === iframe.contentWindow.location.href) {
          backToSyllabus.classList.remove("ians-lms-banner-show");
          if (sessionStorage.getItem("daScroll")) {
            contentIframe.contentWindow.scrollTo(
              0,
              sessionStorage.getItem("daScroll")
            );
          }
        } else {
          backToSyllabus.classList.add("ians-lms-banner-show");
        }
      } catch (e) { }
    }

    function setScrollPosition() {
      // console.log("scroll called");
      if (contentIframe.src === contentIframe.contentWindow.location.href) {
        // console.log("Save scroll position");
        // console.log(contentIframe.contentWindow.pageYOffset);
        sessionStorage.setItem(
          "daScroll",
          contentIframe.contentWindow.pageYOffset
        );
      }
    }

    try {
      contentIframe.addEventListener("load", function (event) {
        updateNavBar(contentIframe);
        contentIframe.contentWindow.addEventListener(
          "beforeunload",
          function (event) {
            setScrollPosition();
          }
        );
      });
    } catch (e) { }
  };

  return module;
})();

pageModule.init();
