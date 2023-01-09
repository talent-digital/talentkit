import { SupportedExtensions } from "./interfaces";

const domains = {
  dev: "talentdigit.al",
  prod: "talentdigital.eu",
};

const devTenants = ["devtd2", "internaldemo"];

export const getDomain = (tenant: string) =>
  devTenants.includes(tenant) ? domains.dev : domains.prod;

export const getBaseUrl = (tenant: string) =>
  `https://${tenant}.${getDomain(tenant)}`;

export const supportedExtensions = [
  "md",
  "json",
  "toml",
  "yaml",
  "yml",
] as const;

export const getFileExtension = (fileName: string) =>
  fileName.slice(fileName.lastIndexOf(".") + 1);

export const parseContent = async <T = unknown>({
  content,
  fileName,
  fileExtension,
}: {
  content: string;
  fileName?: string;
  fileExtension?: SupportedExtensions;
}) => {
  const extension = fileName ? getFileExtension(fileName) : fileExtension;

  switch (extension) {
    case "json":
      return JSON.parse(content) as T;

    case "md":
      const { marked } = await import("marked");
      return marked(content) as T;

    case "toml":
      const toml = await import("toml");
      return toml.parse(content) as T;

    case "yaml":
    case "yml":
      const yaml = await import("yaml");
      return yaml.parse(content) as T;

    default:
      throw new Error(
        "Unsuppoted file extension, supported extensions: json, md, toml, yml/yaml "
      );
  }
};
