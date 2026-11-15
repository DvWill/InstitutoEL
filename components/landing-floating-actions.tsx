'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { WhatsAppButton } from './whatsapp-button';
import styles from './landing-chrome.module.css';

export type StickyCta = {
  /** Checkout, âncora da oferta (#oferta) ou link de WhatsApp. */
  href: string;
  /** Rótulo curto em 1ª pessoa, ex.: "Quero minha vaga". */
  label: string;
  /** Complemento opcional à direita, ex.: "R$ 37,90". */
  detail?: string;
};

type LandingFloatingActionsProps = {
  /** Texto do botão flutuante de WhatsApp (aparece no desktop). */
  whatsappLabel: string;
  /** Mensagem pré-preenchida, específica da página. */
  whatsappMessage: string;
  /** CTA fixo no rodapé do celular. Aparece depois que o herói sai da tela. */
  stickyCta?: StickyCta;
};

/**
 * Botão flutuante de WhatsApp + CTA fixo no rodapé (só no celular, até 620px).
 * O CTA fica à esquerda do botão redondo do WhatsApp, na mesma linha de base,
 * sem sobrepor nenhum dos dois.
 */
export function LandingFloatingActions({
  whatsappLabel,
  whatsappMessage,
  stickyCta,
}: LandingFloatingActionsProps) {
  const [isBarVisible, setIsBarVisible] = useState(false);
  // Depende de um valor primitivo: páginas que passam um objeto literal não
  // reinscrevem os listeners de rolagem a cada renderização.
  const stickyHref = stickyCta?.href;

  useEffect(() => {
    if (!stickyHref) return;
    let pastHero = false;
    // Âncora na própria página (ex.: #proposta): o CTA some enquanto o destino
    // está na tela, para não mostrar dois botões iguais lado a lado.
    let targetOnScreen = false;
    const apply = () => setIsBarVisible(pastHero && !targetOnScreen);
    const update = () => {
      pastHero = window.scrollY > window.innerHeight * 0.65;
      apply();
    };
    const target = stickyHref.startsWith('#')
      ? document.getElementById(decodeURIComponent(stickyHref.slice(1)))
      : null;
    const observer =
      target && 'IntersectionObserver' in window
        ? new IntersectionObserver((entries) => {
            targetOnScreen = entries.some((entry) => entry.isIntersecting);
            apply();
          })
        : null;
    if (target && observer) observer.observe(target);
    const initialFrame = window.requestAnimationFrame(update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer?.disconnect();
    };
  }, [stickyHref]);

  const isExternal = stickyCta?.href.startsWith('http');

  return (
    <>
      {stickyCta ? (
        <a
          className={`${styles.stickyCta}${isBarVisible ? ` ${styles.stickyCtaVisible}` : ''}`}
          href={stickyCta.href}
          aria-hidden={!isBarVisible}
          tabIndex={isBarVisible ? 0 : -1}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <span className={styles.stickyLabel}>{stickyCta.label}</span>
          {stickyCta.detail ? (
            <span className={styles.stickyDetail}>{stickyCta.detail}</span>
          ) : null}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      ) : null}
      <WhatsAppButton label={whatsappLabel} message={whatsappMessage} />
    </>
  );
}
