// src/lib/og-image-factory.tsx
import { ImageResponse } from 'next/og';
import { Post } from '@/lib/blog-types'; // Make sure to import your Post type

// Define styles object
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '1200px',
    height: '630px',
    backgroundColor: '#0f172a',
    backgroundImage: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
    color: 'white',
    fontFamily: 'sans-serif',
    padding: '80px',
    position: 'relative',
  },
  // ... other styles from previous example
};

// Create a factory function to generate OG images
export async function generateOgImage(post: Post) {
  const { title, excerpt, author, tags } = post;

  // Create JSX for the OG image
  const ogImageJsx = (
    <div style={styles.container}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <span style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'white'
        }}>
          api<span style={{
            color: '#FF6B00',
            fontWeight: 900,
            transform: 'rotate(-12deg)',
            display: 'inline-block'
          }}>0</span>
        </span>
      </div>
      
      {/* Title */}
      <h1 style={{
        fontSize: '64px',
        fontWeight: 'bold',
        maxWidth: '900px',
        marginBottom: '20px',
        lineHeight: 1.2
      }}>
        {title}
      </h1>
      
      {/* Excerpt */}
      <p style={{
        fontSize: '24px',
        maxWidth: '800px',
        color: '#e2e8f0',
        marginBottom: '30px',
        lineHeight: 1.4
      }}>
        {excerpt}
      </p>
      
      {/* Author and tags */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 'auto'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <span style={{
            fontSize: '18px',
            color: '#94a3b8'
          }}>By {author?.name || 'API0 Team'}</span>
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '10px'
          }}>
            {tags?.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: 'rgba(255, 107, 0, 0.2)',
                  color: '#FF6B00',
                  padding: '6px 12px',
                  borderRadius: '100px',
                  fontSize: '16px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Website URL */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          fontSize: '24px',
          color: '#94a3b8',
        }}
      >
        api0.ai
      </div>
    </div>
  );

  return new ImageResponse(ogImageJsx, {
    width: 1200,
    height: 630,
  });
}
