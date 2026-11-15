type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Dados estruturados (schema.org) renderizados no HTML do servidor.
 * O `<` é escapado para que nenhum texto vindo do conteúdo feche a tag <script>.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
