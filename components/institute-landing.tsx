'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Check,
  ChevronDown,
  Compass,
  GraduationCap,
  Landmark,
  MessageCircle,
  Network,
  Route,
  Target,
} from 'lucide-react';
import { LandingFooter, LandingHeader } from './landing-chrome';
import { LandingFloatingActions, type StickyCta } from './landing-floating-actions';
import {
  INSTITUTE_AREAS,
  INSTITUTE_AUDIENCES,
  INSTITUTE_DESCRIPTION,
  INSTITUTE_FAQ,
  INSTITUTE_NEXT_STEP,
  INSTITUTE_WHATSAPP_MESSAGE,
  INSTITUTE_WHATSAPP_URL,
} from './institute-content';
import styles from './institute-landing.module.css';

/** CTA fixo do celular: abre a mesma conversa de WhatsApp dos CTAs da página. */
const stickyCta: StickyCta = { href: INSTITUTE_WHATSAPP_URL, label: 'Quero falar da minha rede' };

const heroBenefits = [
  { title: 'Liderança educacional', description: 'Desenvolvimento de gestores e equipes.', icon: GraduationCap },
  { title: 'Gestão e estratégia', description: 'Planejamento orientado a resultados.', icon: Compass },
  { title: 'Aprendizagem', description: 'Estratégias que chegam à sala de aula.', icon: BookOpenCheck },
  { title: 'Resultados', description: 'Dados do IDEB e do SAEB transformados em decisões.', icon: Network },
];

const approach = [
  { title: 'Formação', description: 'Formações construídas a partir dos desafios reais enfrentados pelas redes públicas de ensino.', icon: GraduationCap },
  { title: 'Estratégia', description: 'Planejamento, definição de prioridades, metas e construção de planos de ação.', icon: Target },
  { title: 'Acompanhamento', description: 'Apoio técnico para que conhecimento e planejamento sejam efetivamente implementados.', icon: Route },
  { title: 'Resultados', description: 'Uso de dados, avaliações e indicadores para orientar decisões e promover melhoria contínua.', icon: BarChart3 },
];

const solutions = [
  { title: 'Assessorias técnicas', description: 'Acompanhamento especializado para Secretarias de Educação e equipes técnicas.', icon: GraduationCap },
  { title: 'Consultorias', description: 'Diagnóstico, planejamento e desenvolvimento de estratégias educacionais.', icon: Compass },
  { title: 'Formações continuadas', description: 'Programas formativos estruturados para gestores, coordenadores e equipes pedagógicas.', icon: BookOpenCheck },
  { title: 'Mentorias formativas', description: 'Acompanhamento de lideranças para transformar conhecimento em prática de gestão.', icon: Network },
  { title: 'Palestras', description: 'Conteúdos estratégicos para encontros, eventos e desenvolvimento de lideranças.', icon: MessageCircle },
];

const formations = [
  { label: 'Formação 01', title: 'Formação de gestores', description: 'Iniciativas formativas para quem atua na gestão escolar.', image: '/images/opt/instituto-formacao-gestores.webp', alt: 'Gestora conduzindo uma formação sobre planejamento pedagógico para educadores' },
  { label: 'Institucional 02', title: 'Redes de ensino', description: 'Atuação formativa voltada às redes de ensino.', image: '/images/opt/instituto-redes-ensino.webp', alt: 'Formação coletiva sobre planejamento pedagógico para uma rede de ensino' },
  { label: 'Método 03', title: 'GPS 5.0', description: 'Método de Jamilla Salviano integrado à atuação do Instituto.', image: '/images/jamilla-cream.webp', alt: 'Jamilla Salviano em retrato institucional' },
];

