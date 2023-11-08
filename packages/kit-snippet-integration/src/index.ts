import TalentKit from "@talentdigital/kit";

const TEST_PASS = "td-test-pass";
const TEST_FAIL = "td-test-fail";
const TEST_ID_PREFIX = "td-test-id-";

const LOADING_SCREEN_ID = "td-loading-screen";

type Savegame = {
  lastPlayedUrl: string;
};

function initialize() {
  console.debug("Initializing talentkit");

  createLoadingScreen();

  const config = getConfig();
  console.debug("Config", config);

  TalentKit.create(config).then(onTalentKitCreation).catch(logErorr);
}

function onTalentKitCreation(kit: TalentKit) {
  console.debug("Kit:", kit);

  clearLoadingScreen();
  attachTestListeners(kit, TEST_PASS);
  attachTestListeners(kit, TEST_FAIL);
  handleSaveGame(kit);
}

function attachTestListeners(
  kit: TalentKit,
  selector: typeof TEST_PASS | typeof TEST_FAIL
) {
  document.querySelectorAll(`.${selector}`).forEach((element) => {
    console.debug(
      `Element found for ${selector} with classes: ${element.classList.toString()}`
    );
    element.addEventListener("click", () => {
      const testId = Array.from(element.classList)
        .find((item) => item.includes(TEST_ID_PREFIX))
        ?.split(TEST_ID_PREFIX)[1];

      if (!testId) {
        logErorr(
          `Test ID not found for element with classes: ${element.classList.toString()}`
        );
        return;
      }

      if (!kit.tests[testId]) {
        logErorr(
          `Test id: ${testId} not found in kit.tests, available tests are: ${Object.keys(
            kit.tests
          ).toString()}`
        );
        return;
      }

      if (selector === TEST_PASS) {
        kit.tests[testId].pass().catch(logErorr);
      } else {
        kit.tests[testId].fail().catch(logErorr);
      }
    });
  });
}

function handleSaveGame(kit: TalentKit) {
  const isStartingScreen =
    window.location.href.includes("sid") &&
    window.location.href.includes("eid");
  const currentSavegame = kit.savegame.load();
  console.debug("Current savegame", currentSavegame);

  if (isStartingScreen && isSavegame(currentSavegame)) {
    window.location.href = currentSavegame.lastPlayedUrl;
    return;
  }

  const oldSavegame = isSavegame(currentSavegame) ? currentSavegame : {};

  kit.savegame.save({
    ...oldSavegame,
    lastPlayedUrl: window.location.href,
  });
}

function isSavegame(savegame: unknown): savegame is Savegame {
  return Boolean(
    typeof savegame === "object" && savegame?.hasOwnProperty("lastPlayedUrl")
  );
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
  `;
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
  loadingScreen.style.zIndex = "1000";
  loadingScreen.style.transition = "opacity 3s ease-in-out";
  loadingScreen.style.opacity = "0";

  const spinner = document.createElement("div");
  spinner.innerText = "↻";
  spinner.style.fontSize = "64px";
  spinner.style.color = "white";
  spinner.className = "td-infinite-rotation";

  document.body.appendChild(loadingScreen);
  loadingScreen.appendChild(spinner);

  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.style.opacity = "1";
    }
  }, 400);
}

function clearLoadingScreen() {
  document.getElementById(LOADING_SCREEN_ID)?.remove();
}

function logErorr(message: string) {
  console.error(`Kit snippet integration: ${message}`);
}

initialize();
