import Link from 'next/link'

export const metadata = {
  title: 'Conditions de participation — Beta TiWave',
  description: 'Conditions de participation au programme beta testeurs TiWave.',
}

export default function BetaConditionsPage() {
  return (
    <>
      <Nav />
      <main
        className="min-h-screen pt-24 pb-32"
        style={{ background: 'linear-gradient(160deg, #013a63 0%, #020c1b 50%, #071e38 100%)' }}
      >
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="mb-10">
            <Link
              href="/beta"
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              ← Retour au formulaire
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Conditions de participation
          </h1>
          <p className="text-white/40 text-sm mb-12">
            Programme Beta TiWave — Dernière mise à jour : mai 2026
          </p>

          <div className="space-y-10 text-white/75 text-sm leading-relaxed">

            <section>
              <h2 className="text-white font-semibold text-base mb-3">1. Objet</h2>
              <p>
                Le programme beta TiWave permet à un nombre limité de personnes sélectionnées
                de tester l'application mobile TiWave avant son lancement officiel, et de
                contribuer activement à son amélioration.
              </p>
            </section>

            <div className="border-t border-white/8" />

            <section>
              <h2 className="text-white font-semibold text-base mb-3">2. Conditions d'accès</h2>
              <p className="mb-3">
                La participation est réservée aux personnes physiques âgées de 16 ans ou plus,
                résidant en Martinique.
              </p>
              <p className="mb-3">
                En soumettant le formulaire d'inscription, vous certifiez remplir ces conditions.
              </p>
              <p className="mb-3">
                L'accès à l'application beta est personnel, nominatif et non transférable.
              </p>
              <p className="mb-2">Vous vous engagez à :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>ne pas partager vos identifiants d'accès ;</li>
                <li>
                  ne pas diffuser publiquement de captures d'écran, vidéos ou informations
                  relatives à des fonctionnalités non encore annoncées.
                </li>
              </ul>
            </section>

            <div className="border-t border-white/8" />

            <section>
              <h2 className="text-white font-semibold text-base mb-3">3. Vos engagements</h2>
              <p className="mb-2">En participant au programme beta, vous vous engagez à :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>utiliser l'application dans des conditions réelles d'usage ;</li>
                <li>signaler tout bug ou dysfonctionnement via les canaux communiqués ;</li>
                <li>fournir des retours sincères et constructifs ;</li>
                <li>répondre, dans la mesure du possible, au questionnaire de fin de test.</li>
              </ul>
            </section>

            <div className="border-t border-white/8" />

            <section>
              <h2 className="text-white font-semibold text-base mb-3">4. Durée</h2>
              <p className="mb-3">
                La période de test est estimée à 4 semaines à compter de la date
                d'activation de votre accès.
              </p>
              <p className="mb-3">
                TiWave se réserve le droit de prolonger, écourter ou interrompre le
                programme à tout moment.
              </p>
              <p>
                Vous pouvez vous retirer du programme à tout moment en écrivant à{' '}
                <a
                  href="mailto:contact@tiwave.app"
                  className="text-[#0093d0] hover:underline"
                >
                  contact@tiwave.app
                </a>.
              </p>
            </section>

            <div className="border-t border-white/8" />

            <section>
              <h2 className="text-white font-semibold text-base mb-3">
                5. Application fournie &quot;en l'état&quot;
              </h2>
              <p className="mb-3">
                L'application beta est fournie à des fins de test uniquement, &quot;en l'état&quot;
                et sans garantie de performance ou de disponibilité.
              </p>
              <p className="mb-3">
                Elle peut contenir des bugs, être instable ou indisponible.
              </p>
              <p className="mb-3">
                Vous reconnaissez utiliser l'application sous votre seule responsabilité.
              </p>
              <p>
                TiWave ne saurait être tenu responsable de toute perte de données, dommage
                ou interruption de service survenant dans ce cadre.
              </p>
            </section>

            <div className="border-t border-white/8" />

            <section>
              <h2 className="text-white font-semibold text-base mb-3">6. Confidentialité</h2>
              <p className="mb-3">
                Les fonctionnalités, contenus et informations accessibles dans le cadre du
                programme beta sont confidentiels.
              </p>
              <p>
                Vous vous engagez à ne pas les divulguer publiquement sans autorisation
                préalable de TiWave.
              </p>
            </section>

            <div className="border-t border-white/8" />

            <section>
              <h2 className="text-white font-semibold text-base mb-3">
                7. Utilisation de vos retours
              </h2>
              <p className="mb-3">
                Les retours (commentaires, suggestions, signalements) que vous fournissez
                peuvent être utilisés librement par TiWave afin d'améliorer le produit.
              </p>
              <p className="mb-3">
                Si vous y avez consenti lors de votre inscription, des extraits de vos
                retours pourront être utilisés dans les communications de TiWave (site,
                réseaux sociaux, presse), avec votre prénom uniquement.
              </p>
              <p>
                Vous pouvez retirer ce consentement à tout moment en écrivant à{' '}
                <a
                  href="mailto:contact@tiwave.app"
                  className="text-[#0093d0] hover:underline"
                >
                  contact@tiwave.app
                </a>.
              </p>
            </section>

            <div className="border-t border-white/8" />

            <section>
              <h2 className="text-white font-semibold text-base mb-4">8. Données personnelles</h2>

              <div className="space-y-5">
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-1">
                    Responsable du traitement
                  </p>
                  <p>
                    Maria Galbert — TiWave — Martinique<br />
                    <a href="mailto:contact@tiwave.app" className="text-[#0093d0] hover:underline">
                      contact@tiwave.app
                    </a>
                  </p>
                </div>

                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-1">
                    Données collectées
                  </p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>prénom</li>
                    <li>adresse email</li>
                    <li>type d'appareil (iOS / Android)</li>
                  </ul>
                </div>

                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-1">
                    Finalités
                  </p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>gestion du programme beta</li>
                    <li>communication avec les testeurs</li>
                    <li>amélioration du produit</li>
                  </ul>
                </div>

                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-1">
                    Base légale
                  </p>
                  <p>Consentement (article 6.1.a du RGPD)</p>
                </div>

                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-1">
                    Durée de conservation
                  </p>
                  <p>12 mois à compter de la fin du programme beta</p>
                </div>

                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-1">
                    Sous-traitants
                  </p>
                  <p>
                    Les données sont hébergées via Supabase (infrastructure cloud) et peuvent
                    transiter par Resend (envoi d'emails), agissant en qualité de
                    sous-traitants au sens du RGPD.
                  </p>
                </div>

                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-1">
                    Vos droits
                  </p>
                  <p className="mb-2">
                    Vous disposez d'un droit d'accès, de rectification, de suppression,
                    de limitation et d'opposition concernant vos données.
                  </p>
                  <p className="mb-2">
                    Pour exercer vos droits :{' '}
                    <a href="mailto:contact@tiwave.app" className="text-[#0093d0] hover:underline">
                      contact@tiwave.app
                    </a>
                  </p>
                  <p>
                    Vous pouvez également introduire une réclamation auprès de la CNIL :{' '}
                    <a
                      href="https://www.cnil.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0093d0] hover:underline"
                    >
                      www.cnil.fr
                    </a>
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  )
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#013a63]/90 backdrop-blur-sm">
      <Link href="/" className="text-xl font-bold">
        <span className="text-white">Tiwave</span>
        <span className="text-[#0093d0]">.</span>
      </Link>
      <Link
        href="/beta"
        className="bg-[#0093d0] text-white text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
      >
        Rejoindre la beta
      </Link>
    </nav>
  )
}
