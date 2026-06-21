import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
  aiGuidanceRows,
  approachSteps,
  beforeAfterExamples,
  beliefs,
  bestFit,
  capabilities,
  ctas,
  faqs,
  homePainPoints,
  homeServices,
  notFor,
  priceFactors,
  pricingExclusions,
  pricingRows,
  privacyProjectChecks,
  privacySensitiveItems,
  routes,
  safeAiHelps,
  safeAiIncluded,
  serviceSelectorRows,
  services,
  suitableAiUses,
  typicalProjects,
  unsuitableAiUses
} from './siteContent';

const routeMap = new Map(routes.map((route) => [route.path, route]));
const knownPaths = new Set(routes.map((route) => route.path));
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } }
};

function readLocation() {
  return {
    path: normalizePath(window.location.pathname),
    search: window.location.search,
    hash: window.location.hash
  };
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function getMeta(path) {
  return routeMap.get(path) || routeMap.get('/');
}

function setMeta(page) {
  document.title = page.seoTitle;
  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.setAttribute('name', 'description');
    document.head.appendChild(description);
  }
  description.setAttribute('content', page.metaDescription);
}

function App() {
  const [location, setLocation] = useState(readLocation);
  const mainRef = useRef(null);
  const page = getMeta(location.path);

  useEffect(() => {
    const handlePopState = () => setLocation(readLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest('a[href]');
      if (!anchor) return;

      const url = new URL(anchor.href);
      const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      const isSameOrigin = url.origin === window.location.origin;
      const path = normalizePath(url.pathname);

      if (isModifiedClick || anchor.target || !isSameOrigin || !knownPaths.has(path)) return;

      event.preventDefault();
      const nextUrl = `${path}${url.search}${url.hash}`;
      if (nextUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
        window.history.pushState({}, '', nextUrl);
      }
      setLocation(readLocation());
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    setMeta(page);
  }, [page]);

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.replace('#', ''));
      if (target) {
        target.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0 });
    mainRef.current?.focus({ preventScroll: true });
  }, [location.path, location.search, location.hash]);

  return (
    <div className="min-h-screen bg-surface font-body-lg text-on-surface antialiased selection:bg-secondary/30 selection:text-primary">
      <Navbar currentPath={location.path} />
      <main ref={mainRef} tabIndex="-1" className="outline-none">
        <PageRenderer path={location.path} search={location.search} />
      </main>
      <Footer />
    </div>
  );
}

function PageRenderer({ path, search }) {
  switch (path) {
    case '/services':
      return <ServicesPage />;
    case '/pricing':
      return <PricingPage />;
    case '/safe-ai':
      return <SafeAiPage />;
    case '/about':
      return <AboutPage />;
    case '/faq':
      return <FaqPage />;
    case '/contact':
      return <ContactPage search={search} />;
    case '/privacy-and-data-handling':
      return <PrivacyPage />;
    case '/terms-of-use':
      return <TermsPage />;
    case '/website-disclaimer':
      return <DisclaimerPage />;
    default:
      return <HomePage />;
  }
}

