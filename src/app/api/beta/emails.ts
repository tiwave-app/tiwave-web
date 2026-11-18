// E-mails envoyés à chaque inscription sur /beta.
//
// Le test fermé Google Play ne s'ouvre qu'aux adresses ajoutées à la main
// dans la Play Console. Le testeur Android reçoit donc d'abord une
// confirmation, puis l'invitation avec le lien de test, que Maria envoie
// une fois l'adresse ajoutée (bouton préparé dans sa notification).

const APP_STORE_URL = 'https://apps.apple.com/app/id6767921828'
// Lien de participation au test fermé : à comparer avec celui affiché dans
// Play Console > Tests > Test fermé > Testeurs.
export const PLAY_OPT_IN_URL = 'https://play.google.com/apps/testing/app.tiwave.mobile'
const LOGO_URL = 'https://tiwave.app/logo-name-email.png'

export const BETA_FROM = 'Maria de TiWave <maria@tiwave.app>'
export const MARIA_EMAIL = 'maria@tiwave.app'

export type BetaSignup = {
  firstName: string
  email: string
  os: 'ios' | 'android'
  acceptsCitation: boolean
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function layout(content: string): string {
  return `<!doctype html>
<html lang="fr"><body style="margin:0;background:#f4e9d8;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#013a63">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px">
    <img src="${LOGO_URL}" alt="TiWave" width="140" style="display:block;margin:0 0 24px" />
    <div style="background:#ffffff;border-radius:20px;padding:28px 26px;font-size:16px;line-height:1.55">
      ${content}
    </div>
    <p style="font-size:13px;color:#5b6b78;margin:20px 4px 6px;text-align:center">
      Suis TiWave&nbsp;:
      <a href="https://www.instagram.com/tiwave.app" style="color:#0093d0;text-decoration:none;font-weight:600">Instagram</a> ·
      <a href="https://www.tiktok.com/@tiwave.app" style="color:#0093d0;text-decoration:none;font-weight:600">TikTok</a> ·
      <a href="https://www.facebook.com/tiwaveapp" style="color:#0093d0;text-decoration:none;font-weight:600">Facebook</a>
    </p>
    <p style="font-size:12px;color:#5b6b78;margin:0 4px;text-align:center">TiWave · La bonne plage, aujourd'hui.</p>
  </div>
</body></html>`
}

const button = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#0093d0;color:#ffffff;text-decoration:none;font-weight:700;padding:14px 24px;border-radius:999px">${label}</a>`

// Confirmation au testeur
export function testerConfirmation(signup: BetaSignup) {
  const prenom = escapeHtml(signup.firstName)
  const email = escapeHtml(signup.email)

  if (signup.os === 'ios') {
    return {
      subject: 'TiWave est déjà sur ton iPhone 🌊',
      html: layout(`
        <p>Salut ${prenom},</p>
        <p>Merci de vouloir tester TiWave&nbsp;! Bonne nouvelle&nbsp;: sur iPhone, pas besoin d'attendre, l'app est déjà sur l'App Store.</p>
        <p style="margin:24px 0">${button(APP_STORE_URL, "Télécharger TiWave")}</p>
        <p>Ton avis m'intéresse autant que celui d'un testeur&nbsp;: si quelque chose cloche, ou si une plage manque, réponds simplement à ce mail.</p>
        <p>À très vite à la plage,<br><strong>Maria</strong><br><span style="color:#5b6b78">Fondatrice de TiWave</span></p>
      `),
    }
  }

  return {
    subject: 'Bienvenue chez les testeurs Android de TiWave 🌊',
    html: layout(`
      <p>Salut ${prenom},</p>
      <p>Merci de rejoindre les premiers testeurs de TiWave sur Android&nbsp;! Avec toi et les autres testeurs, l'app pourra s'ouvrir à tout le monde sur le Play Store.</p>
      <p style="font-weight:700;margin:22px 0 8px">Ce qui se passe maintenant</p>
      <ol style="padding-left:20px;margin:0">
        <li style="margin-bottom:10px"><strong>Je t'ajoute à la liste des testeurs</strong> sur Google Play, dans les 24&nbsp;h.</li>
        <li style="margin-bottom:10px"><strong>Tu reçois un second mail</strong> avec le lien pour installer TiWave.</li>
        <li><strong>Tu la gardes installée 14 jours.</strong> C'est la condition de Google pour ouvrir l'app à tous.</li>
      </ol>
      <div style="background:#e6f6f2;border-radius:14px;padding:14px 16px;margin:22px 0;font-size:15px">
        Vérifie juste que <strong>${email}</strong> est bien l'adresse du compte Google de ton téléphone (celle du Play Store). Sinon, réponds à ce mail avec la bonne adresse.
      </div>
      <p>Une question&nbsp;? Réponds simplement à ce mail, c'est moi qui lis.</p>
      <p>Merci encore,<br><strong>Maria</strong><br><span style="color:#5b6b78">Fondatrice de TiWave</span></p>
    `),
  }
}

// Invitation envoyée par Maria une fois l'adresse ajoutée dans la Play Console
export function androidInvitation(signup: BetaSignup) {
  const subject = 'Ton accès à TiWave sur Android est prêt 🎉'
  const body = `Salut ${signup.firstName},

C'est bon, tu es dans la liste des testeurs !

1. Depuis ton téléphone Android, ouvre ce lien (avec le compte Google ${signup.email}) :
${PLAY_OPT_IN_URL}

2. Appuie sur « Devenir testeur », puis sur « Télécharger sur Google Play ».

3. Garde TiWave installée 14 jours : c'est ce qui permettra de l'ouvrir à tout le monde.

Si quelque chose cloche, même un détail, réponds à ce mail : c'est exactement ce que je cherche.

Merci !
Maria
Fondatrice de TiWave`
  return { subject, body }
}

// Notification à Maria
export function mariaNotification(signup: BetaSignup) {
  const prenom = escapeHtml(signup.firstName)
  const email = escapeHtml(signup.email)
  const date = new Date().toLocaleString('fr-FR', { timeZone: 'America/Martinique', dateStyle: 'full', timeStyle: 'short' })
  const appareil = signup.os === 'android' ? 'Android' : 'iPhone'

  const rows = `
    <table cellpadding="6" style="border-collapse:collapse;font-size:15px;margin:0 0 20px">
      <tr><td style="color:#5b6b78">Prénom</td><td><strong>${prenom}</strong></td></tr>
      <tr><td style="color:#5b6b78">E-mail</td><td><strong>${email}</strong></td></tr>
      <tr><td style="color:#5b6b78">Appareil</td><td>${appareil}</td></tr>
      <tr><td style="color:#5b6b78">Citation</td><td>${signup.acceptsCitation ? 'OK pour être cité·e' : 'Non'}</td></tr>
      <tr><td style="color:#5b6b78">Inscrit·e le</td><td>${escapeHtml(date)}</td></tr>
    </table>`

  if (signup.os === 'ios') {
    return {
      subject: `Nouvelle inscription iPhone : ${signup.firstName}`,
      html: layout(`
        ${rows}
        <p>Rien à faire&nbsp;: TiWave est déjà sur l'App Store, la personne a reçu le lien de téléchargement.</p>
      `),
    }
  }

  const invite = androidInvitation(signup)
  const mailto = `mailto:${encodeURIComponent(signup.email)}?subject=${encodeURIComponent(invite.subject)}&body=${encodeURIComponent(invite.body)}`

  return {
    subject: `🧪 Nouveau testeur Android : ${signup.firstName}`,
    html: layout(`
      ${rows}
      <p style="font-weight:700;margin:0 0 8px">À faire</p>
      <ol style="padding-left:20px;margin:0 0 22px">
        <li style="margin-bottom:8px">Play Console → <strong>Tests → Test fermé → Testeurs</strong> : ajoute <strong>${email}</strong> à la liste, puis enregistre.</li>
        <li>Envoie-lui l'invitation&nbsp;: le bouton ouvre le mail déjà rédigé dans ta messagerie.</li>
      </ol>
      <p style="margin:0 0 8px">${button(mailto, "Envoyer l'invitation")}</p>
    `),
  }
}
