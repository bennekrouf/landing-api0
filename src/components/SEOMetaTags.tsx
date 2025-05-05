// src/components/SEOMetaTags.tsx
import React from 'react';
import Head from 'next/head';

interface SEOMetaTagsProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  structuredData?: object;
}

const SEOMetaTags: React.FC<SEOMetaTagsProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://api0.ai/og-image.jpg', // Default OG image
  type = 'website',
  article,
  structuredData
}) => {
  // Generate full URL for canonical and OG
  const fullCanonicalUrl = canonicalUrl ? `https://api0.ai${canonicalUrl}` : 'https://api0.ai';
  
  // Generate structured data for different page types
  const generateStructuredData = () => {
    // If custom structured data is provided, use that
    if (structuredData) {
      return JSON.stringify(structuredData);
    }

    // Default website structured data
    if (type === 'website') {
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'API0',
        'url': 'https://api0.ai',
        'description': description,
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://api0.ai/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      });
    }

    // Blog article structured data
    if (type === 'article' && article) {
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': title,
        'description': description,
        'image': ogImage,
        'datePublished': article.publishedTime,
        'dateModified': article.modifiedTime || article.publishedTime,
        'author': article.authors?.map(name => ({
          '@type': 'Person',
          'name': name
        })) || [{ '@type': 'Person', 'name': 'API0 Team' }],
        'publisher': {
          '@type': 'Organization',
          'name': 'API0',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://api0.ai/logo.png'
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': fullCanonicalUrl
        },
        'keywords': article.tags?.join(', ')
      });
    }

    return null;
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Article specific meta tags */}
      {type === 'article' && article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data */}
      {generateStructuredData() && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateStructuredData() || '' }}
        />
      )}
    </Head>
  );
};

export default SEOMetaTags;
