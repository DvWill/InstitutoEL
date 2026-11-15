import type { Metadata } from 'next';
import { SITE_CONFIG } from './site-config';

/**
 * SEO do site em um só lugar: endereço oficial, title/description da página e
 * os construtores de dados estruturados (JSON-LD).
 */

/**
 * Endereço oficial do site, sem barra no final: base do canonical, do sitemap
 * e da imagem de compartilhamento. NEXT_PUBLIC_SITE_URL permite trocar o
 * endereço sem mexer no código (por exemplo, num ambiente de testes).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://institutoel.com.br'
).replace(/\/+$/, '');
export const SITE_NAME = 'Instituto de Educação e Liderança';
export const SITE_LOCALE = 'pt_BR';

/** Data da última revisão de conteúdo (vai para o <lastmod> do sitemap). */
export const CONTENT_UPDATED_AT = '2026-11-14';

/** Title com a palavra-chave no início; description terminando em chamada para ação. */
export const HOME_SEO = {
  path: '/',
  title: 'Formação de gestores para redes de ensino | Instituto',
  description:
    'Formação de gestores para redes de ensino, assessoria para IDEB e SAEB e liderança educacional com o Instituto de Educação e Liderança. Fale com a equipe.',
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

/** Metadata completa da página: title, description, canonical, Open Graph e Twitter. */
export function homeMetadata(): Metadata {
  return {
    title: { absolute: HOME_SEO.title },
    description: HOME_SEO.description,
    alternates: { canonical: HOME_SEO.path },
    openGraph: {
      type: 'website',
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      url: HOME_SEO.path,
      title: HOME_SEO.title,
      description: HOME_SEO.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: HOME_SEO.title,
      description: HOME_SEO.description,
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

type Node = Record<string, unknown>;

export const INSTITUTE_ID = `${SITE_URL}/#instituto`;
export const WEBSITE_ID = `${SITE_URL}/#site`;
/** Mesmo @id usado no site da Jamilla, para os buscadores ligarem os dois. */
export const PERSON_ID = `${SITE_CONFIG.jamillaSiteUrl}/#jamilla-salviano`;

const BRAZIL = { '@type': 'Country', name: 'Brasil' };

/** Envolve os nós em um único documento JSON-LD com @graph. */
export function jsonLdGraph(...nodes: Array<Node | null | undefined | false>) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}

export function personNode(): Node {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Jamilla Salviano',
    url: SITE_CONFIG.jamillaSiteUrl,
    image: absoluteUrl('/images/jamilla-cream.webp'),
    jobTitle: 'Especialista em liderança e gestão escolar',
    // Credenciais copiadas do texto da própria página (seção "Com Jamilla Salviano").
    description:
      'Professora especialista em Gestão Escolar, Supervisão Escolar, Docência do Ensino Superior e Orientação Escolar, com atuação como professora, coordenadora, supervisora e diretora de escola pública de grande porte. Autora do livro O Inimigo Oculto da Gestão Escolar e criadora do Método GPS da Liderança Escolar.',
    knowsAbout: [
      'Gestão escolar',
      'Liderança escolar',
      'Formação de gestores escolares',
    ],
  };
}

/** Referência curta para a Jamilla dentro de outros nós. */
export const personRef = { '@id': PERSON_ID };

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'pt-BR',
    publisher: { '@id': INSTITUTE_ID },
  };
}

type OrganizationInput = {
  name: string;
  description: string;
  logo?: string;
  sameAs?: string[];
  /** Pessoas ligadas ao Instituto, só se a página afirmar o vínculo. */
  members?: Node[];
  /** Áreas de atuação citadas na página (ex.: 'IDEB e Indicadores Educacionais'). */
  knowsAbout?: string[];
};

export function educationalOrganizationNode(input: OrganizationInput): Node {
  return {
    '@type': 'EducationalOrganization',
    '@id': INSTITUTE_ID,
    name: input.name,
    description: input.description,
    url: absoluteUrl('/'),
    ...(input.logo ? { logo: absoluteUrl(input.logo) } : {}),
    ...(input.sameAs?.length ? { sameAs: input.sameAs } : {}),
    ...(input.members?.length ? { member: input.members } : {}),
    ...(input.knowsAbout?.length ? { knowsAbout: input.knowsAbout } : {}),
    areaServed: BRAZIL,
  };
}

export type FaqItem = { question: string; answer: string };

export function faqPageNode(path: string, items: FaqItem[]): Node | null {
  if (!items.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
