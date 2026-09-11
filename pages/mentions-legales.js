import React from 'react';
import Seo from '../components/Seo';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-[#2b2b2b]">
      <Seo
        title="Mentions légales - Salsa Rennes"
        description="Mentions légales du site Salsa Rennes (Qué Rico Mambo) : éditeur, hébergeur et contact."
        url="https://www.salsarennes.fr/mentions-legales"
        image="/images/logo.png"
      />

      <Navbar />

      <main className="container mx-auto px-4 py-20 md:py-24 text-white max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[#f6bc7c]">Mentions légales</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">1. Éditeur du site</h2>
          <p className="mb-4">
            Le site <strong>salsarennes.fr</strong> est édité par l&apos;association{' '}
            <strong>Qué Rico Mambo</strong> (cours de salsa à Rennes).
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Nom commercial : Salsa Rennes — Qué Rico Mambo</li>
            <li>Email : <a className="text-[#f6bc7c] underline" href="mailto:contact@quericomambo.fr">contact@quericomambo.fr</a></li>
            <li>Téléphone : <a className="text-[#f6bc7c] underline" href="tel:+33761461982">+33 7 61 46 19 82</a></li>
            <li>Localisation des cours : Rennes (35000), Bretagne, France</li>
          </ul>
          <p className="text-white/70 text-sm">
            Les informations d&apos;identification complète de l&apos;association (SIRET, siège social)
            peuvent être communiquées sur demande à l&apos;adresse email ci-dessus.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">2. Directeur de la publication</h2>
          <p>
            Le directeur de la publication est le responsable de l&apos;association Qué Rico Mambo,
            joignable à <a className="text-[#f6bc7c] underline" href="mailto:contact@quericomambo.fr">contact@quericomambo.fr</a>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">3. Hébergeur</h2>
          <p className="mb-4">Le site est hébergé par :</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Vercel Inc.</li>
            <li>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
            <li>Site : <a className="text-[#f6bc7c] underline" href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">4. Propriété intellectuelle</h2>
          <p className="mb-4">
            L&apos;ensemble des contenus présents sur ce site (textes, images, logos, vidéos, éléments graphiques)
            est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation,
            modification ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">5. Données personnelles</h2>
          <p className="mb-4">
            Pour en savoir plus sur la collecte et le traitement de vos données personnelles,
            consultez notre{' '}
            <Link href="/politique-de-confidentialite" className="text-[#f6bc7c] underline">
              politique de confidentialité
            </Link>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">6. Contact</h2>
          <p>
            Pour toute question relative à ces mentions légales :
            {' '}<a className="text-[#f6bc7c] underline" href="mailto:contact@quericomambo.fr">contact@quericomambo.fr</a>
          </p>
        </section>
      </main>
    </div>
  );
}
