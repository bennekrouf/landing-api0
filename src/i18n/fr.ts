// src/i18n/fr.ts — the landing page's French copy, in the shape of en.ts.

import type { Copy } from './index';

export const fr: Copy = {
  meta: {
    title: 'API0 - L’intelligence à la demande pour toute application',
    description:
      'Ajoutez une interface intelligente à n’importe quelle application. Importez votre API et votre équipe l’utilise depuis Teams, WhatsApp, Telegram ou Claude, en langage naturel. Sans réécriture, entièrement dans le cloud.',
    useCasesTitle: "Cas d'usage",
    useCasesDescription: "Comment les équipes utilisent api0 : interventions depuis WhatsApp, éditeurs dans Teams, outils internes dans Claude Enterprise.",
    pricingTitle: 'Tarifs',
    fitTitle: 'Test d’adéquation',
    fitDescription: 'Dix questions, deux minutes : voyez si api0 convient à votre application, ce qui joue en votre faveur et ce qu’il faut régler avant un pilote.',
    guidesTitle: 'Guides',
    guidesDescription:
      'Les guides pas à pas d’api0 : votre API dans Claude, Teams et WhatsApp, l’architecture et les modèles d’authentification, Azure DevOps avec la connexion Microsoft. À lire en ligne ou à télécharger en PDF.',
    pricingDescription:
      'Les offres api0 par tenant : sièges et crédits inclus, votre API dans Telegram, WhatsApp et Teams. Facturé en CHF, conçu en Suisse.',
  },
  nav: {
    useCases: "Cas d'usage",
    howItWorks: 'Comment ça marche',
    pricing: 'Tarifs',
    blog: 'Blog',
    guides: 'Guides',
    fitCheck: 'Test d’adéquation',
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
    titleHighlight: 'n’importe quelle application',
    tagline: 'Votre logiciel, dans la messagerie que votre équipe utilise déjà.',
    lead:
      'Votre application fait déjà le travail. api0 permet de lui parler : importez votre API, et votre équipe l’utilise depuis Teams, WhatsApp, Telegram ou Claude, en langage naturel. Chaque action s’exécute au nom de la personne qui la demande.',
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
        body: 'Votre tenant a sa propre page de démarrage. Chacun se connecte une fois, puis l’ajoute à Claude ou à Teams, ou relie son WhatsApp ou son Telegram à votre propre bot.',
        code: `app.api0.ai/link/acme

  ✓ Connecteur Claude
  ✓ Acme dans Teams
  ✓ WhatsApp
  ✓ @acme_bot sur Telegram`,
      },
      {
        title: 'Gardez le contrôle',
        body: 'Chaque appel passe par la passerelle : elle vérifie qui appelle, joint l’identifiant attendu par votre application, décompte les crédits et journalise l’appel.',
        code: `tools/call create_invoice
  ✓ appelant : jane@acme.com
  ✓ identifiant joint
  ✓ crédits vérifiés
  → POST /api/invoices`,
      },
    ],
    quickstart: 'Suivre le guide de démarrage en cinq minutes',

    authTitle: 'Ce que reçoit votre application',
    authLead:
      'Vous choisissez comment api0 s’authentifie auprès de votre application. L’identifiant est conservé dans api0 et joint à chaque appel, avec l’identité de la personne concernée.',
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
        body: 'Qui appelle, ce qu’il a le droit de faire et quel identifiant reçoit votre application : tout se décide dans une seule passerelle, quel que soit le client utilisé.',
      },
      {
        title: 'Écrit en Rust',
        body: 'La passerelle et chaque service d’api0 sont écrits en Rust, pour une latence prévisible et une surface d’attaque réduite.',
      },
      {
        title: 'Une offre par tenant',
        body: 'Sièges et crédits inclus, membres supplémentaires au siège, dépassement sur la facture suivante. Pas besoin d’un commercial pour commencer.',
      },
    ],

    compareTitle: 'api0 face aux alternatives',
    compareLead:
      'Là où api0 se distingue.',
    feature: 'Fonctionnalité',
    yes: 'Oui',
    no: 'Non',
    comparison: [
      {
        feature: 'Votre API REST en outils MCP',
        them: ['En préversion', 'Vos serveurs MCP seulement', 'Config YAML', 'Code ou votre serveur'],
      },
      {
        feature: 'Chat dans Teams, connecté',
        them: [true, false, false, 'Actions de l’agent seulement'],
      },
      {
        feature: 'Chat dans WhatsApp',
        them: ['Fermé depuis oct. 2026', false, false, 'Actions de l’agent seulement'],
      },
      {
        feature: 'Chat dans votre bot Telegram',
        them: ['Via Azure, avec du code', false, false, 'Actions de l’agent seulement'],
      },
      {
        feature: 'Un lien d’accès par tenant',
        them: ['Un par canal', 'URL de portail', false, 'Un par application'],
      },
      {
        feature: 'Cinq modes d’identifiants, dont OAuth par utilisateur',
        them: ['Trois modes', 'Selon chaque serveur', 'Politiques à écrire', 'Catalogue seulement'],
      },
      {
        feature: 'Rien à héberger',
        them: [true, true, 'Auto-hébergé', true],
      },
    ],
    compareNote: 'Documentation publique, novembre 2026.',

    proxyTitle: 'De l’appel d’outil au véritable appel d’API',
    proxyNote:
      'La passerelle injecte les paramètres dans l’URL et le corps avec le bon verbe HTTP, puis renvoie le résultat au modèle.',
    architecture: 'Voir toute l’architecture sur une page',

    finalTitle: 'Rendez votre application intelligente cette semaine',
    finalLead: 'Connectez-vous avec Google, importez votre API et envoyez un lien à votre équipe. Une offre par tenant, sans rendez-vous commercial.',
    finalCta: 'Commencer',
  },
  pricing: {
    title: 'Tarifs par tenant',
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
  useCases: {
    kicker: "Cas d'usage",
    title: 'Une API importée une fois. Utilisée là où les gens travaillent déjà.',
    lead: "Trois façons d'utiliser api0, et un produit qui tourne dessus aujourd'hui. Chaque action est faite au nom de la personne, avec ses droits.",
    exampleLabel: 'Exemple de conversation',
    setupLabel: "Ce qu'on met en place",
    channelsLabel: 'Canaux :',
    cases: [
      {
        id: 'field-service',
        tag: 'Field service',
        title: 'Les techniciens gèrent leurs interventions depuis WhatsApp',
        problem: "Sur le terrain, l'app d'intervention est lente sur mobile. Les rapports sont saisis le soir, de mémoire, et le dispatch passe la journée au téléphone.",
        chat: [
          { who: 'Technicien', text: "C'est quoi ma journée ?" },
          { who: 'Assistant', text: "3 visites. 1) 08:30 Lausanne, chaudière X200, code d'accès enregistré…" },
          { who: 'Technicien', text: 'Fini chez Lausanne, remplacé le filtre, 2 pièces FX-200. Clôture.' },
          { who: 'Assistant', text: "Je clôture l'intervention 1182 avec ce rapport et 2 × FX-200 ? (oui/non)" },
        ],
        setup: ["Votre API d'intervention : planning, ordres de travail, stock", 'Chaque technicien relie son compte une fois', 'Un numéro WhatsApp Business branché sur api0'],
        channels: 'WhatsApp, Telegram, Teams',
      },
      {
        id: 'software-vendor',
        tag: 'Éditeurs de logiciels',
        title: 'Votre produit dans le Teams de vos clients',
        problem: "Les clients demandent « de l'IA dans votre produit ». Construire un assistant et un bot Teams prend une équipe et des mois, en respectant les droits de chaque utilisateur.",
        chat: [
          { who: 'Utilisateur client', text: 'Quels sont mes tickets urgents ouverts ?' },
          { who: 'Assistant', text: '4 tickets urgents. #2291 Export en échec, ouvert depuis 2 jours…' },
          { who: 'Utilisateur client', text: 'Assigne #2291 à Paul et ajoute une note : on relance le fournisseur.' },
          { who: 'Assistant', text: 'Fait. Assigné à Paul, note interne ajoutée.' },
        ],
        setup: ['Votre API publique, importée depuis sa spec OpenAPI', 'Un tenant api0 par client : outils, utilisateurs, crédits, journal', 'Un package d’app Teams généré par api0'],
        channels: 'Teams, Claude, WhatsApp, Telegram',
      },
      {
        id: 'internal-tools',
        tag: 'Outils internes',
        title: 'Vos systèmes internes dans Claude Enterprise, en sécurité',
        problem: "Claude ne connaît ni votre ERP, ni votre CRM, ni vos outils RH : les équipes copient-collent. La sécurité exige des droits par personne, aucun secret dans l'IA et un journal.",
        chat: [
          { who: 'Employé', text: 'Il me reste combien de congés ? Pose-moi du 22 au 26.' },
          { who: 'Assistant', text: 'Il vous reste 12 jours. Demande de 5 jours, du 22 au 26.12, à envoyer à Claire ? (oui/non)' },
          { who: 'Manager', text: 'Qui est absent la semaine prochaine dans mon équipe ?' },
          { who: 'Assistant', text: 'Deux personnes : Paul (lun–mer), Inès (ven).' },
        ],
        setup: ['Vos APIs internes comme outils, la lecture d’abord', 'Connexion via Entra ID ou votre fournisseur OIDC', 'Des identifiants par personne : chaque système applique ses droits'],
        channels: 'Claude, Teams',
      },
    ],
    liveKicker: "En production sur api0",
    liveTitle: 'Un SaaS de création de CV',
    liveBody: "Un SaaS de création de CV a importé son API dans api0 : 17 endpoints. Ses utilisateurs consultent leurs profils, génèrent des CV en PDF, les traduisent, les adaptent à une offre et écrivent des lettres de motivation, depuis Claude et depuis des messageries. Chaque appel arrive à l'application avec un jeton d'identité Google : l'application ne stocke aucun secret api0.",
    liveFacts: ['17 endpoints, importés une fois', 'Claude et des messageries', 'Aucun secret stocké côté application'],
    yoursTitle: 'Votre API, la prochaine',
    yoursBody: 'Un POC de 14 jours sur votre API : à la fin, vos équipes ou vos clients l’utilisent pour de vrai, ou on arrête.',
    yoursCta: 'Commencer avec votre API',
    contactCta: 'Nous écrire',
    fitCta: 'Tester l’adéquation en 2 minutes',
  },
  guides: {
    kicker: 'Guides',
    title: 'Mettre en place api0, pas à pas',
    lead: 'Des guides pratiques pour votre équipe et votre IT : à lire ici, ou à télécharger en PDF pour les partager ou les garder.',
    guide: 'Guide',
    read: 'Lire le guide',
    download: 'Télécharger le PDF',
    updated: 'Mis à jour le',
    contents: 'Sommaire',
    all: 'Tous les guides',
    otherLang: 'Read in English',
    dateLocale: 'fr-CH',
  },
  fit: {
    kicker: 'Test d’adéquation',
    title: 'api0 convient-il à votre application ?',
    lead: 'Dix questions rapides, environ deux minutes. Vous obtenez un score, ce qui joue déjà en votre faveur et ce qu’il faut régler d’abord. Rien n’est envoyé sans votre accord.',
    start: 'Commencer',
    next: 'Suivant',
    back: 'Retour',
    seeResult: 'Voir mon résultat',
    restart: 'Recommencer',
    step: (n: number, total: number) => `Question ${n} sur ${total}`,
    pickOne: 'Un seul choix',
    pickMany: 'Plusieurs choix possibles',
    questions: {
      api: {
        title: 'Votre application a-t-elle une API ?',
        hint: 'api0 transforme l’API que votre application a déjà en actions que l’on fait depuis une messagerie.',
        options: { rest: 'Oui, une API REST / JSON', other: 'Oui, d’un autre type (SOAP, GraphQL, RPC…)', unsure: 'Je crois, je dois vérifier', none: 'Pas d’API' },
      },
      reach: {
        title: 'Est-elle accessible depuis internet ?',
        hint: 'api0 tourne dans le cloud et appelle votre API en HTTPS.',
        options: { public: 'Oui, elle est publique en HTTPS', private: 'Elle est privée (VPN, réseau interne), mais on pourrait l’ouvrir à api0', unsure: 'Je ne sais pas' },
      },
      description: {
        title: 'Comment l’API est-elle décrite ?',
        hint: 'Une spec OpenAPI s’importe en quelques minutes. Sans spec, vous décrivez vos endpoints et api0 en fait des outils.',
        options: { openapi: 'Une spec OpenAPI / Swagger (YAML ou JSON)', docs: 'Une documentation, sans spec', none: 'Pas vraiment décrite' },
      },
      audience: {
        title: 'Qui l’utiliserait depuis une messagerie ?',
        options: { customers: 'Nos clients (nous vendons le logiciel)', field: 'Nos équipes terrain ou mobiles', office: 'Nos équipes au bureau', me: 'Surtout moi' },
      },
      channels: {
        title: 'Où ces personnes échangent-elles déjà ?',
        options: { teams: 'Microsoft Teams', whatsapp: 'WhatsApp', telegram: 'Telegram', claude: 'Claude (ou un autre assistant IA)', unsure: 'Pas encore décidé' },
      },
      identity: {
        title: 'Comment se connecte-t-on à votre application aujourd’hui ?',
        hint: 'api0 peut agir au nom de chaque personne, avec ses propres droits dans votre application.',
        options: {
          own: 'Chacun a son compte (login, OAuth ou jeton personnel)',
          sso: 'Via Microsoft Entra ID ou une autre authentification unique',
          shared: 'Une clé partagée ou un compte de service',
          none: 'Pas de connexion',
        },
      },
      workflow: {
        title: 'Savez-vous quelle est la première chose à faire depuis la messagerie ?',
        hint: 'Par exemple : clôturer une intervention, vérifier un stock, créer un ticket, valider une demande.',
        options: { clear: 'Oui, un usage précis', ideas: 'Quelques idées', exploring: 'On explore' },
      },
      people: {
        title: 'Combien de personnes l’utiliseraient ?',
        options: { xs: '1 à 5', s: '6 à 50', m: '51 à 500', l: 'Plus de 500' },
      },
      timeline: {
        title: 'Quand aimeriez-vous un premier pilote ?',
        options: { month: 'Ce mois-ci', quarter: 'Ce trimestre', later: 'Plus tard cette année', none: 'Pas encore prévu' },
      },
      needs: {
        title: 'Avez-vous besoin de l’un de ces points dès le départ ?',
        hint: 'Nous préférons vous dire tout de suite ce qu’api0 ne fait pas encore.',
        options: {
          swissHosting: 'Des données hébergées en Suisse',
          teamsChannels: 'Les conversations de groupe ou canaux Teams',
          voice: 'Les messages vocaux',
          logo: 'L’app sous notre propre logo',
          manyCustomers: 'Beaucoup de nos clients à la fois, depuis une seule app Teams',
          none: 'Aucun de ces points',
        },
      },
    },
    scoreLabel: 'Votre score',
    tiers: {
      strong: { title: 'Très bonne adéquation', body: 'Vous avez ce qu’il faut pour un pilote. Prochaine étape : un POC de 14 jours sur votre propre API.' },
      good: { title: 'Bonne adéquation, quelques points à régler', body: 'Un pilote est réaliste. Réglez d’abord les points ci-dessous, ou parlons-en.' },
      early: { title: 'Un peu tôt, mais à suivre', body: 'C’est peut-être un peu tôt pour un pilote. Les guides montrent quoi préparer, et nous sommes là pour en parler.' },
      notYet: { title: 'Pas encore adapté', body: 'api0 s’appuie sur une API que votre application a déjà. Dès qu’elle en a une, revenez : la mise en place prend quelques minutes.' },
    },
    strengthsTitle: 'En votre faveur',
    gapsTitle: 'À regarder',
    strengths: {
      restApi: 'Une API REST : api0 l’importe directement.',
      reachable: 'Accessible depuis internet : rien à ouvrir.',
      openapi: 'Une spec OpenAPI : chaque opération devient un outil en quelques minutes.',
      vendor: 'Vos clients dans leur propre Teams ou WhatsApp, comme votre app : notre cas d’usage principal.',
      field: 'Des équipes terrain sur WhatsApp : clôturer une intervention depuis la messagerie, c’est là qu’api0 excelle.',
      perUser: 'Des comptes personnels : chaque action peut se faire au nom de la personne, avec ses droits.',
      sso: 'Authentification unique : on se connecte à api0 avec le compte habituel.',
      workflow: 'Un premier usage précis : le chemin le plus court vers un pilote qui tient.',
      soon: 'Un pilote proche : nous pouvons démarrer la semaine prochaine.',
      multiChannel: 'Plusieurs messageries : une seule configuration les sert toutes.',
    },
    gaps: {
      noApi: 'Pas encore d’API : api0 a besoin d’en appeler une.',
      nonRest: 'api0 appelle des API HTTP. Une API SOAP ou RPC peut demander une petite couche REST devant.',
      apiUnknown: 'Vérifiez avec votre équipe si l’application expose une API.',
      privateApi: 'Une API privée a besoin d’un point d’entrée qui n’accepte que les appels signés par api0.',
      noWorkflow: 'Choisissez une action concrète faite chaque jour : le pilote devient mesurable.',
      swissHosting: 'L’hébergement en Suisse n’est pas encore disponible. Demandez-nous la région actuelle.',
      teamsChannels: 'Dans Teams, api0 fonctionne en conversation individuelle, pas encore en groupe ni dans les canaux.',
      voice: 'Les messages vocaux ne sont pas encore transcrits : texte uniquement pour l’instant.',
      logo: 'L’app Teams porte votre nom, pas encore votre logo.',
      manyCustomers: 'Servir beaucoup de clients depuis une seule app Teams arrive bientôt. Un pilote avec un client fonctionne dès aujourd’hui.',
    },
    ctaPoc: 'Démarrer le POC de 14 jours',
    ctaTalk: 'Envoyer mes réponses à api0',
    ctaGuides: 'Lire les guides',
    talkNote: 'Ouvre votre messagerie avec vos réponses déjà remplies. Rien n’est envoyé tant que vous n’appuyez pas sur envoyer.',
    mailSubject: (score: number) => `Test d’adéquation api0 : ${score}/100`,
    mailIntro: 'Bonjour, voici mes réponses au test d’adéquation :',
  },
};
