/**
 * Renders the lightweight markup used in the content files: **bold** spans,
 * bare URLs, and email addresses.
 *
 * Styling is deliberately inherited rather than hardcoded — the previous
 * version pinned <strong> to text-slate-900, which is invisible on the dark
 * canvas. Callers set the emphasis colour with a variant such as
 * `[&_strong]:text-cream` on the wrapper instead.
 */
export const RenderFormattedText = (text: string | string[] | undefined) => {
  if (!text) return null;

  const combinedRegex =
    /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\*\*[^*]+\*\*)/g;

  const textStr = Array.isArray(text) ? text.join("\n") : text;
  const parts = textStr.split(combinedRegex);

  return parts.map((part, i) => {
    if (!part) return null;

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.replace(/\*\*/g, "")}
        </strong>
      );
    }

    const isLink = /^(https?:\/\/|www\.)/.test(part);
    const isEmail = !isLink && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(part);

    if (isLink || isEmail) {
      const href = isEmail
        ? `mailto:${part}`
        : part.startsWith("www.")
          ? `https://${part}`
          : part;

      return (
        <a
          key={i}
          href={href}
          target={isEmail ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className="font-semibold text-gold-500 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-400"
        >
          {part}
        </a>
      );
    }

    return part;
  });
};
