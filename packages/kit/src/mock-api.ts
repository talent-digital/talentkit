import { SeasonDefinition } from "./season";

export const createCustomFetch =
  (seasonDefinition: SeasonDefinition) =>
  async (input: string, init?: RequestInit) => {
    if (!init) throw "Invalid request";
    const { method } = init;

    console.log(input);

    const fullPath = input.split("/").slice(3).join("/");
    let m;

    if (method === "GET") {
      m = /season\/.+\/episode\/(.+)/.exec(fullPath);
      if (m) {
        const id = m[1];
        const episode = seasonDefinition.episodes[id];
        if (!episode) throw `Episode ${id} not found`;

        return Promise.resolve(new Response(JSON.stringify(episode)));
      }

      return Promise.resolve(new Response(JSON.stringify({})));
    }

    if (method === "POST") {
      return Promise.resolve();
    }
  };
