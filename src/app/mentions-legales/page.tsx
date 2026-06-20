export default function MentionsLegales() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold text-[#013a63] mb-8">Mentions légales</h1>
      <div className="prose prose-slate">
        <h2>Éditeur</h2>
        <p>
          TiWave<br />
          Martinique, Antilles françaises<br />
          contact@tiwave.app
        </p>
        <h2>Hébergement</h2>
        <p>
          Vercel Inc.<br />
          340 Pine Street, Suite 800, San Francisco, CA 94104, USA
        </p>
        <h2>Responsable de publication</h2>
        <p>Maria Galbert — contact@tiwave.app</p>

        <h2>Sources des données</h2>
        <p>
          TiWave agrège des données publiques. Les conditions affichées dans
          l&apos;application proviennent des sources suivantes&nbsp;:
        </p>
        <ul>
          <li>
            <strong>Données météo et marines</strong> (température, vagues, houle,
            vent, UV)&nbsp;: <a href="https://open-meteo.com/">Open-Meteo</a> —
            licence <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
          </li>
          <li>
            <strong>Détection des sargasses</strong>&nbsp;: NOAA AOML / University of
            South Florida (indice AFAI, composite 7&nbsp;jours).
          </li>
          <li>
            <strong>Qualité des eaux de baignade</strong>&nbsp;: Ministère de la
            Santé / Agence Régionale de Santé —{' '}
            <a href="https://baignades.sante.gouv.fr/">baignades.sante.gouv.fr</a>,
            Licence Ouverte Etalab 2.0.
          </li>
        </ul>
        <p>
          Ces données sont fournies à titre informatif et ne se substituent pas
          aux consignes officielles de sécurité (drapeaux de baignade, arrêtés
          municipaux, alertes préfectorales).
        </p>
      </div>
    </main>
  )
}
