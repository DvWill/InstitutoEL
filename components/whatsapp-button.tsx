import { whatsappUrl } from '@/lib/site-config';

/** Botão flutuante de WhatsApp (estilos globais `.whatsapp` em app/globals.css). */

type WhatsAppButtonProps = {
  /** Texto do botão (aparece no desktop). */
  label: string;
  /** Mensagem pré-preenchida da conversa. */
  message: string;
};

export function WhatsAppButton({ label, message }: WhatsAppButtonProps) {
  return (
    <a
      aria-label={`${label} pelo WhatsApp`}
      className="whatsapp"
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="whatsapp__label">{label}</span>
      <span className="whatsapp__icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 4.5A11.5 11.5 0 0 0 6.1 21.84L4.5 27.5l5.8-1.52A11.5 11.5 0 1 0 16 4.5Z" />
          <path d="M12.1 10.15c-.28-.64-.58-.65-.86-.66h-.73c-.25 0-.66.1-1 .47-.34.38-1.31 1.28-1.31 3.12s1.34 3.62 1.53 3.87c.19.25 2.64 4.03 6.39 5.65.89.38 1.59.61 2.13.78.9.28 1.71.24 2.35.15.72-.1 2.21-.91 2.53-1.78.31-.88.31-1.63.22-1.78-.09-.16-.34-.25-.72-.44-.37-.19-2.21-1.09-2.56-1.22-.34-.12-.59-.19-.84.19-.25.37-.97 1.21-1.19 1.46-.22.25-.44.28-.81.09-.38-.18-1.59-.58-3.02-1.87a11.4 11.4 0 0 1-2.09-2.6c-.22-.37-.02-.57.16-.76.17-.17.38-.44.56-.66.19-.22.25-.38.38-.63.12-.25.06-.47-.03-.66-.1-.19-.83-2.04-1.16-2.77Z" />
        </svg>
      </span>
    </a>
  );
}
