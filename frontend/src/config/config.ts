interface Config {
  baseurl: string;
}

export const config: Config = {
  baseurl: import.meta.env.VITE_BASE_URL,
};
