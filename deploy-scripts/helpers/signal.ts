import cliProgress from "cli-progress";
import { constants } from "fs";
import { access, readdir, readFile } from "fs/promises";
import got from "got";
import { join } from "path";

export const deploySignalModules = async (
  baseUrl: string,
  seasonId: string,
  authorization: string
) => {
  const path = join("season", seasonId, "signal");

  try {
    await access(path, constants.R_OK);

    const signalFiles = await readdir(path);

    if (signalFiles.length === 0) return;

    console.log("Deploying signal-modules\n");

    const bar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );

    bar.start(signalFiles.length, 0);

    for (const signalFile of signalFiles) {
      const signalType = parseInt(signalFile.replace(".sql", ""));
      const query = (await readFile(join(path, signalFile), "utf-8"))
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ");

      await got
        .put(`${baseUrl}/api/v1/profile2/signals/module`, {
          headers: { authorization },
          json: {
            signalType,
            query,
          },
        })
        .json();

      bar.increment();
    }

    bar.stop();
  } catch (err) {}
};
