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
              {lang === 'en' ? 'API0 — Security, Governance, and Execution' : 'API0 — Sécurité, Gouvernance et Exécution'}
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
              {lang === 'en' ? 'What api0 actually is (and does)' : 'Ce qu\'est réellement api0 (et ce qu\'il fait)'}
            </h3>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                <strong className="text-foreground">
                  {lang === 'en' ? 'api0 is a full Model Context Protocol (MCP) gateway. Its core responsibility is:' : 'api0 est une passerelle complète du Model Context Protocol (MCP). Sa responsabilité principale est :'}
                </strong>
              </p>
              
              <div className="bg-muted p-6 rounded-lg border-l-4 border-[#FF6B00]">
                <p className="text-foreground font-medium">
                  {lang === 'en' 
                    ? 'Acting as a secure bridge between MCP clients and your internal REST APIs. It handles handshakes, parameter substitution, secure remote execution, and billing governance on your behalf.'
                    : 'Agir comme un pont sécurisé entre les clients MCP et vos API REST internes. Il gère les courtoisies (handshakes), la substitution de paramètres, l\'exécution distante sécurisée et la gouvernance de facturation en votre nom.'}
                </p>
              </div>

              <p>
                {lang === 'en'
                  ? 'When a tool is triggered, the gateway processes the execution natively. It validates credit balances via its billing integration, automatically substituting parameters into URLs and bodies using the correct HTTP verbs (GET, POST, PUT, DELETE), before returning the result seamlessly to the LLM.'
                  : 'Lorsqu\'un outil est déclenché, la passerelle traite l\'exécution nativement. Elle valide les soldes de crédits via son intégration de facturation, substituant automatiquement les paramètres dans les URL et les corps en utilisant les bons verbes HTTP (GET, POST, PUT, DELETE), avant de renvoyer le résultat de manière transparente au LLM.'}
              </p>

              <p>
                {lang === 'en'
                  ? 'Deploying precisely with the 2024-11-05 Specification (Streamable HTTP, SSE or POST), API0 transforms any standard JSON REST definition into a fully functional MCP Tool. It brings enterprise governance and visibility to every API action Claude makes.'
                  : 'Se déployant précisément avec la spécification 2024-11-05 (Streamable HTTP, SSE ou POST), API0 transforme n\'importe quelle définition JSON REST standard en un outil MCP entièrement fonctionnel. Il apporte gouvernance et visibilité d\'entreprise à chaque action API effectuée par Claude.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
