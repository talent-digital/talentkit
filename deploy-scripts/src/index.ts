import { deploySeasons } from "./helpers/deploy-season.js";
const fs = require("fs");

const run = async () => {
  console.log("...start");

  fs.readFile("./targetfilehere.txt", "utf8", function (err, data) {
    console.log(data);
  });

  console.log("...END3?");
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
