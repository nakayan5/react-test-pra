const tracker = "";
const fallbackFn = (command: string, ...fields: unknown[]) => {
  console.log(`window.ga(`, command, ...fields, `)`);
};
const ga =
  typeof window !== "undefined" ? window?.ga || fallbackFn : fallbackFn;

export const setStatus = (status: Record<string, unknown>) => {
  ga(`${tracker}set`, status);
};

export const sendEvent = (
  action: string,
  category: string,
  fields?: string | Record<string, unknown>
) => {
  ga(`${tracker}event`, action, category, fields);
};

export const sendPageview = () => {
  ga("send", "pageview");
};
