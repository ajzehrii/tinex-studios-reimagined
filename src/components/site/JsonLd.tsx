/**
 * Renders a JSON-LD block. Crawlers read structured data anywhere in the
 * document, so this is emitted inline in the component tree rather than
 * through the router head — which keeps each schema next to the route that
 * owns it.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Angle brackets are the only sequence that can break out of a script
      // element; JSON.stringify handles the rest.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
