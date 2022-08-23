# ScrollToTop

ScrollToTop adds a button to the page that shows scroll progress and allows the learner to skip to the top of long pages.

The component should only be used on longer pages.

## Installation

Add the following to the top of your `main.js` file:

```javascript
import { ScrollToTop } from "../_shared/_components/ScrollToTop/index";
```

Then call the function to add it to the page in your `main.js` file in the `module.init` function:

```javascript
module.init = function () {
	ScrollToTop();
};
```