const direction = [
  ['Missão', 'Fortalecer redes de ensino por meio da formação de lideranças, do desenvolvimento de equipes e da implementação de estratégias educacionais capazes de transformar conhecimento em aprendizagem e resultados concretos.'],
  ['Visão', 'Ser referência nacional em formação, liderança e desenvolvimento estratégico de redes públicas de ensino, contribuindo para uma educação mais eficiente, equitativa e orientada à aprendizagem.'],
  ['Objetivo institucional', 'Apoiar Secretarias de Educação, equipes técnicas e lideranças escolares na construção de uma gestão educacional mais estratégica.'],
];

const objectives = ['Fortalecer a liderança educacional.', 'Desenvolver gestores e coordenadores pedagógicos.', 'Qualificar processos de alfabetização e aprendizagem.', 'Melhorar indicadores educacionais.', 'Apoiar o planejamento e a gestão eficiente dos recursos.', 'Transformar dados e avaliações em decisões pedagógicas.', 'Criar uma cultura de acompanhamento, responsabilização e melhoria contínua.'];

const values = [
  ['Educação com propósito', 'Toda estratégia precisa chegar ao estudante e contribuir para sua aprendizagem.'],
  ['Resultados com responsabilidade', 'Acreditamos em metas e indicadores, sem perder de vista as pessoas, os contextos e a realidade de cada rede.'],
  ['Excelência técnica', 'Formação educacional precisa ter fundamento, método e aplicabilidade. Não trabalhamos com soluções genéricas para problemas complexos.'],
  ['Liderança que desenvolve pessoas', 'Bons resultados são sustentados por lideranças capazes de orientar, acompanhar, formar e mobilizar suas equipes.'],
  ['Equidade', 'Uma rede avança verdadeiramente quando consegue garantir oportunidades de aprendizagem também para quem mais precisa.'],
  ['Decisões baseadas em evidências', 'SAEB, IDEB, avaliações internas e indicadores devem orientar decisões e não apenas preencher relatórios.'],
  ['Ética e transparência', 'Relações institucionais sólidas são construídas com responsabilidade, clareza e respeito ao interesse público.'],
  ['Melhoria contínua', 'Nenhuma rede precisa permanecer refém dos resultados que possui hoje. Avaliar, corrigir, aprender e avançar fazem parte do processo.'],
];

const photos = [
  ['/images/opt/instituto-formacao-1.webp', 'Liderança na gestão escolar'],
  ['/images/opt/instituto-formacao-2.webp', 'Planejamento colaborativo'],
  ['/images/opt/instituto-formacao-3.webp', 'Acompanhamento pedagógico'],
  ['/images/opt/instituto-formacao-4.webp', 'Formação para equipes'],
  ['/images/opt/instituto-formacao-5.webp', 'Práticas educacionais'],
  ['/images/opt/instituto-formacao-6.webp', 'Aprendizagem em sala de aula'],
];

const herbertHighlights = [
  { value: '8 anos', label: 'À frente da Secretaria de Educação de Sobral (CE), alcançando as maiores notas do Ideb no Brasil.', icon: Landmark },
  { value: '30+ livros', label: 'Obras pedagógicas escritas ou organizadas.', icon: BookOpenCheck },
  { value: 'UFC', label: 'Pesquisador e professor adjunto da Universidade Federal do Ceará.', icon: GraduationCap },
];

/** Acervo documentado da Sala de Conquistas, publicada no site da Jamilla Salviano. */
const recognitions = [
  ['6', 'atestados de capacidade técnica'],
  ['4', 'cartas de recomendação'],
  ['3', 'declarações de palestra'],
  ['2', 'eventos como palestrante'],
  ['1', 'feedback de participante'],
] as const;

const pad = (value: number) => String(value).padStart(2, '0');
const delay = (index: number) => ({ '--i': index }) as CSSProperties;

/** Photo story grid: the 1st and 6th photos span the full row on tablets/phones. */
const photoSizes = (index: number) => index === 0 || index === 5
  ? '(max-width: 900px) calc(100vw - 2.5rem), min(50vw, 582px)'
  : index < 3
    ? '(max-width: 900px) 46vw, min(25vw, 283px)'
    : '(max-width: 900px) 46vw, min(50vw, 582px)';

