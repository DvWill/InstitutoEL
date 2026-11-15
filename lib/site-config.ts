/**
 * Configurações editoriais do site em um só lugar.
 *
 * Regra: nada aqui pode ser inventado. O que ainda não foi confirmado fica
 * vazio, marcado com TODO, e a página se adapta sem a informação.
 */
export const SITE_CONFIG = {
  whatsappNumber: '5561991889520',
  instagram: 'https://www.instagram.com/institutodeeducacaoelideranca_/',
  /** Site da Jamilla Salviano (referência nos dados estruturados). */
  jamillaSiteUrl: 'https://www.jamillasalviano.com',
  // TODO: Política de Privacidade e Termos de Uso ainda não existem no site.
  // Quando existirem, liste aqui: [{ label: 'Política de Privacidade', href: '/privacidade' }].
  legalLinks: [] as ReadonlyArray<{ label: string; href: string }>,
  // TODO: prazo real de retorno no WhatsApp, ex.: 'em até 24 horas úteis'.
  // Enquanto vazio, a página explica o próximo passo sem prometer prazo.
  whatsappResponseTime: null as string | null,
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
