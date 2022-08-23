import { SVG } from "@svgdotjs/svg.js";
import {
  random,
  map,
  spline,
  pointsInPath
} from "@georgedoescode/generative-utils";

var pageModule = (function () {
  var module = {};
  module.init = function () {
    const svg1 = SVG(".pg-canvas-01");
    const svg2 = SVG(".pg-canvas-02");
    const svg3 = SVG(".pg-canvas-03");
    const svg4 = SVG(".pg-canvas-04");
    const { width, height } = svg1.viewbox();
    const howManyStars = 400;
    const howManyStarsBig = 10000;

    for (let index = 0; index < howManyStars + 1; index++) {
      const x = random(0, width);
      const y = random(0, height);
      const radius = random(0.1, 0.5);
      const opacity = random(0.2, 1);
      svg1.ellipse(radius, radius).cx(x).cy(y).attr('fill', 'white');
      svg2.ellipse(radius, radius).cx(x).cy(y).attr('fill', 'white');
      svg3.ellipse(radius, radius).cx(x).cy(y).attr('fill', 'white');
      svg4.ellipse(radius, radius).cx(x).cy(y).attr('fill', 'white').opacity(opacity);
    }

    for (let index = 0; index < howManyStarsBig + 1; index++) {
      const x = random(0, width);
      const y = random(0, height);
      const radius = random(0.05, 0.2);
      const opacity = random(0.1, 0.7);
      svg3.ellipse(radius, radius).cx(x).cy(y).attr('fill', 'white');
      svg4.ellipse(radius, radius).cx(x).cy(y).attr('fill', 'white').opacity(opacity);
    }
  };
  return module;
})();

pageModule.init();
