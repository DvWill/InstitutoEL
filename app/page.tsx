import type { Metadata } from 'next';
import { InstituteLanding } from '@/components/institute-landing';
import {
  INSTITUTE_AREAS,
  INSTITUTE_DESCRIPTION,
  INSTITUTE_FAQ,
  INSTITUTE_NAME,
} from '@/components/institute-content';
import { JsonLd } from '@/components/json-ld';
import {
  educationalOrganizationNode,
  faqPageNode,
  HOME_SEO,
  homeMetadata,
  jsonLdGraph,
  personNode,
  personRef,
  websiteNode,
} from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = homeMetadata();

// A página apresenta a parceria Jamilla Salviano + Prof. Dr. Herbert Lima
// ("agora faz parte da nossa equipe"); Herbert entra só com o nome.
const structuredData = jsonLdGraph(
  educationalOrganizationNode({
    name: INSTITUTE_NAME,
    description: INSTITUTE_DESCRIPTION,
    logo: '/images/opt/instituto-logo.webp',
    sameAs: [SITE_CONFIG.instagram],
    members: [personRef, { '@type': 'Person', name: 'Herbert Lima' }],
    knowsAbout: INSTITUTE_AREAS.map(([area]) => area),
  }),
  websiteNode(),
  personNode(),
  faqPageNode(HOME_SEO.path, INSTITUTE_FAQ),
);

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <InstituteLanding />
    </>
  );
}
