import cliProgress from "cli-progress";
import { constants } from "fs";
import { access, readdir, readFile } from "fs/promises";
import got from "got";
import { join } from "path";
import { parse } from "yaml";

type TestItem = {
  subcompetence: number;
  level: string;
  documentation: { en: string; de: string };
};

enum levels {
  BEGINNER = "FOUNDATION",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  HIGHLY_SKILLED = "HIGHLY_SPECIALISED",
}

export const deployTestItems = async (
  baseUrl: string,
  seasonId: string,
  authorization: string
) => {
  const path = join("season", seasonId, "test-item");

  try {
    access(path, constants.R_OK);

    const testItemFiles = await readdir(path);

    if (testItemFiles.length === 0) return;

    console.log("Deploying test-items\n");

    const multibar = new cliProgress.MultiBar(
      {
        clearOnComplete: false,
        hideCursor: true,
        format: `{bar} {prefix}    {testId}`,
      },
      cliProgress.Presets.shades_classic
    );

    const bars = {};

    for (const testItemFile of testItemFiles) {
      const data = parse(
        await readFile(join(path, testItemFile), "utf-8")
      ) as Record<string, TestItem>;
      const prefix = testItemFile.replace(".yml", "");

      console.log("data", data);

      debugger;

      bars[prefix] = multibar.create(Object.keys(data).length, 0, {
        prefix,
        testId: "",
      });

      for (const [
        testId,
        { subcompetence, level, documentation },
      ] of Object.entries(data)) {
        try {
          await got
            .post(`${baseUrl}/api/v1/test-item`, {
              headers: {
                authorization,
              },
              json: {
                eventType: `${prefix}.${testId}`,
                subCompetenceId: subcompetence,
                level: levels[level],
                documentation: JSON.stringify(documentation),
              },
            })
            .json();
        } catch (err) {
          console.log(`error while posting ${prefix}.${testId}`, err);
          continue;
        } finally {
          bars[prefix].increment({ testId });
        }
      }
    }

    multibar.stop();
  } catch (err) {
    console.error(err);
  }
};