/**
 * Marks [data-reveal] elements once they enter the viewport. The hidden start
 * state only applies after the root gets `data-reveal-ready`, so the content
 * stays visible when JavaScript does not run. Elements already on screen are
 * shown right away instead of fading in.
 */
function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const pending = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]')).filter((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight) return true;
      element.setAttribute('data-shown', 'true');
      return false;
    });
    root.setAttribute('data-reveal-ready', 'true');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-shown', 'true');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    pending.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return rootRef;
}

export function InstituteLanding() {
  const rootRef = useReveal();
  const [activeSolution, setActiveSolution] = useState(0);
  const [activeDirection, setActiveDirection] = useState(0);

  return <div ref={rootRef} className={styles.page}>
    <LandingHeader />
    <main>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="instituto-title">
        <div className={styles.heroBackdrop} aria-hidden="true">
          {/* Fundo decorativo: o LCP aqui é o H1, então sem prioridade alta (não disputa banda com o CSS). */}
          <Image fill loading="eager" sizes="100vw" src="/images/opt/instituto-formacao-gestores-hero.webp" alt="" />
        </div>
        <span className={styles.heroGlow} aria-hidden="true" />
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <h1 id="instituto-title"><span className={`${styles.badge} ${styles.kicker}`}><span aria-hidden="true" />Formação de gestores para redes de ensino</span> Desenvolvemos líderes, <em>fortalecemos redes</em> e transformamos estratégia em <em>resultados educacionais.</em></h1>
            <p className={styles.heroLead}>O Instituto de Educação e Liderança ajuda Secretarias de Educação, equipes técnicas e lideranças escolares a transformar os desafios reais da educação pública em resultados, com formação, estratégia e acompanhamento.</p>
            <div className={styles.heroActions}>
              <a className={styles.cta} href={INSTITUTE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Quero conversar sobre minha rede<span className={styles.srOnly}> pelo WhatsApp</span><ArrowRight aria-hidden="true" /></a>
              <a className={styles.ghost} href="#solucoes">Conheça nossas soluções</a>
            </div>
            <p className={styles.nextStep}><MessageCircle aria-hidden="true" />{INSTITUTE_NEXT_STEP}</p>
          </div>
          <div className={styles.heroVisual}>
            <span className={styles.orbitOuter} aria-hidden="true"><i /><i /><i /></span>
            <span className={styles.orbitInner} aria-hidden="true"><i /><i /></span>
            <figure className={styles.seal}>
              <Image fill sizes="(max-width: 900px) min(53vw, 261px), 294px" src="/images/opt/instituto-logo.webp" alt="Instituto de Educação e Liderança" />
            </figure>
            <figure className={`${styles.bubble} ${styles.bubbleA}`} aria-hidden="true"><Image fill sizes="(max-width: 900px) min(21vw, 100px), 112px" src="/images/opt/instituto-formacao-2.webp" alt="" /></figure>
            <figure className={`${styles.bubble} ${styles.bubbleB}`} aria-hidden="true"><Image fill sizes="(max-width: 900px) min(18vw, 85px), 95px" src="/images/opt/instituto-educacao-aluno.webp" alt="" /></figure>
            <p className={`${styles.chip} ${styles.chipA}`}><Check aria-hidden="true" />Sobral + Goiás</p>
            <p className={`${styles.chip} ${styles.chipB}`}><Check aria-hidden="true" />Redes públicas de ensino</p>
          </div>
        </div>
        <ul className={`${styles.wrap} ${styles.heroBenefits}`} aria-label="Frentes de atuação do Instituto">
          {heroBenefits.map(({ title, description, icon: Icon }, index) => <li key={title} style={delay(index)}>
            <span className={styles.benefitIcon}><Icon aria-hidden="true" /></span>
            <span><small>{pad(index + 1)}</small><strong>{title}</strong>{description}</span>
          </li>)}
        </ul>
      </section>

      {/* Areas ticker */}
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[...INSTITUTE_AREAS, ...INSTITUTE_AREAS].map(([title], index) => <span key={`${title}-${index}`}>{title}</span>)}
        </div>
      </div>

      {/* About */}
      <section id="sobre-instituto" className={styles.about} aria-labelledby="sobre-title">
        <div className={`${styles.wrap} ${styles.aboutGrid}`}>
          <div className={styles.aboutMedia} data-reveal>
            <figure className={styles.aboutPhoto}><Image fill sizes="(max-width: 900px) calc(100vw - 4rem), min(41vw, 510px)" src="/images/opt/instituto-planejamento-equipe.webp" alt="Equipe pedagógica reunida para analisar planejamento, documentos e dados" /></figure>
            <figure className={styles.aboutPhotoSmall} aria-hidden="true"><Image fill sizes="(max-width: 900px) 38vw, 231px" src="/images/opt/instituto-formacao-4.webp" alt="" /></figure>
            <p className={styles.aboutStamp}><strong>5</strong>formas de atuação</p>
          </div>
          <div data-reveal>
            <p className={styles.eyebrow}>Sobre o Instituto</p>
            <h2 id="sobre-title">Um Instituto para <em>fortalecer a sua rede de ensino.</em></h2>
            <p>{INSTITUTE_DESCRIPTION}</p>
            <p>Realizamos assessorias técnicas, consultorias, palestras, formações continuadas e mentorias formativas para:</p>
            <ul className={styles.audience}>
              {INSTITUTE_AUDIENCES.map((audience) => <li key={audience}><Check aria-hidden="true" />{audience}</li>)}
            </ul>
            <p className={styles.signature}>Estratégia, formação e liderança para redes que querem avançar.</p>
          </div>
        </div>
      </section>

      {/* Partnership and a new chapter */}
      <section className={styles.herbert} aria-labelledby="parceria-title">
        <div className={`${styles.wrap} ${styles.partnershipGrid}`}>
          <div className={styles.partnershipCopy}>
            <p className={styles.eyebrowLight} data-reveal>Uma parceria que transforma</p>
            <h2 id="parceria-title" className={styles.partnershipTitle} data-reveal style={delay(1)}>
              E se a experiência de quem transforma <em>redes de ensino</em> se unisse à expertise de quem transforma <em>líderes escolares?</em>
            </h2>
            <p className={styles.partnershipReality} data-reveal style={delay(2)}>
              <span aria-hidden="true" />Essa união agora é realidade!
            </p>
            <p className={styles.partnershipNames} data-reveal style={delay(3)}>
              <strong>Jamilla Salviano</strong>
              <span className={styles.partnershipPlus}>+</span>
              <strong>Herbert Lima</strong>
            </p>
          </div>

          <figure className={styles.partnershipVisual} data-reveal style={delay(2)}>
            <div className={styles.partnershipPhoto}>
              <Image
                fill
                sizes="(max-width: 760px) calc(100vw - 2.5rem), (max-width: 900px) 580px, min(44vw, 528px)"
                src="/images/opt/jamilla-herbert-parceria.webp"
                alt="Herbert Lima e Jamilla Salviano juntos, falando ao microfone em um encontro de educadores"
              />
            </div>
            <figcaption className={styles.partnershipCaption}>
              <span>Experiências que se somam.</span>
              <strong>Uma educação que avança.</strong>
            </figcaption>
          </figure>
        </div>

        <div className={`${styles.wrap} ${styles.partnershipStatement}`} data-reveal>
          <span className={styles.partnershipSymbol} aria-hidden="true"><Network /></span>
          <p>
            <strong>Duas referências. Uma parceria estratégica.</strong>
            <span>Um novo patamar para a formação de gestores e o fortalecimento da <em>educação pública.</em></span>
          </p>
        </div>

        <div className={`${styles.wrap} ${styles.herbertGrid}`}>
          <div className={styles.herbertCopy} data-reveal>
            <p className={styles.eyebrowLight}>Conheça essa trajetória</p>
            <h2 id="herbert-title">A experiência de Sobral <em>a serviço da sua rede.</em></h2>
            <p className={styles.herbertLead}>Prof. Dr. Herbert Lima agora faz parte da nossa equipe!</p>
            <div className={styles.herbertText}>
              <p>É com enorme orgulho e entusiasmo que anunciamos a chegada de um dos maiores nomes da educação brasileira ao nosso time: o Prof. Dr. Herbert Lima.</p>
              <p>Ex-Secretário de Educação de Sobral (CE), Herbert liderou por 8 anos o modelo que transformou a cidade na maior referência em alfabetização e qualidade de ensino público do país, alcançando as maiores notas do Ideb no Brasil.</p>
              <p>Além de sua sólida trajetória como gestor público, ele trará para a nossa equipe toda a sua bagagem acadêmica como Doutor em Engenharia de Teleinformática, pesquisador e professor adjunto da UFC, além da experiência de ter escrito e organizado mais de 30 livros na área pedagógica.</p>
              <p>Sua chegada reforça o nosso compromisso com a excelência, a inovação e a transformação real. Juntos, vamos desenhar o futuro da formação de gestores e do fortalecimento das redes públicas de ensino.</p>
            </div>
          </div>

          <div className={styles.herbertVisual} data-reveal>
            <figure className={styles.herbertPortrait} data-reveal style={delay(1)}>
              <Image fill sizes="(max-width: 900px) min(calc(100vw - 4rem), 496px), 496px" src="/images/opt/herbert-lima-auditorio.webp" alt="Prof. Dr. Herbert Lima falando ao microfone para uma plateia" />
            </figure>
            <figure className={styles.herbertDetail} data-reveal style={delay(2)}>
              <Image fill sizes="(max-width: 900px) 45vw, 270px" src="/images/opt/herbert-lima-palestra.webp" alt="Prof. Dr. Herbert Lima durante uma palestra" />
            </figure>
          </div>
        </div>

        <ul className={`${styles.wrap} ${styles.herbertHighlights}`} aria-label="Indicadores da trajetória do Professor Herbert Lima">
          {herbertHighlights.map(({ value, label, icon: Icon }, index) => <li key={value} data-reveal style={delay(index)}>
            <span className={styles.herbertHighlightIcon}><Icon aria-hidden="true" /></span>
            <span><strong>{value}</strong><small>{label}</small></span>
          </li>)}
        </ul>
      </section>

      {/* Jamilla and documented recognitions */}
      <section className={styles.proof} aria-labelledby="prova-title">
        <div className={`${styles.wrap} ${styles.proofGrid}`}>
          <div className={styles.proofCopy} data-reveal>
            <p className={styles.eyebrow}>Com Jamilla Salviano</p>
            <h2 id="prova-title">Experiência de escola pública, <em>reconhecida por redes públicas.</em></h2>
            <p>Jamilla Salviano é professora especialista em Gestão Escolar, Supervisão Escolar, Docência do Ensino Superior e Orientação Escolar. Atua como assessora e consultora educacional, mentora de gestores e palestrante em liderança escolar.</p>
            <p>Sua trajetória reúne experiência como professora, coordenadora, supervisora e diretora de escola pública de grande porte — repertório que aproxima cada formação das situações reais de quem lidera na educação.</p>
            <ul className={styles.proofCredentials}>
              <li><BookOpenCheck aria-hidden="true" /><span>Autora do livro <strong>O Inimigo Oculto da Gestão Escolar</strong></span></li>
              <li><Compass aria-hidden="true" /><span>Criadora do <strong>Método GPS da Liderança Escolar</strong></span></li>
            </ul>
          </div>
          <div className={styles.proofCard} data-reveal style={delay(1)}>
            <p className={styles.proofNumber}><strong>16</strong> <span>reconhecimentos documentados</span></p>
            <ul className={styles.proofBreakdown}>
              {recognitions.map(([count, label]) => <li key={label}><b>{count}</b> {label}</li>)}
            </ul>
            <p>Deles, 14 foram emitidos por instituições públicas, como as Secretarias Municipais de Educação de Luziânia, Valparaíso de Goiás e Lagoa Grande, as Prefeituras de São Vicente, Crisópolis, Colniza e São João Evangelista, o IFMA e a Polícia Militar do Maranhão.</p>
            <p className={styles.proofNote}>Em Colniza (MT) e São João Evangelista (MG), os atestados registram palestras on-line realizadas pelo Instituto de Educação e Liderança para as redes municipais.</p>
          </div>
        </div>
      </section>

      {/* Photo story */}
      <section className={styles.photos} aria-labelledby="photo-story-title">
        <div className={styles.wrap}>
          <header className={styles.headingSplit} data-reveal>
            <div>
              <p className={styles.eyebrow}>Na prática</p>
              <h2 id="photo-story-title">Formação que acontece <em>junto das pessoas.</em></h2>
            </div>
          </header>
          <div className={styles.photoGrid}>
            {photos.map(([src, alt], index) => <figure key={src} className={styles.photo} data-reveal style={delay(index)}>
              <Image fill sizes={photoSizes(index)} src={src} alt={alt} />
              <figcaption>{alt}</figcaption>
            </figure>)}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="metodologia" className={styles.approach} aria-labelledby="abordagem-title">
        <div className={styles.wrap}>
          <header className={styles.headingCenter} data-reveal>
            <p className={styles.eyebrow}>Nossa abordagem</p>
            <h2 id="abordagem-title">Conhecimento que se transforma em estratégia, ação e <em>resultado.</em></h2>
          </header>
          <ol className={styles.flow} data-reveal>
            {approach.map(({ title, description, icon: Icon }, index) => <li key={title} style={delay(index)}>
              <span className={styles.flowIcon}><Icon aria-hidden="true" /></span>
              <small>Etapa {pad(index + 1)}</small>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>)}
          </ol>
        </div>
      </section>

      {/* Areas */}
      <section id="areas" className={styles.areas} aria-labelledby="areas-title">
        <div className={styles.wrap}>
          <header className={styles.headingSplit} data-reveal>
            <div>
              <p className={styles.eyebrowLight}>Áreas de atuação</p>
              <h2 id="areas-title">Expertise em IDEB, SAEB e nos principais <em>desafios das redes de ensino.</em></h2>
            </div>
            <p className={styles.headingNote}>Assessoria integrada, da alfabetização aos indicadores do IDEB e do SAEB, para transformar os desafios da educação pública em estratégias consistentes.</p>
          </header>
          <div className={styles.areaGrid}>
            {INSTITUTE_AREAS.map(([title, description], index) => <article key={title} className={styles.area} data-reveal style={delay(index % 4)}>
              <span>{pad(index + 1)}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>)}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solucoes" className={styles.solutions} aria-labelledby="solucoes-title">
        <div className={`${styles.wrap} ${styles.solutionsGrid}`}>
          <div data-reveal>
            <p className={styles.eyebrow}>Como atuamos</p>
            <h2 id="solucoes-title">Soluções construídas para a <em>realidade de cada rede.</em></h2>
            <p className={styles.solutionsNote}>O formato de cada ação é definido sob consulta, a partir do momento e dos desafios da sua rede.</p>
            <a className={styles.cta} href={INSTITUTE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Quero conversar sobre minha rede<span className={styles.srOnly}> pelo WhatsApp</span><ArrowRight aria-hidden="true" /></a>
          </div>
          <ol className={styles.solutionList} data-reveal>
            {solutions.map(({ title, description, icon: Icon }, index) => <li key={title}>
              <button type="button" data-active={index === activeSolution} aria-expanded={index === activeSolution} onClick={() => setActiveSolution(index)} onMouseEnter={() => setActiveSolution(index)}>
                <span className={styles.solutionNumber}>{pad(index + 1)}</span>
                <span className={styles.solutionText}>
                  <strong>{title}</strong>
                  <span className={styles.solutionDetail}><span>{description}</span></span>
                </span>
                <span className={styles.solutionIcon}><Icon aria-hidden="true" /></span>
              </button>
            </li>)}
          </ol>
        </div>
      </section>

      {/* Formations */}
      <section id="formacoes" className={styles.formations} aria-labelledby="formacoes-title">
        <div className={styles.wrap}>
          <header className={styles.headingCenter} data-reveal>
            <p className={styles.eyebrow}>Ações e formações</p>
            <h2 id="formacoes-title">Liderança e gestão <em>acontecendo na prática.</em></h2>
          </header>
          <div className={styles.formationGrid}>
            {formations.map((formation, index) => <article key={formation.title} className={styles.formation} data-reveal style={delay(index)}>
              <Image fill sizes="(max-width: 900px) calc(100vw - 2.5rem), min(31vw, 380px)" src={formation.image} alt={formation.alt} />
              <div>
                <span>{formation.label}</span>
                <h3>{formation.title}</h3>
                <p>{formation.description}</p>
              </div>
            </article>)}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className={styles.experience} aria-labelledby="experiencia-title">
        <div className={styles.wrap}>
          <div className={styles.experienceIntro} data-reveal>
            <div>
              <p className={styles.eyebrow}>Experiência que gera resultados</p>
              <h2 id="experiencia-title">Duas experiências. Um propósito: <em>fazer redes avançarem.</em></h2>
            </div>
            <div className={styles.experienceCopy}>
              <p>Nossa proposta nasce da união de experiências construídas em dois importantes contextos educacionais brasileiros: a expertise desenvolvida em Sobral, referência nacional em educação pública, somada à experiência e às práticas desenvolvidas em Goiás.</p>
              <p>Mais do que replicar modelos, transformamos conhecimento, experiência e evidências em estratégias aplicáveis à realidade de cada rede de ensino.</p>
            </div>
          </div>
          <div className={styles.equation} data-reveal>
            <article style={delay(0)}><small>Sobral</small><p>Referência nacional em educação pública.</p></article>
            <span className={styles.operator} style={delay(1)} aria-hidden="true">+</span>
            <article style={delay(2)}><small>Goiás</small><p>Experiência, gestão e práticas desenvolvidas em diferentes realidades educacionais.</p></article>
            <span className={styles.operator} style={delay(3)} aria-hidden="true">=</span>
            <article className={styles.result} style={delay(4)}><small>Instituto de Educação e Liderança</small><p>Conhecimento transformado em estratégia.</p></article>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className={styles.manifesto} aria-label="Posicionamento institucional">
        <div className={styles.wrap} data-reveal>
          <blockquote>
            <span>Redes de ensino não precisam de mais uma formação.</span>
            <span>Precisam de formação séria, <em>acompanhamento estratégico</em> e conhecimento que se transforma em prática.</span>
          </blockquote>
          <p className={styles.manifestoSign}><strong>Instituto de Educação e Liderança</strong>Estratégia, formação e liderança para redes que querem avançar.</p>
          <a className={styles.cta} href={INSTITUTE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Quero fortalecer minha rede<span className={styles.srOnly}> pelo WhatsApp</span><ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      {/* Direction */}
      <section id="missao" className={styles.direction} aria-labelledby="direcionamento-title">
        <div className={`${styles.wrap} ${styles.directionGrid}`}>
          <div data-reveal>
            <p className={styles.eyebrow}>Nosso direcionamento</p>
            <h2 id="direcionamento-title">Propósito que orienta <em>cada decisão.</em></h2>
            <div className={styles.tabs} role="tablist" aria-label="Direcionamento do Instituto">
              {direction.map(([title], index) => <button key={title} type="button" role="tab" id={`direction-tab-${index}`} aria-controls="direction-panel" aria-selected={index === activeDirection} onClick={() => setActiveDirection(index)}>{title}</button>)}
            </div>
            <div key={activeDirection} id="direction-panel" role="tabpanel" aria-labelledby={`direction-tab-${activeDirection}`} className={styles.tabPanel}>
              <span aria-hidden="true">{pad(activeDirection + 1)}</span>
              <p>{direction[activeDirection][1]}</p>
            </div>
          </div>
          <div className={styles.objectives} data-reveal>
            <h3>Na prática, buscamos:</h3>
            <ul>
              {objectives.map((objective, index) => <li key={objective} style={delay(index)}><Check aria-hidden="true" />{objective}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="valores" className={styles.values} aria-labelledby="valores-title">
        <div className={styles.wrap}>
          <header className={styles.headingCenter} data-reveal>
            <p className={styles.eyebrow}>Nossos valores</p>
            <h2 id="valores-title">Princípios que sustentam nossa forma de <em>transformar.</em></h2>
          </header>
          <div className={styles.valueGrid}>
            {values.map(([title, description], index) => <article key={title} className={styles.value} data-reveal style={delay(index % 4)}>
              <span>{pad(index + 1)}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>)}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impacto" className={styles.impact} aria-label="Impacto da educação na sala de aula">
        <div className={styles.impactMedia} aria-hidden="true">
          <Image fill sizes="100vw" src="/images/opt/instituto-impacto-sala-aula.webp" alt="" />
        </div>
        <div className={styles.wrap} data-reveal>
          <p className={styles.impactPhrase}>Desenvolvemos líderes, <em>fortalecemos redes</em> e transformamos estratégia em <em>resultados educacionais.</em></p>
        </div>
      </section>

      {/* FAQ */}
      <section id="duvidas" className={styles.faq} aria-labelledby="faq-title">
        <div className={`${styles.wrap} ${styles.faqGrid}`}>
          <header data-reveal>
            <p className={styles.eyebrow}>Perguntas frequentes</p>
            <h2 id="faq-title">Tire suas dúvidas antes de <em>conversar com o Instituto.</em></h2>
            <p>O essencial para saber se o Instituto atende a realidade da sua rede e como começar.</p>
          </header>
          <div className={styles.faqList} data-reveal>
            {INSTITUTE_FAQ.map(({ question, answer }, index) => <details key={question} className={styles.faqItem} open={index === 0}>
              <summary>{question}<ChevronDown aria-hidden="true" /></summary>
              <p>{answer}</p>
            </details>)}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className={styles.closing} aria-labelledby="contato-title">
        <div className={`${styles.wrap} ${styles.closingGrid}`}>
          <div data-reveal>
            <p className={styles.eyebrowLight}>Vamos avançar</p>
            <h2 id="contato-title">Sua rede pode avançar <em>ainda mais.</em></h2>
            <p>Conte com formação, estratégia e acompanhamento para transformar desafios em resultados.</p>
            <div className={styles.heroActions}>
              <a className={styles.cta} href={INSTITUTE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Quero conversar sobre minha rede<span className={styles.srOnly}> pelo WhatsApp</span><ArrowRight aria-hidden="true" /></a>
            </div>
            <p className={styles.nextStep}><MessageCircle aria-hidden="true" />{INSTITUTE_NEXT_STEP}</p>
          </div>
          <figure className={styles.closingPhoto} data-reveal>
            <Image fill sizes="(max-width: 440px) calc(100vw - 2.5rem), 24rem" src="/images/jamilla-cream.webp" alt="Jamilla Salviano em retrato institucional" />
          </figure>
        </div>
      </section>
    </main>
    <LandingFooter whatsappMessage={INSTITUTE_WHATSAPP_MESSAGE} />
    <LandingFloatingActions whatsappLabel="Fale com o Instituto" whatsappMessage={INSTITUTE_WHATSAPP_MESSAGE} stickyCta={stickyCta} />
  </div>;
}
