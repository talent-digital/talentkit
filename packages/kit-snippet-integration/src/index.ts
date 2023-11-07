import TalentKit from "@talentdigital/kit";

const TEST_PASS = "td-test-pass"
const TEST_FAIL = "td-test-fail"
const TEST_ID_PREFIX = "td-test-id-"

const LOADING_SCREEN_ID = "td-loading-screen"

function initialize() {
  console.debug("Initializing talentkit")

  createLoadingScreen();

  const config = getConfig();
  console.debug("Config", config)

  TalentKit.create(config).then(attachEventListeners);
}

function attachEventListeners(kit: TalentKit) {
  console.debug("Kit:", kit)
  clearLoadingScreen();
  attachTestListeners(kit, TEST_PASS);
  attachTestListeners(kit, TEST_FAIL);
}

function attachTestListeners(kit: TalentKit, selector: typeof TEST_PASS | typeof TEST_FAIL) {
  document.querySelectorAll(`.${selector}`).forEach((element) => {
    console.debug(`Element found for ${selector} with classes: ${element.classList}`)
    element.addEventListener("click", () => {
      const testId = Array.from(element.classList)
        .find((item) => item.includes(TEST_ID_PREFIX))
        ?.split(TEST_ID_PREFIX)[1]

      if (!testId) {
        logErorr(`Test ID ${testId} not found for element with classes: ${element.classList}`);
        return;
      }

      if (!kit.tests[testId as string]) {
        logErorr(`Test id: ${testId} not found in kit.tests, available tests are: ${Object.keys(kit.tests)}`);
        return;
      }

      if (selector === TEST_PASS) {
        kit.tests[testId].pass();
      } else {
        kit.tests[testId].fail();
      }
    });
  });
}

function getConfig() {
  const host = window.location.hostname.split(".")?.[0];
  const tenant =
    host.startsWith("localhost") ||
    window.location.hostname.endsWith("netlify.app")
      ? "devtd2"
      : host;

  return {
    tenant,
  };
}

function createLoadingScreen() {
  const styles = `
    @keyframes infinite-rotaton-animation {
      from { transform: rotate(0deg) }
      to { transform: rotate(360deg) }
    }

    .td-infinite-rotation {
      animation: infinite-rotaton-animation 2s linear infinite;
    }
  `
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  const loadingScreen = document.createElement("div");
  loadingScreen.id = LOADING_SCREEN_ID;
  loadingScreen.style.position = "fixed";
  loadingScreen.style.top = "0";
  loadingScreen.style.left = "0";
  loadingScreen.style.width = "100vw";
  loadingScreen.style.height = "100vh";
  loadingScreen.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  loadingScreen.style.display = "flex";
  loadingScreen.style.justifyContent = "center";
  loadingScreen.style.alignItems = "center";
  loadingScreen.style.zIndex = "1000"
  loadingScreen.style.transition = "opacity 3s ease-in-out"
  loadingScreen.style.opacity = "0";

  const spinner = document.createElement("div");
  spinner.innerText = "↻"
  spinner.style.fontSize = "64px";
  spinner.style.color = "white";
  spinner.className = "td-infinite-rotation";

  document.body.appendChild(loadingScreen);
  loadingScreen.appendChild(spinner);

  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.style.opacity = "1";
    }
  }, 400)
}

function clearLoadingScreen() {
  document.getElementById(LOADING_SCREEN_ID)?.remove();
}

function logErorr(message: string) {
  console.error(`Kit snippet integration: ${message}`);
}

initialize();
