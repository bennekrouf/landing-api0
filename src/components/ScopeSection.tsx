"use client";

import React, { useState } from 'react';

export default function ScopeSection() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {lang === 'en' ? 'API0 — Scope, Responsibility, and Pre-loading Design' : 'API0 — Périmètre, Responsabilité et Conception'}
            </h2>
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setLang('en')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  lang === 'en' ? 'bg-background text-foreground shadow' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  lang === 'fr' ? 'bg-background text-foreground shadow' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                FR
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-[#FF6B00]">
              {lang === 'en' ? 'What api0 actually is (and is not)' : 'Ce qu\'est réellement api0 (et ce qu\'il n\'est pas)'}
            </h3>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                <strong className="text-foreground">
                  {lang === 'en' ? 'api0 is a semantic routing layer. Its sole responsibility is:' : 'api0 est une couche de routage sémantique. Sa seule responsabilité est :'}
                </strong>
              </p>
              
              <div className="bg-muted p-6 rounded-lg border-l-4 border-[#FF6B00]">
                <p className="text-foreground font-medium">
                  {lang === 'en' 
                    ? 'Given a natural language sentence + a user identity, return which endpoint to call and what parameter values to use — without executing that call itself.'
                    : 'Étant donné une phrase en langage naturel + une identité utilisateur, renvoyer quel endpoint appeler et quelles valeurs de paramètres utiliser — sans exécuter cet appel lui-même.'}
                </p>
              </div>

              <p>
                {lang === 'en'
                  ? 'The response contains: '
                  : 'La réponse contient : '}
                <code className="bg-muted text-foreground px-2 py-1 rounded text-sm">endpoint_id</code>,{' '}
                <code className="bg-muted text-foreground px-2 py-1 rounded text-sm">verb</code>,{' '}
                <code className="bg-muted text-foreground px-2 py-1 rounded text-sm">base</code>,{' '}
                <code className="bg-muted text-foreground px-2 py-1 rounded text-sm">path</code>,{' '}
                <code className="bg-muted text-foreground px-2 py-1 rounded text-sm">parameters[]</code>,{' '}
                <code className="bg-muted text-foreground px-2 py-1 rounded text-sm">matching_info</code>.
                {lang === 'en'
                  ? ' The caller decides what to do with that.'
                  : ' L\'appelant décide quoi faire de tout cela.'}
              </p>

              <p>
                {lang === 'en'
                  ? 'api0 is fully generic — it has zero hardcoded business logic. It doesn\'t know if it\'s routing for a CRM, a hospital, or an e-commerce system. All domain knowledge lives in the endpoint definitions the user preloads.'
                  : 'api0 est entièrement générique — il n\'a aucune logique métier codée en dur. Il ne sait pas s\'il route pour un CRM, un hôpital ou un système e-commerce. Toute la connaissance du domaine réside dans les définitions d\'endpoints que l\'utilisateur précharge.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
