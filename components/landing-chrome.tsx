import Image from 'next/image';
import { FooterAgencyCredit } from './footer-agency-credit';
import { SITE_CONFIG, whatsappUrl } from '@/lib/site-config';
import styles from './landing-chrome.module.css';

/**
 * Moldura da página: topo só com a marca (sem links) e rodapé mínimo
 * (logo, Instagram, WhatsApp, links legais e copyright).
 * O botão flutuante de WhatsApp e o CTA fixo do celular ficam em
 * `LandingFloatingActions` (componente de cliente).
 */

export function LandingHeader() {
  return (
    <header className={`site-header landing-header ${styles.header}`}>
      <div className="header-inner">
        <p className={`logo ${styles.logo}`}>
          <strong>INSTITUTO</strong>
          <span>DE EDUCAÇÃO E LIDERANÇA</span>
        </p>
      </div>
    </header>
  );
}

type LandingFooterProps = {
  /** Mensagem pré-preenchida do link de WhatsApp do rodapé. */
  whatsappMessage: string;
};

export function LandingFooter({ whatsappMessage }: LandingFooterProps) {
  return (
    <footer className={`site-footer ${styles.footer}`}>
      <div className={`wrap ${styles.footerInner}`}>
        <div className={styles.footerBrand}>
          <Image
            className={styles.footerLogo}
            src="/images/opt/instituto-logo.webp"
            alt="Instituto de Educação e Liderança"
            width={900}
            height={900}
            sizes="120px"
          />
        </div>

        <nav
          className={styles.footerLinks}
          aria-label="Contato e redes sociais"
        >
          <a
            href={SITE_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href={whatsappUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          {SITE_CONFIG.legalLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <FooterAgencyCredit className={styles.credit} />

        <p className={`copyright ${styles.copyright}`}>
          © 2026 Instituto de Educação e Liderança. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
