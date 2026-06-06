import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Suppression de compte — TiWave',
  description:
    'Comment supprimer votre compte TiWave et vos données personnelles, depuis l’application ou par email.',
  alternates: { canonical: 'https://tiwave.app/suppression-compte' },
}

const LAST_UPDATE = '6 juin 2026'

export default function SuppressionCompte() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-[#013a63] mb-2">
        Suppression de compte — TiWave
      </h1>
      <p className="text-sm text-gray-500 mb-10">
        Dernière mise à jour : {LAST_UPDATE}
      </p>

      <div className="prose prose-slate max-w-none prose-headings:text-[#013a63] prose-headings:font-bold prose-h2:mt-10 prose-h2:mb-3 prose-h2:text-xl prose-a:text-[#0093d0] prose-a:no-underline hover:prose-a:underline prose-hr:my-8">
        <p>
          Vous pouvez supprimer votre compte TiWave et l’ensemble de vos données
          personnelles à tout moment, directement depuis l’application ou en nous
          contactant par email.
        </p>

        <hr />

        <h2>1. Depuis l’application (recommandé)</h2>
        <ol>
          <li>Ouvrez l’application TiWave</li>
          <li>
            Allez dans l’onglet <strong>Profil</strong>
          </li>
          <li>
            Appuyez sur <strong>Supprimer mon compte</strong>
          </li>
          <li>
            Confirmez en tapant <strong>SUPPRIMER</strong>
          </li>
        </ol>
        <p>
          La suppression est <strong>immédiate et irréversible</strong>.
        </p>

        <h2>2. Par email</h2>
        <p>
          Si vous n’avez plus accès à l’application, écrivez-nous à{' '}
          <a href="mailto:contact@tiwave.app">contact@tiwave.app</a> depuis
          l’adresse email associée à votre compte, avec pour objet «&nbsp;Suppression
          de compte&nbsp;». Nous traitons la demande sous 30 jours.
        </p>

        <hr />

        <h2>3. Données supprimées</h2>
        <p>La suppression de votre compte efface définitivement :</p>
        <ul>
          <li>votre profil (nom d’utilisateur, avatar, email, territoire)</li>
          <li>vos observations de plage et les photos associées</li>
          <li>vos plages favorites</li>
          <li>vos notifications et vos jetons de notification push</li>
          <li>vos «&nbsp;j’aime&nbsp;», signalements et blocages</li>
        </ul>

        <h2>4. Données conservées</h2>
        <p>
          Les photos que vous avez contribuées à la galerie d’une plage (contenu
          communautaire partagé) peuvent être conservées sous forme{' '}
          <strong>anonymisée</strong>, sans aucun lien avec votre identité.
        </p>
        <p>
          Certaines données peuvent être conservées plus longtemps si la loi
          l’exige (obligations légales, comptables ou de sécurité), puis
          supprimées à l’issue du délai légal.
        </p>

        <hr />

        <p>
          Pour en savoir plus sur le traitement de vos données, consultez notre{' '}
          <a href="https://tiwave.app/confidentialite">
            politique de confidentialité
          </a>
          .
        </p>
      </div>
    </main>
  )
}