function ButtonLink({ href, children, variant = 'primary', icon = 'arrow_forward', className = '' }) {
  const styles = {
    primary: 'bg-primary text-on-primary border-primary shadow-md hover:opacity-95',
    secondary: 'bg-white text-primary border-primary hover:bg-primary hover:text-on-primary',
    mint: 'bg-secondary-fixed text-on-secondary-fixed border-secondary-fixed shadow-md hover:opacity-95',
    quiet: 'bg-surface-container-low text-primary border-outline-variant hover:border-primary'
  };

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-sm rounded-xl border px-lg py-md font-headline-sm text-[18px] leading-6 transition-colors ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      {icon ? (
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </a>
  );
}

function Section({ children, className = '', id }) {
  return (
    <section id={id} className={`px-lg py-xxl ${className}`}>
      <motion.div
        className="mx-auto max-w-container-max"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, children, className = '', inverse = false }) {
  return (
    <div className={`max-w-4xl ${className}`}>
      {eyebrow ? (
        <p className={`mb-sm font-label-md text-label-md uppercase ${inverse ? 'text-secondary-fixed' : 'text-secondary'}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`mb-md font-display-lg text-display-lg-mobile md:text-display-lg ${inverse ? 'text-white' : 'text-primary'}`}>
        {title}
      </h2>
      {children ? (
        <div className={`space-y-md font-body-lg text-body-lg ${inverse ? 'text-inverse-on-surface' : 'text-on-surface-variant'}`}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

function PageHero({ eyebrow, title, children, actions, compact = false }) {
  return (
    <motion.section
      className={`px-lg ${compact ? 'pb-xl pt-[132px]' : 'pb-xxl pt-[144px]'} bg-surface`}
      variants={fadeIn}
      initial="hidden"
      animate="show"
    >
      <div className="mx-auto grid max-w-container-max gap-xl lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <motion.div className="max-w-4xl" variants={stagger} initial="hidden" animate="show">
          {eyebrow ? (
            <motion.p variants={fadeUp} className="mb-md inline-flex rounded-[999px] border border-secondary/20 bg-secondary-container px-md py-xs font-label-sm text-label-sm uppercase text-on-secondary-container">
              {eyebrow}
            </motion.p>
          ) : null}
          <motion.h1 variants={fadeUp} className="mb-md font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
            {title}
          </motion.h1>
          <motion.div variants={fadeUp} className="space-y-md font-body-lg text-body-lg text-on-surface-variant">{children}</motion.div>
          {actions ? <motion.div variants={fadeUp} className="mt-xl flex flex-col gap-md sm:flex-row sm:flex-wrap">{actions}</motion.div> : null}
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.12 }}>
          <BoundaryCard />
        </motion.div>
      </div>
    </motion.section>
  );
}

function BoundaryCard() {
  return (
    <aside className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
      <div className="mb-md flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
        <span className="material-symbols-outlined" aria-hidden="true">
          verified_user
        </span>
      </div>
      <p className="mb-sm font-headline-sm text-headline-sm text-primary">Practical implementation partner</p>
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        Workflow, automation, dashboard and safe AI support for internal operations. Legal, clinical, audit and
        regulatory responsibilities remain with the client.
      </p>
    </aside>
  );
}

function BulletList({ items, columns = false, tone = 'default' }) {
  const icon = tone === 'boundary' ? 'block' : 'check';
  const iconColor = tone === 'boundary' ? 'text-error' : 'text-secondary';

  return (
    <ul className={`grid gap-sm ${columns ? 'sm:grid-cols-2' : ''}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-sm font-body-md text-body-md text-on-surface-variant">
          <span className={`material-symbols-outlined mt-[2px] text-[18px] ${iconColor}`} aria-hidden="true">
            {icon}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoCard({ icon, title, children, className = '' }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-xl border border-outline-variant bg-white p-lg shadow-sm transition-shadow hover:shadow-lg ${className}`}
    >
      {icon ? (
        <div className="mb-md flex h-11 w-11 items-center justify-center rounded-lg bg-surface-container text-primary">
          <span className="material-symbols-outlined" aria-hidden="true">
            {icon}
          </span>
        </div>
      ) : null}
      <h3 className="mb-sm font-headline-sm text-headline-sm text-primary">{title}</h3>
      <div className="font-body-md text-body-md text-on-surface-variant">{children}</div>
    </motion.div>
  );
}

function ResponsiveRows({ columns, rows, emphasisLast = false }) {
  return (
    <motion.div variants={fadeUp} className="overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm">
      <div
        className="responsive-table-header hidden gap-md bg-primary px-lg py-md font-label-md text-label-md uppercase text-white md:grid"
        style={{ '--row-columns': columns.map((column) => column.width || '1fr').join(' ') }}
      >
        {columns.map((column) => (
          <span key={column.label} className={column.align === 'right' ? 'text-right' : ''}>
            {column.label}
          </span>
        ))}
      </div>
      {rows.map((row) => (
        <div
          key={row.join('|')}
          className="responsive-table-row grid grid-cols-1 gap-md border-t border-outline-variant px-lg py-lg md:gap-md md:py-md"
          style={{ '--row-columns': columns.map((column) => column.width || '1fr').join(' ') }}
        >
          {row.map((cell, index) => (
            <div key={`${cell}-${index}`} className={columns[index].align === 'right' ? 'md:text-right' : ''}>
              <p className="mb-xs font-label-sm text-label-sm uppercase text-outline md:hidden">{columns[index].label}</p>
              <p
                className={
                  index === 0 || (emphasisLast && index === row.length - 1)
                    ? 'font-headline-sm text-headline-sm text-primary'
                    : 'font-body-md text-body-md text-on-surface-variant'
                }
              >
                {cell}
              </p>
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

function HomePage() {
  return (
    <>
      <motion.section className="relative overflow-hidden px-lg pb-xxl pt-[144px]" variants={fadeIn} initial="hidden" animate="show">
        <div className="mx-auto grid max-w-container-max gap-xl lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div className="max-w-3xl" variants={stagger} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="mb-md inline-flex max-w-full whitespace-normal rounded-[999px] border border-secondary/20 bg-secondary-container px-md py-xs font-label-sm text-label-sm uppercase text-on-secondary-container">
              Workflow systems for Australian health practices
            </motion.p>
            <motion.h1 variants={fadeUp} className="mb-md break-words font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
              Clearer workflows for Australian health practices.
            </motion.h1>
            <motion.p variants={fadeUp} className="mb-md font-body-lg text-body-lg text-on-surface-variant">
              Heutrix Labs helps GP clinics, allied health practices and specialist providers clean up messy admin,
              scattered spreadsheets, manual follow-up and unsafe AI use.
            </motion.p>
            <motion.p variants={fadeUp} className="mb-lg font-body-lg text-body-lg text-on-surface-variant">
              We map how the work actually happens, then build practical improvements such as workflow trackers,
              dashboards, automations, handover systems and safe AI rules.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col gap-md sm:flex-row sm:flex-wrap">
              <ButtonLink href={ctas.fitCall.href}>{ctas.fitCall.label}</ButtonLink>
              <ButtonLink href={ctas.services.href} variant="secondary" icon={null}>
                {ctas.services.label}
              </ButtonLink>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-md max-w-2xl font-body-sm text-body-sm text-on-surface-variant">
              For practice owners and managers who need clearer workflows, better visibility and safer use of
              technology without disrupting patient care.
            </motion.p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.22 }}>
            <DashboardPreview />
          </motion.div>
        </div>
      </motion.section>

      <Section id="workflow-pressure" className="bg-primary text-on-primary">
        <SectionIntro
          title="When important work is spread across memory, inboxes and spreadsheets, even capable teams can lose visibility."
          className="mb-xl"
          inverse
        >
          <p>
            Many practice teams are highly capable, but the systems around them have not always kept up with growth,
            staff changes, patient demand or disconnected tools. Heutrix Labs helps identify where important admin and
            operational work needs clearer ownership, tracking, reminders, handover or review.
          </p>
        </SectionIntro>
        <h3 className="mb-lg font-headline-md text-headline-md text-secondary-fixed">You may notice:</h3>
        <motion.div className="grid gap-md md:grid-cols-2 lg:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
          {homePainPoints.map((item) => (
            <motion.div key={item} variants={fadeUp} className="rounded-xl border border-white/15 bg-white/10 p-lg shadow-sm backdrop-blur-sm">
              <div className="mb-sm flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-fixed/20 text-secondary-fixed">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary-fixed" aria-hidden="true" />
              </div>
              <p className="font-body-md text-body-md text-white">{item}</p>
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-xl max-w-4xl border-l-4 border-secondary-fixed pl-lg font-body-lg text-body-lg text-inverse-on-surface">
          Heutrix Labs helps turn these pressure points into clearer workflows, practical tracking systems, safer AI
          practices and better visibility for day-to-day decisions.
        </p>
      </Section>

      <Section id="home-services" className="bg-surface">
        <SectionIntro title="Practical ways we can help." className="mx-auto mb-xl text-center" />
        <motion.div className="grid gap-lg md:grid-cols-2 xl:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
          {homeServices.map((service) => (
            <ServiceSummaryCard key={service.title} service={service} />
          ))}
        </motion.div>
      </Section>

      <DiagnosticMethodSection />

      <Section className="bg-surface-container-low">
        <div className="grid gap-xl lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionIntro title="What Heutrix Labs does">
            <p>
              Heutrix Labs helps health practices improve the internal systems that sit around patient care. We are not
              here to replace your practice management software or add unnecessary complexity.
            </p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={capabilities} columns />
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="Make your practice easier to run without compromising patient trust.">
            <p>
              A health practice does not need technology for its own sake. It needs systems that support the people
              already doing the work.
            </p>
            <p>
              As practices grow, the operational work around patient care can become harder to coordinate. Enquiries
              need follow-up. Referrals need tracking. Staff need clear handovers. Managers need to know what is
              happening without chasing updates. Sensitive information needs to be handled carefully.
            </p>
            <p>
              Heutrix Labs starts by understanding how your practice actually works, then recommends practical
              improvements that are safe, maintainable and useful in daily operations.
            </p>
          </SectionIntro>
          <InfoCard icon="health_and_safety" title="Privacy-aware by design">
            <p>
              Health practices handle sensitive information. Any workflow, dashboard, automation or AI setup needs to
              consider privacy, confidentiality, access controls and minimum necessary data use from the start.
            </p>
          </InfoCard>
        </div>
      </Section>

      <Section>
        <div className="grid gap-xl lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionIntro title="Which service is right for you?">
            <p>
              Most practices start with either a free fit call or a Workflow Diagnostic. If the workflow is already
              clear, we can move straight to a scoped build.
            </p>
          </SectionIntro>
          <ResponsiveRows
            columns={[
              { label: 'Situation', width: '1.2fr' },
              { label: 'Best starting point', width: '0.9fr' }
            ]}
            rows={serviceSelectorRows}
            emphasisLast
          />
        </div>
      </Section>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Before and after examples" className="mb-xl" />
        <div className="grid gap-lg md:grid-cols-2">
          {beforeAfterExamples.map((example) => (
            <InfoCard key={example.title} icon="sync_alt" title={example.title}>
              <p className="mb-sm">
                <strong className="text-primary">Before:</strong> {example.before}
              </p>
              <p>
                <strong className="text-primary">After:</strong> {example.after}
              </p>
            </InfoCard>
          ))}
        </div>
      </Section>

      <Section>
        <SectionIntro title="Our approach" className="mb-xl" />
        <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-4">
          {approachSteps.map(([title, copy]) => (
            <InfoCard key={title} title={title}>
              <p>{copy}</p>
            </InfoCard>
          ))}
        </div>
      </Section>

      <Section className="bg-surface-container-low">
        <div className="grid gap-lg lg:grid-cols-2">
          <InfoCard icon="lock" title="Privacy-aware by design">
            <p>
              Heutrix Labs does not recommend copying patient, participant, health, clinical, Medicare, diagnostic or
              other sensitive information into AI tools unless there is a documented, privacy-reviewed and approved
              process.
            </p>
          </InfoCard>
          <InfoCard icon="rule" title="Important boundary">
            <p>
              Heutrix Labs provides workflow, automation, dashboard and safe AI support. It does not provide official
              audit certification, legal advice, clinical advice or regulatory approval.
            </p>
          </InfoCard>
        </div>
      </Section>

      <CtaSection
        title="Ready to make one workflow easier to manage?"
        body="Start with a free fit call. We will discuss what is happening now, whether Heutrix Labs is the right fit, and what a sensible next step could look like."
      />
    </>
  );
}

function DiagnosticMethodSection() {
  const methodSteps = [
    ['1', 'Diagnostic', 'Finding the workflow gaps'],
    ['2', 'Process', 'Uncovering manual steps and handover points'],
    ['3', 'Automation', 'Reducing repeated admin where it is sensible'],
    ['4', 'Safe AI', 'Setting practical rules with human review']
  ];

  const practiceTypes = ['GP', 'AH', 'SP'];

  return (
    <Section className="bg-surface-container-low overflow-hidden">
      <div className="grid gap-xxl lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.p variants={fadeUp} className="mb-sm font-label-md text-label-md uppercase text-secondary">
            Workflow first
          </motion.p>
          <motion.h2 variants={fadeUp} className="mb-md font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
            We diagnose before we build.
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-lg font-body-lg text-body-lg text-on-surface-variant">
            Good operational improvement starts with understanding the workflow. Before recommending a system,
            dashboard, automation or AI-supported workflow, we look at what triggers the process, who is involved, where
            work gets stuck, and what risks need to be controlled. Then we recommend the simplest useful solution.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-xl rounded-xl border border-error/20 bg-error-container/55 p-lg text-on-error-container">
            <div className="flex items-start gap-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/70 text-error">
                <span className="material-symbols-outlined" aria-hidden="true">
                  warning
                </span>
              </div>
              <div>
                <p className="mb-xs font-label-md text-label-md font-bold">Clear service boundaries</p>
                <p className="font-body-sm text-body-sm">
                  Heutrix Labs provides workflow improvement, safe AI support, practice visibility builds and
                  operational systems. We do <strong>NOT</strong> provide clinical advice, medical advice, legal advice,
                  financial advice, regulatory advice, official audit services, NDIS registration readiness, or
                  compliance gap assessments.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-md sm:flex-row sm:items-center">
            <div className="flex -space-x-3" aria-hidden="true">
              {practiceTypes.map((label) => (
                <span
                  key={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-primary font-label-md text-label-md text-on-primary shadow-sm"
                >
                  {label}
                </span>
              ))}
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant">Trusted by Australian Practices</span>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="glass-card rounded-xl border border-outline-variant bg-white/90 p-xl shadow-xl">
            <h3 className="mb-lg font-headline-sm text-headline-sm text-primary">The Heutrix Method</h3>
            <div className="space-y-md">
              {methodSteps.map(([number, title, copy]) => (
                <div key={title} className="grid grid-cols-[auto_1fr] gap-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container font-label-md text-label-md text-on-secondary-container">
                    {number}
                  </div>
                  <div>
                    <p className="font-headline-sm text-headline-sm text-primary">{title}</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function DashboardPreview() {
  const rows = [
    ['Referral tracker', 'Owner set', 'Next action due'],
    ['Onboarding checklist', 'In review', 'Two tasks open'],
    ['Reporting preparation', 'Inputs received', 'Manager review']
  ];

  return (
    <div className="rounded-xl border border-outline-variant bg-white p-md shadow-xl">
      <div className="rounded-lg border border-outline-variant bg-surface-container-low p-md">
        <div className="mb-md flex items-center justify-between gap-md">
          <div>
            <p className="font-label-md text-label-md uppercase text-secondary">Operations dashboard</p>
            <p className="font-headline-sm text-headline-sm text-primary">Work that needs attention</p>
          </div>
          <span className="rounded-[999px] bg-secondary-container px-md py-xs font-label-sm text-label-sm text-on-secondary-container">
            Practice view
          </span>
        </div>
        <div className="grid gap-md sm:grid-cols-3">
          {['Waiting', 'Overdue', 'Needs review'].map((label, index) => (
            <div key={label} className="rounded-lg border border-outline-variant bg-white p-md">
              <p className="font-label-sm text-label-sm uppercase text-outline">{label}</p>
              <p className="mt-xs font-display-lg text-[28px] leading-9 text-primary">{index + 2}</p>
            </div>
          ))}
        </div>
        <div className="mt-md overflow-hidden rounded-lg border border-outline-variant bg-white">
          {rows.map(([name, status, action]) => (
            <div key={name} className="grid gap-sm border-t border-outline-variant px-md py-md first:border-t-0 sm:grid-cols-[1.1fr_0.8fr_1fr]">
              <p className="font-body-md text-body-md text-primary">{name}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{status}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{action}</p>
            </div>
          ))}
        </div>
        <div className="mt-md rounded-lg bg-primary p-md text-on-primary">
          <p className="font-label-md text-label-md text-secondary-fixed">Workflow first. Technology second.</p>
          <p className="mt-xs font-body-sm text-body-sm text-inverse-on-surface">
            Built around ownership, handover, privacy and realistic maintenance.
          </p>
        </div>
      </div>
    </div>
  );
}

function ServiceSummaryCard({ service }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="glass-card flex h-full flex-col rounded-xl border border-outline-variant bg-white/90 p-xl shadow-sm"
    >
      <div className="mb-md flex h-14 w-14 items-center justify-center rounded-full bg-surface-container text-primary transition-transform">
        <span className="material-symbols-outlined" aria-hidden="true">
          {service.icon}
        </span>
      </div>
      <h3 className="mb-xs font-headline-sm text-headline-sm text-primary">{service.title}</h3>
      <p className="mb-sm font-label-md text-label-md text-primary">{service.lead}</p>
      <p className="mb-lg font-body-md text-body-md text-on-surface-variant">{service.description}</p>
      <ButtonLink href={service.cta.href} variant="quiet" icon="chevron_right" className="mt-auto w-full">
        {service.cta.label}
      </ButtonLink>
    </motion.div>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        title="Practical workflow, dashboard and Safe AI support for health practices."
        actions={<ButtonLink href={ctas.fitCall.href}>{ctas.fitCall.label}</ButtonLink>}
      >
        <p>
          Heutrix Labs helps GP clinics, allied health practices and specialist providers improve the internal systems
          that support daily operations.
        </p>
        <p>
          We focus on practical implementation: clearer workflows, less duplicated admin, better visibility, safer AI
          use and more reliable handover.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Our services" className="mb-xl" />
        <div className="space-y-xl">
          {services.map((service) => (
            <DetailedService key={service.title} service={service} />
          ))}
        </div>
      </Section>

      <CtaSection
        title="Not sure which service fits?"
        body="Start with a free fit call. We will discuss the workflow or operational issue and recommend a practical next step."
      />
    </>
  );
}

function DetailedService({ service }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm"
    >
      <div className="grid gap-lg lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <div className="mb-md flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container text-primary">
            <span className="material-symbols-outlined" aria-hidden="true">
              {service.icon}
            </span>
          </div>
          <h2 className="mb-sm font-headline-md text-headline-md text-primary">{service.title}</h2>
          <p className="mb-md font-headline-sm text-headline-sm text-primary">{service.lead}</p>
          <p className="font-body-md text-body-md text-on-surface-variant">{service.intro}</p>
          {service.note ? (
            <p className="mt-md rounded-lg border border-secondary/20 bg-secondary-container/30 p-md font-body-sm text-body-sm text-on-surface-variant">
              {service.note}
            </p>
          ) : null}
          <div className="mt-lg">
            <ButtonLink href={service.cta.href} variant="quiet" icon="chevron_right">
              {service.cta.label}
            </ButtonLink>
          </div>
        </div>
        <div className="grid gap-md md:grid-cols-2">
          {service.sections.map((section) => (
            <div key={section.title} className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
              <h3 className="mb-md font-headline-sm text-headline-sm text-primary">{section.title}</h3>
              <BulletList items={section.items} tone={section.tone} />
            </div>
          ))}
          <div className="rounded-lg border border-secondary/20 bg-secondary-container/30 p-md md:col-span-2">
            <h3 className="mb-sm font-headline-sm text-headline-sm text-primary">Outcome</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{service.outcome}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function PricingPage() {
  return (
    <>
      <PageHero
        title="Pricing"
        actions={<ButtonLink href={ctas.fitCall.href}>{ctas.fitCall.label}</ButtonLink>}
        compact
      >
        <p>Clear starting points for practical workflow improvement.</p>
        <p>
          Final pricing depends on workflow complexity, data access, integrations, testing needs, user numbers,
          documentation requirements and privacy or risk controls. A written scope is confirmed before paid
          implementation work begins.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Starting prices" className="mb-xl" />
        <ResponsiveRows
          columns={[
            { label: 'Service', width: '1fr' },
            { label: 'Starting from', width: '0.75fr', align: 'right' },
            { label: 'Best for', width: '1.35fr' }
          ]}
          rows={pricingRows}
        />
      </Section>

      <Section>
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="What affects price?">
            <p>Pricing may increase where the work involves additional complexity, review or governance needs.</p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={priceFactors} columns />
          </div>
        </div>
      </Section>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Typical first projects" className="mb-xl" />
        <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-4">
          {typicalProjects.map(([title, copy]) => (
            <InfoCard key={title} title={title}>
              <p>{copy}</p>
            </InfoCard>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="What is not included">
            <p>Unless specifically scoped, pricing does not include the following work.</p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={pricingExclusions} columns tone="boundary" />
          </div>
        </div>
      </Section>

      <CtaSection
        title="Not sure where to start?"
        body="Book a free fit call. We will discuss what is happening now and whether a diagnostic, sprint, dashboard or Safe AI setup is the right next step."
      />
    </>
  );
}

function SafeAiPage() {
  return (
    <>
      <PageHero
        title="Safe AI Setup for health practices"
        actions={<ButtonLink href={ctas.ai.href}>{ctas.ai.label}</ButtonLink>}
      >
        <p>
          AI can be useful for internal admin, drafting, workflow guidance and productivity support. It can also create
          privacy, quality and accountability risks if staff use it without clear rules.
        </p>
        <p>Heutrix Labs helps practices set practical AI boundaries before AI becomes part of everyday admin work.</p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="What Safe AI Setup helps with">
            <p>Safe AI Setup helps your practice define clear internal rules before wider use.</p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={safeAiHelps} columns />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-lg lg:grid-cols-2">
          <InfoCard icon="check_circle" title="Suitable AI use cases">
            <p className="mb-md">AI may be suitable for internal work such as:</p>
            <BulletList items={suitableAiUses} />
            <p className="mt-md">
              Suitability depends on the tool, the information involved, the user, the workflow and the review process.
            </p>
          </InfoCard>
          <InfoCard icon="block" title="Unsuitable AI use cases">
            <p className="mb-md">AI should not be used to:</p>
            <BulletList items={unsuitableAiUses} tone="boundary" />
          </InfoCard>
        </div>
      </Section>

      <Section className="bg-surface-container-low">
        <SectionIntro title="AI use guidance table" className="mb-xl" />
        <ResponsiveRows
          columns={[
            { label: 'AI use type', width: '1.2fr' },
            { label: 'Position', width: '0.8fr' }
          ]}
          rows={aiGuidanceRows}
          emphasisLast
        />
      </Section>

      <Section>
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="Privacy and sensitive information">
            <p>
              Health practices must be careful with patient, participant, client, health, clinical, Medicare, diagnostic,
              staff and other sensitive information.
            </p>
            <p>
              Heutrix Labs does not recommend copying sensitive information into AI tools unless there is a documented,
              privacy-reviewed and approved process covering the tool, purpose, access, retention, permissions and human
              review.
            </p>
          </SectionIntro>
          <InfoCard icon="rule" title="What is included">
            <BulletList items={safeAiIncluded} columns />
          </InfoCard>
        </div>
      </Section>

      <CtaSection title="Set clear AI rules before staff start relying on AI at work." body="" cta={ctas.ai} />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        title="About Heutrix Labs"
        actions={<ButtonLink href={ctas.fitCall.href}>{ctas.fitCall.label}</ButtonLink>}
      >
        <p>
          Heutrix Labs helps service providers turn messy admin, scattered spreadsheets and manual workflows into safer,
          clearer and more reliable internal systems.
        </p>
        <p>
          We work primarily with Australian GP clinics, allied health practices, specialist providers and
          small-to-mid-sized healthcare operators.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Built for practical operators, not technology hype">
          <p>
            Many practices do not need a large software project. They need clearer ownership, better tracking, fewer
            duplicated steps, safer handovers and more reliable visibility over important work.
          </p>
          <p>
            Heutrix Labs focuses on practical implementation. We map how the work actually happens, identify what is
            creating friction, and build improvements that staff can realistically use.
          </p>
        </SectionIntro>
      </Section>

      <Section>
        <div className="grid gap-lg lg:grid-cols-3">
          <InfoCard icon="task_alt" title="What we believe">
            <BulletList items={beliefs} />
          </InfoCard>
          <InfoCard icon="groups" title="Who we work best with">
            <BulletList items={bestFit} />
          </InfoCard>
          <InfoCard icon="rule" title="Who we are not for">
            <BulletList items={notFor} tone="boundary" />
          </InfoCard>
        </div>
      </Section>

      <Section className="bg-surface-container-low">
        <div className="rounded-xl border border-outline-variant bg-white p-xl shadow-sm">
          <div className="max-w-4xl">
            <p className="mb-sm font-label-md text-label-md uppercase text-secondary">Relationship boundary</p>
            <h2 className="mb-md font-headline-md text-headline-md text-primary">
              Relationship with Heutrix Assurance
            </h2>
            <p className="mb-md font-body-lg text-body-lg text-on-surface-variant">
              Heutrix Labs and Heutrix Assurance are commercially connected but operationally separate.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Heutrix Labs provides workflow, automation, dashboard and safe AI support. It does not provide NDIS
              registration readiness, mock audits, official audit certification, legal advice, clinical advice or
              regulatory approval.
            </p>
          </div>
        </div>
      </Section>

      <CtaSection title="Want to make one workflow clearer?" body="" />
    </>
  );
}

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <PageHero title="Frequently asked questions" compact>
        <p>
          Questions about Heutrix Labs workflow systems, automation, dashboards, safe AI setup, pricing, privacy and
          service boundaries.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <div className="mx-auto max-w-4xl space-y-md">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article key={faq.question} className="rounded-xl border border-outline-variant bg-white shadow-sm">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-md p-lg text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-headline-sm text-headline-sm text-primary">{faq.question}</span>
                  <span className="material-symbols-outlined text-primary" aria-hidden="true">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {isOpen ? (
                  <div className="border-t border-outline-variant px-lg pb-lg pt-md">
                    <p className="font-body-md text-body-md text-on-surface-variant">{faq.answer}</p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </Section>

      <CtaSection
        title="Have a workflow question not covered here?"
        body="Use the contact form with a general description. Please do not include patient, participant, clinical, Medicare, diagnostic or sensitive information."
      />
    </>
  );
}

function ContactPage({ search }) {
  return (
    <>
      <PageHero title="Contact Heutrix Labs" compact>
        <p>
          Use this form to ask about workflow diagnostics, workflow automation, operations dashboards, tailored internal
          workflow systems or safe AI setup.
        </p>
        <p>Please do not include patient, participant, clinical, Medicare, diagnostic or other sensitive information.</p>
      </PageHero>
      <Section className="bg-surface-container-low">
        <div className="grid gap-xl lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-lg">
            <InfoCard icon="privacy_tip" title="Privacy note before you submit">
              <p>
                Please do not include patient, participant, clinical, Medicare, diagnostic or other sensitive
                information in this form. A general description of the workflow, admin issue or operational problem is
                enough for an initial enquiry.
              </p>
            </InfoCard>
            <InfoCard icon="mail" title="Email">
              <p>hello@heutrixlabs.com</p>
            </InfoCard>
          </div>
          <ContactForm search={search} />
        </div>
      </Section>
    </>
  );
}

function ContactForm({ search }) {
  const [submitted, setSubmitted] = useState(false);
  const defaultHelp = useMemo(() => {
    const params = new URLSearchParams(search);
    const service = params.get('service');
    if (service === 'workflow-diagnostic') return 'Workflow Diagnostic';
    if (service === 'workflow-automation-sprint') return 'Workflow Automation Sprint';
    if (service === 'operations-dashboard-build') return 'Operations Dashboard Build';
    if (service === 'safe-ai-setup') return 'Safe AI Setup';
    if (service === 'tailored-internal-workflow-system') return 'Tailored Internal Workflow System';
    return 'Not sure yet';
  }, [search]);
  const defaultNext = new URLSearchParams(search).get('next') === 'workflow-checklist'
    ? 'Download the workflow checklist'
    : 'Book a free fit call';

  if (submitted) {
    return (
      <div className="rounded-xl border border-outline-variant bg-white p-xl shadow-sm">
        <div className="mb-md flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
          <span className="material-symbols-outlined" aria-hidden="true">
            mark_email_read
          </span>
        </div>
        <h2 className="mb-md font-headline-md text-headline-md text-primary">Thank you for contacting Heutrix Labs.</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          We have received your enquiry and will review whether it appears to be within scope. Please do not send
          patient, participant, clinical, Medicare, diagnostic or other sensitive information unless a secure process has
          been agreed.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-xl border border-outline-variant bg-white p-lg shadow-xl"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="mb-lg rounded-lg border border-error/20 bg-error-container/35 p-md">
        <p className="mb-xs font-label-md text-label-md text-on-error-container">Sensitive information warning</p>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Do not include patient, participant, clinical, Medicare, diagnostic or other sensitive information. If the work
          may involve sensitive information later, we will agree an appropriate process first.
        </p>
      </div>

      <div className="grid gap-md md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Practice or organisation name" name="organisation" required />
        <Field label="Role" name="role" required />
      </div>

      <div className="mt-md grid gap-md md:grid-cols-2">
        <SelectField
          label="What would you like help with?"
          name="help"
          defaultValue={defaultHelp}
          options={[
            'Workflow Diagnostic',
            'Workflow Automation Sprint',
            'Operations Dashboard Build',
            'Safe AI Setup',
            'Tailored Internal Workflow System',
            'Not sure yet'
          ]}
        />
        <SelectField
          label="Preferred next step"
          name="nextStep"
          defaultValue={defaultNext}
          options={[
            'Book a free fit call',
            'Download the workflow checklist',
            'Start with a Workflow Diagnostic',
            'Improve a workflow',
            'Build an operations dashboard',
            'Set up safe AI use'
          ]}
        />
      </div>

      <div className="mt-md">
        <label className="mb-xs block px-xs font-label-md text-label-md text-primary" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="min-h-32 w-full resize-y rounded-lg border border-outline-variant bg-white p-md font-body-md text-body-md outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
          placeholder="Briefly describe the workflow, admin issue or operational problem. Please do not include patient, participant, clinical, Medicare, diagnostic or sensitive information."
        />
      </div>

      <label className="mt-md flex gap-md rounded-lg border border-outline-variant bg-surface-container-low p-md font-body-sm text-body-sm text-on-surface-variant">
        <input type="checkbox" required className="mt-xs h-4 w-4 shrink-0 accent-secondary" />
        <span>I confirm I have not included patient, participant, clinical, Medicare, diagnostic or sensitive information.</span>
      </label>

      <button
        type="submit"
        className="mt-lg inline-flex w-full items-center justify-center gap-sm rounded-xl bg-primary px-lg py-md font-headline-sm text-[18px] leading-6 text-on-primary shadow-md transition-opacity hover:opacity-95"
      >
        Send enquiry
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          send
        </span>
      </button>
    </form>
  );
}

function Field({ label, name, type = 'text', required = false }) {
  return (
    <div>
      <label className="mb-xs block px-xs font-label-md text-label-md text-primary" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-outline-variant bg-white p-md font-body-md text-body-md outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
      />
    </div>
  );
}

function SelectField({ label, name, options, defaultValue }) {
  return (
    <div>
      <label className="mb-xs block px-xs font-label-md text-label-md text-primary" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-outline-variant bg-white p-md font-body-md text-body-md outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy and data handling" compact>
        <p>
          Heutrix Labs works with health practices and regulated service environments where privacy, confidentiality and
          careful information handling matter.
        </p>
        <p>
          Our approach is based on minimum necessary data use, clear access boundaries, secure file handling and
          practical review of any workflow involving sensitive information.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="Information we ask you not to send through public forms">
            <p>
              Please do not send the following through website forms, email enquiries or unsecured channels unless a
              secure process has been agreed.
            </p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={privacySensitiveItems} columns tone="boundary" />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="How we approach workflow projects">
            <p>Where a project may involve sensitive information, Heutrix Labs considers practical data boundaries.</p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={privacyProjectChecks} columns />
          </div>
        </div>
      </Section>

      <Section className="bg-surface-container-low">
        <div className="grid gap-lg lg:grid-cols-2">
          <InfoCard icon="smart_toy" title="AI and sensitive information">
            <p>
              Heutrix Labs does not recommend copying sensitive information into AI tools unless there is a documented,
              privacy-reviewed and approved process.
            </p>
            <p className="mt-md">
              AI tools should be used only within approved boundaries, and outputs should be reviewed by a suitable
              human before use.
            </p>
          </InfoCard>
          <InfoCard icon="fact_check" title="Client responsibility">
            <p>
              Clients remain responsible for reviewing and approving privacy, data handling, access control, retention
              and tool-use decisions within their own organisation.
            </p>
          </InfoCard>
        </div>
      </Section>
    </>
  );
}

function TermsPage() {
  return (
    <>
      <PageHero title="Terms of use" compact>
        <p>This website provides general information about Heutrix Labs services.</p>
        <p>
          By using this website, you acknowledge that the information provided is general in nature and does not
          constitute legal advice, clinical advice, regulatory advice, audit certification or professional advice
          specific to your organisation.
        </p>
      </PageHero>
      <Section className="bg-surface-container-low">
        <div className="grid gap-lg lg:grid-cols-3">
          <InfoCard icon="rule" title="Service boundary">
            <p className="mb-md">Heutrix Labs provides workflow, automation, dashboard and safe AI support.</p>
            <BulletList
              tone="boundary"
              items={[
                'Legal advice',
                'Clinical advice',
                'Regulatory approval',
                'Official audit certification',
                'NDIS registration readiness',
                'Mock audits',
                'Promised compliance outcomes'
              ]}
            />
          </InfoCard>
          <InfoCard icon="article" title="Website information">
            <p>
              The information on this website is provided for general guidance only. You should seek appropriate
              professional advice before relying on any information for legal, clinical, regulatory, employment, privacy
              or compliance decisions.
            </p>
          </InfoCard>
          <InfoCard icon="person_check" title="Client responsibility">
            <p>
              Clients are responsible for reviewing, approving and maintaining their own workflows, systems, policies,
              procedures, privacy controls and compliance obligations.
            </p>
          </InfoCard>
        </div>
      </Section>
    </>
  );
}

function DisclaimerPage() {
  return (
    <>
      <PageHero title="Website disclaimer" compact>
        <p>
          Heutrix Labs provides practical workflow, automation, dashboard and safe AI support for health practices and
          selected regulated service providers.
        </p>
      </PageHero>
      <Section className="bg-surface-container-low">
        <div className="mx-auto max-w-4xl rounded-xl border border-outline-variant bg-white p-xl shadow-sm">
          <h2 className="mb-md font-headline-md text-headline-md text-primary">Service boundaries</h2>
          <p className="mb-md font-body-lg text-body-lg text-on-surface-variant">
            Heutrix Labs does not provide official audit certification, legal advice, clinical advice, regulatory
            approval, NDIS registration readiness or mock audits.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Any compliance-related system should support the client's responsibilities but does not remove the client's
            obligation to review, approve and maintain their own processes.
          </p>
          <div className="mt-lg grid gap-md md:grid-cols-2">
            <InfoCard icon="smart_toy" title="AI disclaimer">
              <p>
                AI support from Heutrix Labs is limited to internal admin, drafting, reporting support, workflow
                guidance, knowledge support and productivity use cases where appropriate.
              </p>
              <p className="mt-md">
                AI should not replace clinical judgement, legal advice, professional responsibility, compliance
                accountability or human review.
              </p>
            </InfoCard>
            <InfoCard icon="lock" title="Privacy disclaimer">
              <p>
                Sensitive information should not be entered into AI tools or shared through unsecured channels unless
                there is a documented, privacy-reviewed and approved process.
              </p>
              <p className="mt-md">
                Clients remain responsible for their own privacy, confidentiality, access control, retention and data
                handling decisions.
              </p>
            </InfoCard>
          </div>
        </div>
      </Section>
    </>
  );
}

function CtaSection({ title, body, cta = ctas.fitCall }) {
  return (
    <Section className="bg-primary text-on-primary">
      <motion.div className="grid gap-lg lg:grid-cols-[1fr_auto] lg:items-center" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-3xl">
          <motion.h2 variants={fadeUp} className="mb-md font-display-lg text-display-lg-mobile text-white md:text-display-lg">{title}</motion.h2>
          {body ? <motion.p variants={fadeUp} className="font-body-lg text-body-lg text-inverse-on-surface">{body}</motion.p> : null}
        </div>
        <motion.div variants={fadeUp} className="flex flex-col gap-md sm:flex-row lg:flex-col">
          <ButtonLink href={cta.href} variant="mint">
            {cta.label}
          </ButtonLink>
          <ButtonLink href={ctas.checklist.href} variant="secondary" icon="download">
            {ctas.checklist.label}
          </ButtonLink>
        </motion.div>
      </motion.div>
    </Section>
  );
}

export default App;
