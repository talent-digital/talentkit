import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ({

/***/ 147:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fs");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var _a;
const fs = __nccwpck_require__(147);
const rootPath = (_a = process.env.Action_Rooth_Path) !== null && _a !== void 0 ? _a : "./";
const run = async () => {
    console.log("...start");
    console.log("process.env", process.env);
    console.log("rootPath", rootPath);
    fs.readFile(`${rootPath}targetfilehere.txt`, "utf8", function (err, data) {
        console.log(data);
    });
    console.log("...END4?");
};
run();

// const {
//   ENVIRONMENT_NAME,
//   TARGET_DOMAIN,
//   EPISODES_PROVISIONER_CLIENT,
//   EPISODES_PROVISIONER_CLIENT_PASSWORD,
//   PW,
// } = process.env;
// let baseUrl: string;
// let environmemt: string;
// let domain: string;
// if (!!ENVIRONMENT_NAME && !!TARGET_DOMAIN) {
//   baseUrl = `https://${ENVIRONMENT_NAME}.${TARGET_DOMAIN}`;
//   environmemt = ENVIRONMENT_NAME;
//   domain = TARGET_DOMAIN;
// } else {
//   baseUrl = "http://localhost:8081";
//   environmemt = "devtd2";
//   domain = "talentdigit.al";
// }
// const clientId = EPISODES_PROVISIONER_CLIENT || "episodes-provisioner-client";
// let clientSecret: string;
// if (EPISODES_PROVISIONER_CLIENT_PASSWORD) {
//   clientSecret = EPISODES_PROVISIONER_CLIENT_PASSWORD;
// } else {
//   if (PW) {
//     clientSecret = PW;
//   } else {
//     throw new Error(
//       "You need to set environment variable for either EPISODES_PROVISIONER_CLIENT_PASSWORD or PW"
//     );
//   }
// }
// console.log(`Base URL: ${baseUrl}`);
// console.log(`Environment: ${environmemt}`);
// console.log(`Domain: ${domain}`);
// await deploySeasons(domain, baseUrl, environmemt, clientId, clientSecret);

})();

