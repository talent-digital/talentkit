const domains = {
  dev: "talentdigit.al",
  prod: "talentdigital.eu",
};

const devTenants = ["devtd2", "internaldemo"];

export const getDomain = (tenant: string) =>
  devTenants.includes(tenant) ? domains.dev : domains.prod;

export const getBaseUrl = (tenant: string) =>
  `https://${tenant}.${getDomain(tenant)}`;
