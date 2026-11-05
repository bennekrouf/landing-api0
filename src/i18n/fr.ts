// src/i18n/fr.ts — the landing page's French copy, in the shape of en.ts.

import type { Copy } from './index';

export const fr: Copy = {
  meta: {
    title: 'API0 - L’intelligence à la demande pour tout backend',
    description:
      'Ajoutez une interface intelligente à n’importe quel backend. Importez votre API et votre équipe l’utilise depuis Teams, WhatsApp, Telegram ou Claude, en langage naturel. Sans réécriture, entièrement dans le cloud.',
    pricingTitle: 'Tarifs',
    pricingDescription:
      'Les offres api0 par espace de travail : sièges et crédits inclus, votre API dans Telegram, WhatsApp et Teams. Facturé en CHF, conçu en Suisse.',
  },
  nav: {
    howItWorks: 'Comment ça marche',
    pricing: 'Tarifs',
    blog: 'Blog',
    getStarted: 'Commencer',
    dashboard: 'Tableau de bord',
    switchTo: 'EN',
    switchLabel: 'English version',
  },
  footer: {
    tagline: 'Le pont IA pour l’entreprise',
    product: 'Produit',
    legal: 'Mentions légales',
    connect: 'Suivre',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    rights: 'Tous droits réservés.',
  },
  home: {
    eyebrow: 'L’intelligence à la demande · Dans le cloud',
    titleBefore: 'Ajoutez une interface intelligente à ',
    titleHighlight: 'n’importe quel backend',
    tagline: 'Votre logiciel, dans la messagerie que votre équipe utilise déjà.',
    lead:
      'Votre backend fait déjà le travail. api0 permet de lui parler : importez votre API, et votre équipe l’utilise depuis Teams, WhatsApp, Telegram ou Claude, en langage naturel. Chaque action s’exécute au nom de la personne qui la demande.',
    promise: 'Sans réécriture, sans nouveau frontend, rien à héberger. En ligne en moins de cinq minutes.',
    ctaImport: 'Importer votre API',
    ctaAuth: 'Voir l’authentification',

    useCasesTitle: 'Ce que les équipes en font',
    useCasesLead: 'Une API, importée une seule fois. Chaque équipe l’utilise depuis la messagerie où elle travaille déjà.',
    useCases: [
      {
        who: 'Éditeurs de logiciels',
        channel: 'Teams',
        action: 'Vos clients utilisent votre produit depuis Teams, comme votre propre application.',
        body: 'Mettez votre produit dans le chat Microsoft Teams de vos clients sans développer de chatbot. Chaque utilisateur se connecte une fois et agit avec ses propres droits.',
      },
      {
        who: 'Interventions terrain',
        channel: 'WhatsApp',
        action: 'Les techniciens clôturent leurs interventions depuis WhatsApp.',
        body: 'Aucune nouvelle application à déployer. Un technicien écrit « intervention 4711 terminée » et elle est clôturée dans votre logiciel d’interventions, enregistrée à son nom.',
      },
    ],

    stepsTitle: 'Trois étapes jusqu’au premier appel d’agent',
    stepsLead: 'Importez votre API → envoyez un lien à votre équipe → chaque appel est contrôlé, attribué et décompté.',
    step: 'ÉTAPE',
    steps: [
      {
        title: 'Importez vos endpoints',
        body: 'Collez une spécification OpenAPI, ou décrivez vos endpoints en français. api0 transforme chacun en outil MCP, et un test intégré l’appelle avant qu’il soit considéré comme configuré.',
        code: `POST /api/invoices
  crée une facture
  requis :
    customer_id, amount`,
      },
      {
        title: 'Envoyez un seul lien à votre équipe',
        body: 'Votre espace de travail a sa propre page de démarrage. Chacun se connecte une fois, puis l’ajoute à Claude ou à Teams, ou relie son WhatsApp ou son Telegram à votre propre bot.',
        code: `app.api0.ai/link/acme

  ✓ Connecteur Claude
  ✓ Acme dans Teams
  ✓ WhatsApp
  ✓ @acme_bot sur Telegram`,
      },
      {
        title: 'Gardez le contrôle',
        body: 'Chaque appel passe par la passerelle : elle vérifie qui appelle, joint l’identifiant attendu par votre backend, décompte les crédits et journalise l’appel.',
        code: `tools/call create_invoice
  ✓ appelant : jane@acme.com
  ✓ identifiant joint
  ✓ crédits vérifiés
  → POST /api/invoices`,
      },
    ],
    quickstart: 'Suivre le guide de démarrage en cinq minutes',

    authTitle: 'Ce que reçoit votre backend',
    authLead:
      'Vous choisissez comment api0 s’authentifie auprès de votre backend. L’identifiant est conservé dans api0 et joint à chaque appel, avec l’identité de la personne concernée.',
    backendAuth: [
      { title: 'Jeton d’identité Google', body: 'Prouve que l’appel vient d’api0. Vérifiez-le comme tout jeton OIDC de compte de service.' },
      { title: 'Jeton bearer ou en-têtes fixes', body: 'Un jeton statique ou un en-tête de clé API, conservé dans api0. Claude ne le voit jamais.' },
      { title: 'Identifiants client OAuth', body: 'api0 obtient et renouvelle un jeton auprès de votre fournisseur d’identité.' },
      { title: 'Secret par utilisateur', body: 'Chacun enregistre sa propre clé, et ses appels la transmettent.' },
      { title: 'Compte OAuth par utilisateur', body: 'Chacun connecte son propre compte une fois, et agit en son nom.' },
    ],
    callersTitle: 'Qui appelle',
    callers: [
      'OAuth 2.1 avec PKCE pour les connecteurs Claude',
      'Clés API pour le SDK, la CLI et les tâches CI',
      'Votre propre fournisseur d’identité : Entra ID ou tout OIDC',
    ],
    connectionTest:
      'Le test de connexion du tableau de bord suit exactement le même chemin qu’un vrai appel : un test réussi, c’est une configuration qui fonctionne.',

    whyTitle: 'Pourquoi api0',
    differentiators: [
      {
        title: 'Là où votre équipe se trouve déjà',
        body: 'Le chat Microsoft Teams, vos propres bots WhatsApp et Telegram, Claude sur le web, ordinateur et mobile, et tout client compatible MCP. Aucun SDK à intégrer, aucun modèle à héberger.',
      },
      {
        title: 'Un seul point pour l’identité',
        body: 'Qui appelle, ce qu’il a le droit de faire et quel identifiant reçoit votre backend : tout se décide dans une seule passerelle, quel que soit le client utilisé.',
      },
      {
        title: 'Écrit en Rust',
        body: 'La passerelle et chaque service backend sont écrits en Rust, pour une latence prévisible et une surface d’attaque réduite.',
      },
      {
        title: 'Une offre par espace de travail',
        body: 'Sièges et crédits inclus, membres supplémentaires au siège, dépassement sur la facture suivante. Pas besoin d’un commercial pour commencer.',
      },
    ],

    compareTitle: 'api0 face aux alternatives',
    compareLead:
      'Seuls les points forts d’api0 sont listés. Les autres font beaucoup de choses qu’api0 ne fait pas — voici pourquoi le choisir.',
    feature: 'Fonctionnalité',
    yes: 'Oui',
    no: 'Non',
    comparison: [
      {
        feature: 'Votre propre API REST en outils MCP, depuis une spec OpenAPI ou une description en langage naturel',
        them: ['Spec OpenAPI ; outils REST en préversion', 'Expose des serveurs MCP que vous exploitez déjà', 'Spec OpenAPI en configuration YAML', 'Votre API en code, ou un serveur MCP que vous hébergez'],
      },
      {
        feature: 'Les mêmes outils dans Teams, WhatsApp, votre propre bot Telegram et Claude',
        them: ['Teams et WhatsApp ; Telegram demande du code', 'Clients MCP uniquement', 'Clients MCP et A2A uniquement', 'Via votre propre application ou des clients MCP'],
      },
      {
        feature: 'Un lien de démarrage par espace de travail : connexion unique, puis Claude ou un bot',
        them: ['Lien d’installation Teams ; QR code WhatsApp', 'URL de portail derrière Access', false, 'Liens d’authentification par application'],
      },
      {
        feature: 'Cinq modes d’identifiants backend, dont secrets et OAuth par utilisateur',
        them: ['Aucun, une clé API saisie par l’utilisateur, ou OAuth par utilisateur', 'Laissé à chaque serveur MCP', 'Politiques à configurer', 'Pour les applications du catalogue ; votre API en code'],
      },
      {
        feature: 'Rien à héberger ni à exploiter',
        them: ['Hébergé ; WhatsApp demande votre propre ressource Azure', true, 'À exploiter vous-même', true],
      },
    ],
    compareNote: 'Comparaison d’octobre 2026, d’après la documentation publique de chaque produit.',

    proxyTitle: 'De l’appel d’outil au véritable appel d’API',
    proxyNote:
      'La passerelle injecte les paramètres dans l’URL et le corps avec le bon verbe HTTP, puis renvoie le résultat au modèle.',
    architecture: 'Voir toute l’architecture sur une page',

    finalTitle: 'Rendez votre backend intelligent cette semaine',
    finalLead: 'Connectez-vous avec Google, importez votre API et envoyez un lien à votre équipe. Une offre par espace de travail, sans rendez-vous commercial.',
    finalCta: 'Commencer',
  },
  pricing: {
    title: 'Tarifs par espace de travail',
    lead: 'Sièges et crédits inclus. Membres supplémentaires au siège ; crédits au-delà du forfait sur la facture suivante.',
    perMonth: '/ mois',
    channelsLabel: 'Votre API dans',
    seatsIncluded: (n: number) => `${n} sièges inclus`,
    perExtraSeat: (price: string) => `${price} par siège supplémentaire`,
    creditsPerMonth: (n: string) => `${n} crédits / mois`,
    overage: (price: string) => `${price} par tranche de 1 000 crédits supplémentaires`,
    start: 'Commencer',
    enterprise: 'Entreprise',
    custom: 'Sur mesure',
    enterpriseBody: 'Plus de sièges et de crédits, paiement sur facture, contrat et accord de traitement des données.',
    contact: 'Nous contacter',
    billedIn: (currency: string) => `Facturé en ${currency}, TVA incluse.`,
    indicative: ' Les prix dans les autres devises sont indicatifs.',
    numberLocale: 'fr-CH',
  },
};
