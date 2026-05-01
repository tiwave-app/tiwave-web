import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — TiWave',
  description:
    'Comment TiWave collecte, utilise et protège vos données personnelles. Conforme au RGPD.',
  alternates: { canonical: 'https://tiwave.app/confidentialite' },
}

const LAST_UPDATE = '1er mai 2026'

export default function Confidentialite() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-[#013a63] mb-2">
        Politique de confidentialité — TiWave
      </h1>
      <p className="text-sm text-gray-500 mb-10">
        Dernière mise à jour : {LAST_UPDATE}
      </p>

      <div className="prose prose-slate max-w-none prose-headings:text-[#013a63] prose-headings:font-bold prose-h2:mt-10 prose-h2:mb-3 prose-h2:text-xl prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-lg prose-a:text-[#0093d0] prose-a:no-underline hover:prose-a:underline prose-hr:my-8">
        <p>
          La présente politique décrit comment TiWave (« <strong>nous</strong> »)
          collecte, utilise et protège vos données personnelles lorsque vous
          utilisez l’application mobile TiWave (iOS, Android) et le site{' '}
          <a href="https://tiwave.app">tiwave.app</a> (« <strong>les Services</strong> »).
        </p>
        <p>
          Nous nous engageons à respecter le Règlement Général sur la Protection
          des Données (UE 2016/679 — « RGPD ») et la loi française Informatique
          et Libertés.
        </p>

        <hr />

        <h2>1. Responsable du traitement</h2>
        <p>
          TiWave — Maria Galbert
          <br />
          Martinique, Antilles françaises
          <br />
          Email :{' '}
          <a href="mailto:contact@tiwave.app">contact@tiwave.app</a>
        </p>

        <hr />

        <h2>2. Données que nous collectons</h2>

        <h3>2.1. Données de compte</h3>
        <ul>
          <li>Adresse email</li>
          <li>Identifiants d’authentification (mot de passe sécurisé ou connexion via Apple / Google)</li>
          <li>Nom d’utilisateur (pseudo public)</li>
          <li>Photo de profil (facultative)</li>
          <li>Territoire sélectionné (ex : Martinique, Guadeloupe)</li>
        </ul>

        <hr />

        <h3>2.2. Données de localisation</h3>
        <ul>
          <li>Position GPS précise, uniquement avec votre consentement et lorsque l’application est ouverte</li>
        </ul>
        <p>Utilisation :</p>
        <ul>
          <li>affichage des plages proches</li>
          <li>amélioration de la pertinence des informations</li>
        </ul>
        <p>
          Nous ne collectons jamais votre position en arrière-plan.
          <br />
          Vous pouvez retirer votre consentement à tout moment depuis les réglages de votre appareil.
        </p>

        <hr />

        <h3>2.3. Contenus que vous publiez</h3>
        <ul>
          <li>Rapports de plage (conditions, sargasses, fréquentation, observations)</li>
          <li>Photos</li>
          <li>Commentaires et interactions</li>
        </ul>
        <p>Ces contenus peuvent être visibles par les autres utilisateurs de l’application.</p>

        <hr />

        <h3>2.4. Notifications push</h3>
        <ul>
          <li>Identifiant de notification (OneSignal / Firebase Cloud Messaging)</li>
          <li>Plateforme (iOS / Android)</li>
        </ul>
        <p>Uniquement si vous avez accepté de recevoir des notifications.</p>

        <hr />

        <h3>2.5. Données techniques</h3>
        <ul>
          <li>Adresse IP</li>
          <li>Logs de connexion</li>
          <li>Type d’appareil</li>
          <li>Version de l’application</li>
        </ul>
        <p>Ces données sont utilisées à des fins de sécurité, de maintenance et de diagnostic.</p>

        <hr />

        <h3>2.6. Formulaires et communications</h3>
        <ul>
          <li>Email (newsletter, programme bêta)</li>
          <li>Nom, email et message (formulaire de contact)</li>
        </ul>

        <hr />

        <h2>3. Finalités et bases légales</h2>
        <table>
          <thead>
            <tr>
              <th>Finalité</th>
              <th>Base légale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Création et gestion du compte</td>
              <td>Exécution du contrat</td>
            </tr>
            <tr>
              <td>Publication de contenu</td>
              <td>Exécution du contrat</td>
            </tr>
            <tr>
              <td>Affichage des plages proches</td>
              <td>Consentement</td>
            </tr>
            <tr>
              <td>Notifications push</td>
              <td>Consentement</td>
            </tr>
            <tr>
              <td>Newsletter / programme bêta</td>
              <td>Consentement</td>
            </tr>
            <tr>
              <td>Sécurité et prévention de la fraude</td>
              <td>Intérêt légitime</td>
            </tr>
            <tr>
              <td>Statistiques anonymisées</td>
              <td>Intérêt légitime</td>
            </tr>
          </tbody>
        </table>
        <p>Vous pouvez retirer votre consentement à tout moment.</p>

        <hr />

        <h2>4. Durée de conservation</h2>
        <ul>
          <li>Données de compte : conservées tant que votre compte est actif</li>
          <li>Suppression du compte : effective sous 30 jours</li>
          <li>Contenus publiés : supprimés ou anonymisés lors de la suppression du compte</li>
          <li>Logs techniques : 12 mois maximum</li>
          <li>Newsletter : jusqu’à votre désabonnement</li>
        </ul>

        <hr />

        <h2>5. Destinataires et sous-traitants</h2>
        <p>Nous ne vendons jamais vos données personnelles.</p>
        <p>Nous faisons appel aux prestataires suivants :</p>
        <ul>
          <li>Supabase : authentification, base de données, stockage (Union européenne)</li>
          <li>OneSignal : notifications push (États-Unis)</li>
          <li>Google (Maps SDK, Firebase Cloud Messaging) : cartographie et notifications Android (États-Unis)</li>
          <li>Vercel : hébergement du site web et du panneau d’administration (États-Unis)</li>
          <li>Resend : envoi des emails (États-Unis / Union européenne)</li>
        </ul>
        <p>Ces prestataires agissent en tant que sous-traitants au sens du RGPD.</p>

        <hr />

        <h2>6. Transferts hors Union européenne</h2>
        <p>
          Certains prestataires sont situés en dehors de l’Union européenne,
          notamment aux États-Unis.
        </p>
        <p>Ces transferts sont encadrés par :</p>
        <ul>
          <li>le Data Privacy Framework</li>
          <li>et/ou les Clauses Contractuelles Types de la Commission européenne</li>
        </ul>
        <p>conformément aux articles 45 et 46 du RGPD.</p>

        <hr />

        <h2>7. Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li>droit d’accès</li>
          <li>droit de rectification</li>
          <li>droit à l’effacement</li>
          <li>droit à la limitation</li>
          <li>droit à la portabilité</li>
          <li>droit d’opposition</li>
          <li>droit de retirer votre consentement</li>
        </ul>
        <p>
          Pour exercer vos droits :{' '}
          <a href="mailto:contact@tiwave.app">contact@tiwave.app</a>
          <br />
          Délai de réponse : 30 jours maximum
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL
          (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener">
            www.cnil.fr
          </a>
          ).
        </p>

        <hr />

        <h2>8. Suppression de votre compte</h2>
        <p>Vous pouvez supprimer votre compte :</p>
        <ul>
          <li>depuis les paramètres de l’application</li>
          <li>
            ou en écrivant à{' '}
            <a href="mailto:contact@tiwave.app">contact@tiwave.app</a>
          </li>
        </ul>
        <p>La suppression entraîne :</p>
        <ul>
          <li>la suppression de vos données personnelles</li>
          <li>la suppression ou anonymisation de vos contenus</li>
        </ul>
        <p>Délai maximum : 30 jours.</p>

        <hr />

        <h2>9. Sécurité</h2>
        <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées :</p>
        <ul>
          <li>chiffrement des communications (HTTPS / TLS)</li>
          <li>contrôle d’accès aux données</li>
          <li>journalisation des accès</li>
          <li>séparation des environnements</li>
        </ul>

        <hr />

        <h2>10. Mineurs</h2>
        <p>TiWave est accessible à partir de 13 ans.</p>
        <p>
          Pour les utilisateurs de moins de 15 ans, l’accord du représentant
          légal est requis, conformément à la réglementation française.
        </p>

        <hr />

        <h2>11. Cookies (site web)</h2>
        <p>
          Le site <a href="https://tiwave.app">tiwave.app</a> utilise uniquement
          des cookies strictement nécessaires au fonctionnement.
        </p>
        <p>
          Aucun cookie de mesure d’audience ou publicitaire n’est utilisé sans
          votre consentement.
        </p>

        <hr />

        <h2>12. Modifications</h2>
        <p>Nous pouvons modifier la présente politique à tout moment.</p>
        <p>
          La date de mise à jour est indiquée en haut de cette page.
          <br />
          En cas de modification importante, vous serez informé via l’application
          ou par email.
        </p>

        <hr />

        <h2>13. Contact</h2>
        <p>
          Pour toute question :
          <br />
          <a href="mailto:contact@tiwave.app">contact@tiwave.app</a>
        </p>
      </div>
    </main>
  )
}
