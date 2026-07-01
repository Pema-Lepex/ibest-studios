export const RenderFormattedText = (
  text: string | string[] | undefined,
  accentColor?: string 
) => {
  if (!text) return null;

  const combinedRegex =
    /(https?:\/\/[^\s]+|www\.[^\s]+|support@[^\s]+|\*\*[^*]+\*\*)/g;
  const textStr = Array.isArray(text) ? text.join("\n") : text;
  const parts = textStr.split(combinedRegex);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-extrabold text-slate-900 ">
          {part.replace(/\*\*/g, "")}
        </strong>
      );
    }

    if (part.match(/(https?:\/\/[^\s]+|www\.[^\s]+|support@[^\s]+)/)) {
      const isEmail = part.includes("@");
      const href = isEmail
        ? `mailto:${part}`
        : part.includes("educareskill.com") ? (() => {
          const url = new URL(part);
          return `${url.pathname}${url.search}${url.hash}`; // /path?query#hash
        })()
          : part;

      return (
        <a
          key={i}
          href={href}
          target={isEmail ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className="underline decoration-2 underline-offset-4 font-bold transition-opacity hover:opacity-70"
          style={{ color: accentColor }}
        >
          {part}
        </a>
      );
    }
    // Return plain text
    return part;
  });
};
