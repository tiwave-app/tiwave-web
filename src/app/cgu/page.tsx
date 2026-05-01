import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — TiWave",
  description:
    "Les conditions générales d'utilisation de l'application mobile TiWave et du site tiwave.app.",
  alternates: { canonical: 'https://tiwave.app/cgu' },
}

const LAST_UPDATE = '1er mai 2026'

export default function CGU() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-[#013a63] mb-2">
        Conditions Générales d’Utilisation — TiWave
      </h1>
      <p className="text-sm text-gray-500 mb-10">
        Dernière mise à jour : {LAST_UPDATE}
      </p>

      <div className="prose prose-slate max-w-none prose-headings:text-[#013a63] prose-headings:font-bold prose-h2:mt-10 prose-h2:mb-3 prose-h2:text-xl prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-lg prose-a:text-[#0093d0] prose-a:no-underline hover:prose-a:underline prose-hr:my-8">
        <p>
          Les présentes Conditions Générales d’Utilisation (« <strong>CGU</strong> »)
          régissent l’accès et l’utilisation de l’application mobile TiWave
          (iOS, Android) et du site{' '}
          <a href="https://tiwave.app">tiwave.app</a> (les «{' '}
          <strong>Services</strong> »).
        </p>
        <p>
          En créant un compte et en utilisant TiWave, vous acceptez sans réserve
          les présentes CGU.
        </p>

        <hr />

        <h2>1. Éditeur du service</h2>
        <p>
          TiWave — Maria Galbert
          <br />
          Martinique, Antilles françaises
          <br />
          Email :{' '}
          <a href="mailto:contact@tiwave.app">contact@tiwave.app</a>
        </p>

        <hr />

        <h2>2. Accès au service</h2>
        <p>
          Le service est accessible gratuitement à toute personne disposant d’un
          accès à Internet.
        </p>
        <p>Certaines fonctionnalités nécessitent la création d’un compte.</p>
        <p>Vous êtes responsable :</p>
        <ul>
          <li>de la confidentialité de vos identifiants</li>
          <li>de toute activité réalisée depuis votre compte</li>
        </ul>

        <hr />

        <h2>3. Création de compte</h2>
        <p>Pour créer un compte, vous devez :</p>
        <ul>
          <li>être âgé d’au moins 13 ans</li>
          <li>fournir des informations exactes et à jour</li>
        </ul>
        <p>Vous pouvez créer un compte via :</p>
        <ul>
          <li>email et mot de passe</li>
          <li>Apple Sign-In</li>
          <li>Google Sign-In</li>
        </ul>
        <p>Vous vous engagez à ne pas usurper l’identité d’un tiers.</p>

        <hr />

        <h2>4. Fonctionnement du service</h2>
        <p>TiWave permet aux utilisateurs de :</p>
        <ul>
          <li>consulter des informations sur les plages</li>
          <li>publier des rapports (conditions, sargasses, fréquentation…)</li>
          <li>partager des photos</li>
          <li>interagir avec la communauté</li>
        </ul>
        <p>
          ⚠️ Les informations publiées sont fournies à titre indicatif uniquement.
        </p>
        <p>TiWave ne garantit pas :</p>
        <ul>
          <li>l’exactitude des informations</li>
          <li>la disponibilité en temps réel</li>
          <li>l’absence d’erreurs</li>
        </ul>

        <hr />

        <h2>5. Responsabilité de l’utilisateur</h2>
        <p>Vous êtes seul responsable des contenus que vous publiez.</p>
        <p>Vous vous engagez à ne pas publier de contenus :</p>
        <ul>
          <li>faux, trompeurs ou inexacts</li>
          <li>illégaux ou contraires à la réglementation</li>
          <li>violents, haineux, diffamatoires ou discriminatoires</li>
          <li>portant atteinte à la vie privée d’autrui</li>
          <li>protégés par des droits sans autorisation</li>
        </ul>

        <hr />

        <h2>6. Modération</h2>
        <p>TiWave se réserve le droit de :</p>
        <ul>
          <li>supprimer tout contenu non conforme</li>
          <li>suspendre ou supprimer un compte</li>
          <li>limiter l’accès à certaines fonctionnalités</li>
        </ul>
        <p>sans préavis en cas de non-respect des CGU.</p>

        <hr />

        <h2>7. Contenus publiés</h2>
        <p>
          En publiant du contenu sur TiWave, vous accordez à TiWave une licence :
        </p>
        <ul>
          <li>non exclusive</li>
          <li>gratuite</li>
          <li>mondiale</li>
          <li>pour la durée de protection légale</li>
        </ul>
        <p>permettant :</p>
        <ul>
          <li>l’affichage dans l’application</li>
          <li>la diffusion sur les supports TiWave (app, site, communication)</li>
        </ul>
        <p>Vous restez propriétaire de vos contenus.</p>

        <hr />

        <h2>8. Sécurité et usage</h2>
        <p>Vous vous engagez à ne pas :</p>
        <ul>
          <li>perturber le fonctionnement du service</li>
          <li>tenter d’accéder de manière frauduleuse aux systèmes</li>
          <li>utiliser des bots ou scripts automatisés</li>
          <li>détourner le service de son usage</li>
        </ul>

        <hr />

        <h2>9. Responsabilité</h2>
        <p>TiWave est fourni « en l’état ».</p>
        <p>TiWave ne saurait être tenu responsable :</p>
        <ul>
          <li>des erreurs ou inexactitudes des contenus</li>
          <li>des dommages liés à l’utilisation du service</li>
          <li>de l’indisponibilité temporaire de l’application</li>
        </ul>
        <p>
          L’utilisation des informations (conditions de baignade, etc.) se fait
          sous votre responsabilité.
        </p>

        <hr />

        <h2>10. Données personnelles</h2>
        <p>
          Le traitement des données personnelles est régi par la Politique de
          confidentialité disponible ici :
          <br />
          <a href="https://tiwave.app/confidentialite">
            https://tiwave.app/confidentialite
          </a>
        </p>

        <hr />

        <h2>11. Suppression de compte</h2>
        <p>Vous pouvez supprimer votre compte à tout moment.</p>
        <p>
          TiWave peut également suspendre ou supprimer votre compte en cas de
          non-respect des présentes CGU.
        </p>

        <hr />

        <h2>12. Propriété intellectuelle</h2>
        <p>
          Tous les éléments de TiWave (logo, design, contenu, code) sont
          protégés.
        </p>
        <p>Toute reproduction ou utilisation sans autorisation est interdite.</p>

        <hr />

        <h2>13. Évolution du service</h2>
        <p>TiWave se réserve le droit de :</p>
        <ul>
          <li>modifier ou interrompre le service</li>
          <li>faire évoluer les fonctionnalités</li>
        </ul>
        <p>sans préavis.</p>

        <hr />

        <h2>14. Modification des CGU</h2>
        <p>Les présentes CGU peuvent être modifiées à tout moment.</p>
        <p>
          En cas de modification importante, vous serez informé via
          l’application ou par email.
        </p>

        <hr />

        <h2>15. Droit applicable</h2>
        <p>Les présentes CGU sont soumises au droit français.</p>
        <p>
          En cas de litige, les tribunaux compétents seront ceux du ressort du
          siège de l’éditeur.
        </p>

        <hr />

        <h2>16. Contact</h2>
        <p>
          <a href="mailto:contact@tiwave.app">contact@tiwave.app</a>
        </p>
      </div>
    </main>
  )
}
