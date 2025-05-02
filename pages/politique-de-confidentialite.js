import React from 'react';
import Seo from '../components/Seo';
import Navbar from '../components/Navbar';

export default function PolitiqueConfidentialite() {
  // TODO: Implement actual authentication logic
  const isLoggedIn = false;

  return (
    <div className="min-h-screen bg-[#2b2b2b]">
      <Seo
        title="Politique de Confidentialité - Salsa Rennes"
        description="Politique de confidentialité et gestion des cookies de Salsa Rennes, école de danse à Rennes."
        url="https://www.salsarennes.fr/politique-de-confidentialite"
        image="/images/logo.png"
      />

      <Navbar isLoggedIn={isLoggedIn} />

      <main className="container mx-auto px-4 py-20 md:py-24 text-white max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[#f6bc7c]">Politique de Confidentialité</h1>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">1. Introduction</h2>
          <p className="mb-4">
            Bienvenue sur le site de Salsa Rennes. Nous nous engageons à protéger votre vie privée et à traiter vos données personnelles avec transparence.
            Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web.
          </p>
          <p>
            Date de dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'})}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">2. Données collectées</h2>
          <p className="mb-4">Nous collectons les types d'informations suivants :</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Informations que vous nous fournissez volontairement (nom, adresse e-mail, numéro de téléphone) lors de l'inscription aux cours ou à la newsletter.</li>
            <li>Informations collectées automatiquement (adresse IP, type de navigateur, pages visitées, temps passé sur le site) via les cookies et technologies similaires.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">3. Utilisation des cookies</h2>
          <p className="mb-4">
            Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous aident à :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Mémoriser vos préférences et paramètres</li>
            <li>Comprendre comment vous utilisez notre site</li>
            <li>Améliorer notre site et nos services</li>
            <li>Vous proposer des contenus pertinents</li>
          </ul>
          <p className="mb-4">Nous utilisons différents types de cookies :</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Cookies essentiels</strong> : nécessaires au fonctionnement du site</li>
            <li><strong>Cookies analytiques</strong> : nous aident à comprendre comment les visiteurs interagissent avec notre site</li>
            <li><strong>Cookies de fonctionnalité</strong> : permettent de mémoriser vos préférences</li>
          </ul>
          <p>
            Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies déjà présents sur votre appareil et paramétrer la plupart des navigateurs pour qu'ils les bloquent. Toutefois, si vous faites cela, vous devrez peut-être ajuster manuellement certaines préférences chaque fois que vous visiterez le site.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">4. Utilisation des données</h2>
          <p className="mb-4">Nous utilisons vos données personnelles pour :</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Fournir et améliorer nos services</li>
            <li>Communiquer avec vous concernant nos cours et événements</li>
            <li>Personnaliser votre expérience sur notre site</li>
            <li>Analyser l'utilisation de notre site pour l'améliorer</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">5. Partage des données</h2>
          <p className="mb-4">
            Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos informations avec :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Nos prestataires de services qui nous aident à gérer notre site et nos services</li>
            <li>Les autorités publiques si la loi nous y oblige</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">6. Vos droits</h2>
          <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à l'effacement de vos données</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition au traitement</li>
          </ul>
          <p>
            Pour exercer ces droits, veuillez nous contacter à l'adresse email : contact@salsarennes.fr
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">7. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">8. Modifications de la politique de confidentialité</h2>
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement significatif par un avis sur notre site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">9. Contact</h2>
          <p>
            Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à l'adresse email : contact@salsarennes.fr
          </p>
        </section>
      </main>
    </div>
  );
}
