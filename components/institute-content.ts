import type { FaqItem } from '@/lib/seo';
import { SITE_CONFIG, whatsappUrl } from '@/lib/site-config';

/**
 * Conteúdo do Instituto compartilhado entre a landing (componente de cliente)
 * e a página do servidor (JSON-LD). Nada aqui é inventado: cada frase vem do
 * texto da própria página ou do acervo documentado da Sala de Conquistas,
 * publicado no site da Jamilla Salviano.
 */

export const INSTITUTE_NAME = 'Instituto de Educação e Liderança';

export const INSTITUTE_DESCRIPTION =
  'O Instituto de Educação e Liderança atua no desenvolvimento de redes de ensino, lideranças educacionais e equipes pedagógicas, oferecendo soluções formativas construídas a partir dos desafios reais da educação pública.';

/** Mensagem pré-preenchida para secretarias, redes de ensino e instituições. */
export const INSTITUTE_WHATSAPP_MESSAGE =
  'Olá! Represento uma rede de ensino/instituição e gostaria de conversar sobre as soluções do Instituto de Educação e Liderança.';

export const INSTITUTE_WHATSAPP_URL = whatsappUrl(INSTITUTE_WHATSAPP_MESSAGE);

// TODO: com SITE_CONFIG.whatsappResponseTime preenchido, o prazo
// aparece ao lado dos CTAs e na resposta "Como começa". Sem ele, nada de prazo.
const responseTime = SITE_CONFIG.whatsappResponseTime;

/** O que acontece depois do clique no CTA principal e no CTA final. */
export const INSTITUTE_NEXT_STEP = responseTime
  ? `A conversa começa pelo WhatsApp. Você recebe retorno ${responseTime}.`
  : 'A conversa começa pelo WhatsApp, com atendimento personalizado para a realidade da sua rede.';

/** Para quem o Instituto trabalha (texto da seção "Sobre o Instituto"). */
export const INSTITUTE_AUDIENCES = [
  'Secretários municipais de Educação',
  'Equipes técnicas das Secretarias',
  'Gestores escolares',
  'Coordenadores pedagógicos',
] as const;

/** Áreas de atuação: grade da página, faixa animada e knowsAbout do JSON-LD. */
export const INSTITUTE_AREAS: ReadonlyArray<readonly [string, string]> = [
  [
    'Alfabetização',
    'Estratégias para fortalecimento dos processos de alfabetização e aprendizagem.',
  ],
  [
    'Liderança e Gestão Escolar',
    'Desenvolvimento de gestores capazes de liderar, acompanhar e mobilizar equipes.',
  ],
  [
    'Gestão de Recursos Educacionais',
    'Planejamento e utilização estratégica dos recursos públicos da educação.',
  ],
  [
    'IDEB e Indicadores Educacionais',
    'Leitura de indicadores e construção de estratégias para melhoria dos resultados.',
  ],
  [
    'SAEB e Avaliações',
    'Transformação de dados e avaliações em decisões pedagógicas.',
  ],
  [
    'FUNDEB',
    'Compreensão e gestão estratégica dos recursos destinados à educação.',
  ],
  [
    'Planejamento Educacional',
    'Construção de metas, estratégias, processos e planos de ação.',
  ],
  [
    'Desenvolvimento de Equipes',
    'Formação de equipes técnicas, coordenadores pedagógicos e lideranças educacionais.',
  ],
];

/** Perguntas frequentes: visíveis na página e no FAQPage do JSON-LD. */
export const INSTITUTE_FAQ: FaqItem[] = [
  {
    question: 'As soluções servem para a realidade da minha rede?',
    answer:
      'As formações são construídas a partir dos desafios reais enfrentados pelas redes públicas de ensino. Mais do que replicar modelos, o Instituto transforma conhecimento, experiência e evidências em estratégias aplicáveis à realidade de cada rede. O formato de cada ação é definido sob consulta.',
  },
  {
    question: 'Para quem são as soluções do Instituto?',
    answer:
      'Para secretários municipais de Educação, equipes técnicas das Secretarias, gestores escolares e coordenadores pedagógicos de redes públicas de ensino.',
  },
  {
    question: 'Quais formatos de trabalho o Instituto oferece?',
    answer:
      'Assessorias técnicas, consultorias, formações continuadas, mentorias formativas e palestras. O trabalho vai do diagnóstico e do planejamento ao apoio técnico para que conhecimento e planejamento sejam efetivamente implementados.',
  },
  {
    question: 'O Instituto atua com IDEB, SAEB e FUNDEB?',
    answer:
      'Sim. Entre as áreas de atuação estão IDEB e indicadores educacionais, com leitura de indicadores e construção de estratégias para melhoria dos resultados; SAEB e avaliações, com a transformação de dados em decisões pedagógicas; e FUNDEB, com a gestão estratégica dos recursos destinados à educação. A atuação inclui ainda alfabetização, liderança e gestão escolar, planejamento educacional e desenvolvimento de equipes.',
  },
  {
    question: 'Quem são as referências por trás do Instituto?',
    answer:
      'O Instituto une Jamilla Salviano, professora especialista em Gestão Escolar, Supervisão Escolar, Docência do Ensino Superior e Orientação Escolar e criadora do Método GPS da Liderança Escolar, e o Prof. Dr. Herbert Lima, ex-Secretário de Educação de Sobral (CE), que liderou por 8 anos o modelo que transformou a cidade na maior referência em alfabetização e qualidade de ensino público do país, alcançando as maiores notas do Ideb no Brasil.',
  },
  {
    question: 'Como começa o trabalho com a minha rede?',
    answer: `Com uma conversa pelo WhatsApp: você conta o momento e os desafios da sua rede, e o atendimento é personalizado. Formato e investimento são definidos sob consulta.${responseTime ? ` Você recebe retorno ${responseTime}.` : ''}`,
  },
];
