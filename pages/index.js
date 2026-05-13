import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Seo from '../components/Seo';
import { useAuth } from '../contexts/AuthContext';
import { fetchEvents } from '../lib/firebase';

export default function Home({ rating, userRatingsTotal }) {
  const { user, userProfile, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [events, setEvents] = useState([]);

  const danceSchoolSchema = {
    '@context': 'https://schema.org',
    '@type': 'DanceSchool',
    name: 'Salsa Rennes - Qué Rico Mambo',
    description: 'École de danse salsa à Rennes proposant des cours pour tous niveaux, des débutants aux danseurs confirmés',
    url: 'https://www.salsarennes.fr',
    logo: 'https://www.salsarennes.fr/images/logo.png',
    image: 'https://www.salsarennes.fr/images/clem-eric.webp',
    telephone: '+33761461982',
    email: 'contact@quericomambo.fr',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rennes',
      addressRegion: 'Bretagne',
      postalCode: '35000',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '48.1173',
      longitude: '-1.6778',
    },
    openingHours: 'Mo,Tu,We,Th 18:00-22:00',
    priceRange: '180€/an',
    sameAs: [
      'https://www.facebook.com/quericomambo.fr',
      'https://www.instagram.com/quericomambo_salsa',
    ],
    offers: {
      '@type': 'Offer',
      name: 'Cours de salsa à Rennes',
      description: 'Cours de salsa cubaine et portoricaine pour tous niveaux à Rennes',
    },
    ...(rating && userRatingsTotal > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.toFixed(1),
        reviewCount: userRatingsTotal,
        bestRating: '5',
        worstRating: '1',
      },
    }),
  };

  useEffect(() => {
    setMounted(true);
    fetchEvents().then(setEvents).catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const faqItems = [
    {
      q: 'Je ne sais pas danser, puis-je venir au cours débutant ?',
      a: "Bien sûr. Le cours débutant s'adresse aux personnes qui n'ont jamais dansé la salsa — aucune expérience préalable n'est nécessaire. On commence par la posture, le pas de base et les premières figures, à un rythme accessible.",
    },
    {
      q: 'Faut-il venir accompagné ?',
      a: "Non, tu peux venir seul ou accompagné. La rotation des partenaires est pratiquée dans nos cours — chacun progresse plus vite et fait connaissance avec d'autres danseurs.",
    },
    {
      q: 'Quelle tenue prévoir ?',
      a: 'Une tenue confortable dans laquelle tu te sens libre de bouger. Des chaussures à semelle lisse (pas de baskets sur le parquet) — sandales, escarpins ou chaussures de danse selon ton niveau.',
    },
    {
      q: "Comment se passe le cours d'essai ?",
      a: "Tu réserves en ligne, tu viens 10 minutes avant l'horaire pour te préparer, et tu suis le cours comme un élève régulier. C'est gratuit, sans engagement — un seul soir suffit pour savoir si l'école te convient.",
    },
    {
      q: 'Quels sont les tarifs ?',
      a: "Plusieurs formules à l'année selon le nombre de cours hebdomadaires choisis. Tarifs étudiants disponibles. Contacte-nous pour le détail ou consulte la page inscription.",
    },
    {
      q: "Y a-t-il une limite d'âge ?",
      a: "Aucune. Nos élèves vont de 18 à 70 ans. La salsa s'adapte à tous les corps et toutes les énergies — il n'est jamais trop tard pour commencer.",
    },
  ];

  const testimonials = [
    {
      text: "Une ambiance incroyable, des profs hyper pédagogues. Je suis venue débutante, je danse maintenant en soirée chaque semaine.",
      name: 'Marine L.',
      role: 'Élève · 2e année',
      initial: 'M',
    },
    {
      text: 'Le bon dosage entre rigueur technique et plaisir. On progresse vraiment, et la communauté est très accueillante.',
      name: 'Thomas D.',
      role: 'Intermédiaire',
      initial: 'T',
    },
    {
      text: "Plus qu'une école, une famille. Les soirées sont devenues mon rendez-vous préféré du mois.",
      name: 'Sophie M.',
      role: 'Avancé',
      initial: 'S',
    },
  ];

  return (
    <>
      <Seo
        title="Salsa Rennes — Qué Rico Mambo · École de salsa cubaine et portoricaine"
        description="Apprenez la salsa à Rennes avec Qué Rico Mambo. École de danse portoricaine et cubaine pour tous niveaux. Cours du lundi au jeudi, cours d'essai gratuit."
        url="https://www.salsarennes.fr"
        image="/images/clem-eric.webp"
        imageWidth={600}
        imageHeight={800}
        keywords="salsa rennes, cours salsa rennes, école de danse rennes, salsa cubaine rennes, salsa portoricaine, apprendre salsa bretagne, soirées salsa rennes, professeurs salsa, danse latine rennes, cours débutant salsa"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(danceSchoolSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            }),
          }}
        />
      </Head>

      {/* ═══ HEADER ═══ */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="top">
        <div className="wrap nav">
          <a href="#top" className="brand" aria-label="Qué Rico Mambo - Salsa Rennes">
            <Image src="/images/logo.png" alt="Qué Rico Mambo" width={120} height={60} className="brand-logo" priority />
            <div className="brand-name">
              <span className="a">Qué Rico Mambo</span>
              <span className="b">Salsa · Rennes</span>
            </div>
          </a>

          <nav aria-label="Navigation principale">
            <ul className="nav-links">
              <li><a href="#evenements">Événements</a></li>
              <li><a href="#cours">Cours</a></li>
              <li><a href="#niveaux">Niveaux</a></li>
              <li><a href="#planning">Planning</a></li>
              <li><a href="#temoignages">Avis</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </nav>

          <div className="nav-cta">
            <a href="#contact" className="btn btn-ghost">Contact</a>
            {mounted && user ? (
              <>
                {userProfile?.is_admin && (
                  <Link href="/admin" className="btn btn-ghost">Admin</Link>
                )}
                <button onClick={signOut} className="btn btn-ghost">Se déconnecter</button>
              </>
            ) : (
              <>
                <Link href="/admin" className="btn btn-ghost">Admin</Link>
                <Link href="/inscription" className="btn btn-primary">
                  Essai gratuit <span className="arr">→</span>
                </Link>
              </>
            )}
          </div>

          <button
            className={`nav-toggle${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ═══ MENU MOBILE ═══ */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <a href="#evenements" onClick={() => setMenuOpen(false)}>Événements <span className="num">01</span></a>
        <a href="#cours" onClick={() => setMenuOpen(false)}>Cours <span className="num">02</span></a>
        <a href="#niveaux" onClick={() => setMenuOpen(false)}>Niveaux <span className="num">03</span></a>
        <a href="#planning" onClick={() => setMenuOpen(false)}>Planning <span className="num">04</span></a>
        <a href="#temoignages" onClick={() => setMenuOpen(false)}>Témoignages <span className="num">05</span></a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ <span className="num">06</span></a>
        {mounted && user ? (
          <>
            {userProfile?.is_admin && (
              <Link href="/admin" onClick={() => setMenuOpen(false)} className="btn btn-ghost">Admin</Link>
            )}
            <button onClick={() => { setMenuOpen(false); signOut(); }} className="btn btn-ghost">Se déconnecter</button>
          </>
        ) : (
          <>
            <Link href="/admin" onClick={() => setMenuOpen(false)} className="btn btn-ghost">Admin</Link>
            <Link href="/inscription" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
              Réserver l&apos;essai gratuit <span className="arr">→</span>
            </Link>
          </>
        )}
      </div>

      {/* ═══ HERO ═══ */}
      <section className="hero">
        <div className="glow" />
        <div className="glow b" />
        {mounted && (
          <div className="hero-social" aria-label="Réseaux sociaux">
            <a href="https://www.facebook.com/quericomambo.fr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.1H8v3h2.4V21h3.1z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/quericomambo_salsa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.tiktok.com/@quericomambo" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.82 1.56V6.9a4.84 4.84 0 01-1.05-.21z" />
              </svg>
            </a>
          </div>
        )}
        <div className="wrap hero-grid">
          <div className="hero-copy" data-reveal>
            <div className="eyebrow">Cours · Stages · Soirées · Rennes</div>
            <h1 className="display">
              <em>Salsa Rennes</em> — Apprenez avec des profs <em>passionnés.</em>
            </h1>
            <p className="hero-sub">
              École de salsa portoricaine à Rennes — du débutant absolu au danseur confirmé.
              Quatre soirs par semaine, dix ans à transmettre la passion.
            </p>
            <div className="hero-cta">
              <Link href="/inscription" className="btn btn-primary">
                Réserver un cours d&apos;essai <span className="arr">→</span>
              </Link>
              <a href="#cours" className="btn btn-ghost">Découvrir nos cours</a>
            </div>
            {mounted && (
              <div className="hero-social-mobile">
                <a href="https://www.facebook.com/quericomambo.fr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.1H8v3h2.4V21h3.1z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/quericomambo_salsa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@ericsoret" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.82 1.56V6.9a4.84 4.84 0 01-1.05-.21z" />
                  </svg>
                </a>
              </div>
            )}
            <div className="hero-meta">
              <div className="stat">
                <div className="v">10<span style={{ fontSize: '0.6em' }}>ans</span></div>
                <div className="l">à Rennes</div>
              </div>
              <div className="stat">
                <div className="v">3</div>
                <div className="l">niveaux</div>
              </div>
              <div className="stat">
                <div className="v">04</div>
                <div className="l">soirs / semaine</div>
              </div>
              <div className="stat">
                <div className="v">★★★★★</div>
                <div className="l">avis élèves</div>
              </div>
            </div>
          </div>

          <figure className="hero-photo" data-reveal>
            <span className="badge">
              <span className="dot" />
              Inscriptions ouvertes
            </span>
            <Image src="/images/clem-eric.webp" alt="Professeurs de salsa à Rennes — Qué Rico Mambo" width={600} height={800} priority style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <figcaption className="cap">
              <span className="who">
                Vos professeurs
                <small>Équipe — QRM</small>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee">
          <span>Salsa on 2</span>
          <span>Salsa portoricaine</span>
          <span>Mambo · On2</span>
          <span>Pachanga</span>
          <span>Cha-cha-cha</span>
          <span>Stages internationaux</span>
          <span>Soirées dansantes</span>
          <span>Practica libre</span>
          <span>Salsa on 2</span>
          <span>Salsa portoricaine</span>
          <span>Mambo · On2</span>
          <span>Pachanga</span>
          <span>Cha-cha-cha</span>
          <span>Stages internationaux</span>
          <span>Soirées dansantes</span>
          <span>Practica libre</span>
        </div>
      </div>

      {/* ═══ ÉVÉNEMENTS ═══ */}
      <section className="events-wrap s" id="evenements">
        <div className="wrap">
          <div className="s-head" data-reveal>
            <div>
              <span className="eyebrow">01 — La scène salsa</span>
              <h2 className="display">Bien plus que des <em>cours</em>.</h2>
            </div>
            <p className="s-aside">
              La salsa, c&apos;est aussi des soirées, des stages internationaux et un festival qui fait
              vibrer la Bretagne. Voilà ce qui vous attend cette saison.
            </p>
          </div>

          <div className="events" data-reveal>
            {events.length === 0 ? (
              <>
                <div className="event featured">
                  <div>
                    <span className="e-tag">Festival · Rennes</span>
                    <h3>Breizh Loves <em>Mambo</em></h3>
                    <p>Trois jours de stages avec des danseurs internationaux, soirées dansantes et performances. L&apos;événement salsa de l&apos;ouest.</p>
                  </div>
                  <div className="e-meta">
                    <span className="date">Avril 2027</span>
                    <span className="where">Rennes · 3 jours</span>
                  </div>
                </div>
                <div className="event">
                  <div>
                    <span className="e-tag">Mensuel</span>
                    <h3>Soirée <em>Salsa</em></h3>
                    <p>Une soirée par mois, ouverte à tous les niveaux. Practica encadrée puis piste libre jusqu&apos;à minuit.</p>
                  </div>
                  <div className="e-meta">
                    <span className="date">1er sam.</span>
                    <span className="where">Studio · 21h</span>
                  </div>
                </div>
                <div className="event">
                  <div>
                    <span className="e-tag">Stage invité</span>
                    <h3>Workshops <em>internationaux</em></h3>
                    <p>Plusieurs fois dans l&apos;année, des invités venus de Cuba, NYC et Paris pour des week-ends intensifs.</p>
                  </div>
                  <div className="e-meta">
                    <span className="date">Saison</span>
                    <span className="where">Sur inscription</span>
                  </div>
                </div>
              </>
            ) : (
              events.map((ev) => (
                <div key={ev.id} className={`event${ev.featured ? ' featured' : ''}`}>
                  <div>
                    {ev.tag && <span className="e-tag">{ev.tag}</span>}
                    <h3 dangerouslySetInnerHTML={{ __html: ev.title }} />
                    {ev.description && <p>{ev.description}</p>}
                  </div>
                  <div className="e-meta">
                    {ev.date && <span className="date">{ev.date}</span>}
                    {ev.location && <span className="where">{ev.location}</span>}
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }} data-reveal>
            <a href="#contact" className="btn-link">Voir l&apos;agenda complet →</a>
          </div>
        </div>
      </section>

      {/* ═══ ATOUTS ═══ */}
      <section className="s" id="cours">
        <div className="wrap">
          <div className="s-head" data-reveal>
            <div>
              <span className="eyebrow">02 — Pourquoi nous choisir</span>
              <h2 className="display">Une école qui transmet, pas qui sélectionne.</h2>
            </div>
            <p className="s-aside">
              Dix ans à faire danser Rennes — étudiants, pros, retraités. Une méthode claire,
              des profs présents, une communauté qui accueille. Le reste, c&apos;est de la salsa.
            </p>
          </div>

          <div className="atouts" data-reveal>
            <div className="atout">
              <span className="num">01</span>
              <h3>Cours <em>tous niveaux</em></h3>
              <p>Du premier pas au shine maîtrisé — chaque danseur trouve sa place sur la piste. Aucune expérience requise pour commencer.</p>
            </div>
            <div className="atout">
              <span className="num">02</span>
              <h3>Profs <em>certifiés</em></h3>
              <p>Une équipe formée à Cuba, Paris et New York. Plus de 10 ans d&apos;expérience à transmettre sans détour, avec rigueur et chaleur.</p>
            </div>
            <div className="atout">
              <span className="num">03</span>
              <h3>Ambiance <em>conviviale</em></h3>
              <p>On vient seul, on repart avec une famille. Rotation des partenaires, bienveillance à tous niveaux — la piste est un terrain de rencontre.</p>
            </div>
            <div className="atout">
              <span className="num">04</span>
              <h3>Événements <em>réguliers</em></h3>
              <p>Practica mensuelle, stages avec danseurs internationaux, festivals comme Breizh Loves Mambo. La salsa hors les murs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NIVEAUX ═══ */}
      <section
        className="s"
        id="niveaux"
        style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-soft)' }}
      >
        <div className="wrap">
          <div className="s-head" data-reveal>
            <div>
              <span className="eyebrow">03 — Les niveaux</span>
              <h2 className="display">Trois niveaux, une <em>trajectoire</em>.</h2>
            </div>
            <p className="s-aside">
              Une progression claire et balisée. On commence où l&apos;on est, on avance à son rythme
              — et on franchit les paliers quand on est prêt, jamais avant.
            </p>
          </div>

          <div className="levels" data-reveal>
            <div className="lvl">
              <span className="stage">Niveau · 01</span>
              <div className="name"><em>Débutant</em></div>
              <p>Pas de base, posture, premier pas guidés. Aucune expérience requise — simplement venir avec l&apos;envie d&apos;apprendre.</p>
              <div className="meter">
                <span className="on" /><span /><span /><span />
              </div>
              <a href="https://www.quericomambo.fr/cours-salsa-debutant-rennes" className="lvl-link" target="_blank" rel="noopener noreferrer">Commencer ici →</a>
            </div>
            <div className="lvl">
              <span className="stage">Niveau · 02</span>
              <div className="name"><em>Intermédiaire</em></div>
              <p>Combinaisons, musicalité, vocabulaire enrichi. On commence à improviser à deux et à habiter le rythme.</p>
              <div className="meter">
                <span className="on" /><span className="on" /><span /><span />
              </div>
              <a href="https://www.quericomambo.fr/cours-intermediaire-de-salsa" className="lvl-link" target="_blank" rel="noopener noreferrer">Niveau intermédiaire →</a>
            </div>
            <div className="lvl">
              <span className="stage">Niveau · 03</span>
              <div className="name"><em>Avancé</em></div>
              <p>Travail technique, performance, expression personnelle. La piste devient scène, l&apos;élève devient danseur.</p>
              <div className="meter">
                <span className="on" /><span className="on" /><span className="on" /><span className="on" />
              </div>
              <a href="https://www.quericomambo.fr/cours-inter-2" className="lvl-link" target="_blank" rel="noopener noreferrer">Niveau avancé →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PLANNING ═══ */}
      <section className="planning-wrap" id="planning">
        <div
          className="wrap"
          style={{
            paddingTop: 'clamp(70px, 10vw, 140px)',
            paddingBottom: 'clamp(70px, 10vw, 140px)',
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <div style={{ padding: '0 var(--gutter)' }}>
            <div className="s-head" data-reveal>
              <div>
                <span className="eyebrow">04 — Planning hebdo</span>
                <h2 className="display">Quatre soirs, <em>une école qui vit</em>.</h2>
              </div>
              <p className="s-aside">
                Cours du lundi au jeudi, créneaux du soir 19h — 22h. Practica libre une fois par mois
                le vendredi. Tous les détails par jour ci-dessous.
              </p>
            </div>
          </div>

          <div className="planning" data-reveal>
            <div className="day-card">
              <div className="d">Lun.</div>
              <div className="full">Lundi</div>
              <ul>
                <li><b>20h15</b><br />Débutant</li>
                <li><b>21h15</b><br />Intermédiaire</li>
              </ul>
            </div>
            <div className="day-card">
              <div className="d">Mar.</div>
              <div className="full">Mardi</div>
              <ul>
                <li><b>20h15</b><br />Intermédiaire 2</li>
              </ul>
            </div>
            <div className="day-card">
              <div className="d">Mer.</div>
              <div className="full">Mercredi</div>
              <ul>
                <li><b>20h00</b><br />Débutant</li>
                <li><b>21h00</b><br />Intermédiaire</li>
              </ul>
            </div>
            <div className="day-card">
              <div className="d">Jeu.</div>
              <div className="full">Jeudi</div>
              <ul>
                <li><b>20h15</b><br />Footwork · Solo</li>
              </ul>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px', padding: '0 var(--gutter)' }} data-reveal>
            <Link href="/inscription" className="btn btn-primary">
              Réserver un cours d&apos;essai <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ NOTRE ÉCOLE ═══ */}
      <section className="s" id="ecole">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-photo" data-reveal>
              <Image src="/images/clem-eric.webp" alt="Clem & Eric — professeurs Qué Rico Mambo" width={600} height={800} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div data-reveal>
              <span className="eyebrow">05 — Notre école</span>
              <h2
                className="display"
                style={{ fontSize: 'var(--t-h2)', marginTop: '18px', maxWidth: '18ch' }}
              >
                Dix ans à Rennes, une <em>référence</em> pour la salsa.
              </h2>
              <p className="lead" style={{ marginTop: '24px' }}>
                Qué Rico Mambo est devenue une référence rennaise pour apprendre la salsa portoricaine.
              </p>
              <p style={{ marginTop: '18px', color: 'var(--ink-soft)', maxWidth: '50ch' }}>
                Une méthode unique d&apos;apprentissage, du débutant absolu au danseur confirmé —
                adaptée à tous les profils et tous les âges, dans plusieurs salles accessibles en
                transport en commun.
              </p>

              <div className="about-cards">
                <div className="about-card">
                  <div className="ic">⚲</div>
                  <div>
                    <div className="t">Studio centre — Rennes</div>
                    <div className="d">Parquet bois, vestiaires. Métro Sainte-Anne, parkings à proximité.</div>
                  </div>
                </div>
                <div className="about-card">
                  <div className="ic">⌖</div>
                  <div>
                    <div className="t">Plusieurs salles dans la ville</div>
                    <div className="d">Accessibles en transport en commun, équipées pour une expérience optimale.</div>
                  </div>
                </div>
                <div className="about-card">
                  <div className="ic">♪</div>
                  <div>
                    <div className="t">Salsa cubaine &amp; portoricaine</div>
                    <div className="d">Bachata, cha-cha-cha, rueda, musicalité — un vocabulaire complet.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TÉMOIGNAGES ═══ */}
      <section className="s" id="temoignages" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="s-head" data-reveal>
            <div>
              <span className="eyebrow">06 — Témoignages</span>
              <h2 className="display">Ce qu&apos;en pensent <em>nos élèves</em>.</h2>
            </div>
            <p className="s-aside">
              Des avis authentiques de danseurs qui ont commencé chez nous — débutants,
              intermédiaires et avancés.
            </p>
          </div>

          <div className="testimonials" data-reveal>
              {testimonials.map(({ text, name, role, initial }) => (
                <div className="testimonial" key={name}>
                  <p>{text}</p>
                  <div className="by">
                    <div className="av">{initial}</div>
                    <div className="id">
                      <div className="n">{name}</div>
                      <div className="r">{role}</div>
                    </div>
                    <span className="stars">★★★★★</span>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section
        className="s"
        id="faq"
        style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--line)' }}
      >
        <div className="wrap" style={{ maxWidth: '920px' }}>
          <div
            className="s-head"
            data-reveal
            style={{ flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <div>
              <span className="eyebrow">07 — Questions fréquentes</span>
              <h2 className="display">Tout ce qu&apos;il faut <em>savoir</em>.</h2>
            </div>
          </div>

          <div className="faq-list" data-reveal>
            {faqItems.map(({ q, a }, i) => (
              <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                <button
                  className="faq-q"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{q}</span>
                  <span className="ic">+</span>
                </button>
                <div className="faq-a">
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="cta-final" id="essai">
        <div className="glow" />
        <div className="wrap cta-final-inner" data-reveal>
          <span className="eyebrow">Cours d&apos;essai gratuit</span>
          <h2 className="display">Un seul soir suffit pour <em>savoir</em>.</h2>
          <p className="lead">
            Inscription en ligne, places limitées chaque semaine. Venez en tenue confortable
            — le reste, on s&apos;en occupe.
          </p>
          <div className="row">
            <Link href="/inscription" className="btn btn-primary">
              Je réserve mon essai <span className="arr">→</span>
            </Link>
            <a href="#contact" className="btn btn-ghost">Nous contacter</a>
          </div>
          <div className="micro">Gratuit · Sans engagement · Réponse en 24h</div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="site-footer" id="contact">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <a href="#top" className="brand">
                <Image src="/images/logo.png" alt="Qué Rico Mambo" width={120} height={60} className="brand-logo" />
                <div className="brand-name">
                  <span className="a">Qué Rico Mambo</span>
                  <span className="b">Salsa · Rennes</span>
                </div>
              </a>
              <p>
                École de salsa cubaine et portoricaine à Rennes depuis 10 ans. Cours pour tous
                niveaux, soirées et événements toute l&apos;année.
              </p>
              <div className="socials" aria-label="Réseaux sociaux">
                <a
                  href="https://www.facebook.com/quericomambo.fr"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.1H8v3h2.4V21h3.1z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/quericomambo_salsa"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" />
                  </svg>
                </a>
                <a href="mailto:contact@quericomambo.fr" aria-label="Email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="foot-col">
              <h4>Cours</h4>
              <ul>
                <li><a href="#niveaux">Débutant</a></li>
                <li><a href="#niveaux">Intermédiaire</a></li>
                <li><a href="#niveaux">Avancé</a></li>
                <li><a href="#planning">Planning</a></li>
                <li><Link href="/inscription">Cours d&apos;essai</Link></li>
              </ul>
            </div>

            <div className="foot-col">
              <h4>L&apos;école</h4>
              <ul>
                <li><a href="#ecole">Notre histoire</a></li>
                <li><a href="#ecole">Les profs</a></li>
                <li><a href="#evenements">Événements</a></li>
                <li><a href="#evenements">Breizh Loves Mambo</a></li>
                <li><a href="#temoignages">Avis</a></li>
              </ul>
            </div>

            <div className="foot-col">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="mailto:contact@quericomambo.fr">contact@quericomambo.fr</a>
                </li>
                <li>
                  <a href="tel:+33761461982">+33 7 61 46 19 82</a>
                </li>
                <li>
                  <a href="#ecole">Studio · Rennes centre</a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/quericomambo.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/quericomambo_salsa"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="foot-bottom">
            <span>© 2026 Qué Rico Mambo · Salsa Rennes</span>
            <div className="legal">
              <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
              <a href="#top">Mentions légales</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
