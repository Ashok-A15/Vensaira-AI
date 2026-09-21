import '../../styles/elearning.css';

export default function AboutElearning() {
  return (
    <div className="elearning-page">
      {/* Hero Section */}
      <section className="el-hero-split">
        <div className="el-animate-fade-up">
          <span className="el-label">About VENSAIRA AI eLearning</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-heading)', color: 'var(--el-navy)', lineHeight: 1.1, margin: '16px 0 24px' }}>
            Learn the Technologies Shaping Tomorrow.
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.6, maxWidth: '500px' }}>
            VENSAIRA AI eLearning is designed to help learners build practical skills in Artificial Intelligence, Generative AI, Cloud Computing, and modern technologies.
          </p>
        </div>
        <div className="el-visual-container el-animate-slide-right">
          <div className="el-abstract-visual">
            <div className="el-glow-circle el-glow-1"></div>
            <div className="el-glow-circle el-glow-2"></div>
            <div className="el-nodes-container">
              {/* Abstract Nodes */}
              <div className="el-node" style={{ top: '10%', left: '20%' }}></div>
              <div className="el-node" style={{ top: '50%', left: '80%', animationDelay: '-1s' }}></div>
              <div className="el-node" style={{ top: '80%', left: '30%', animationDelay: '-2s' }}></div>
              {/* Connecting Lines */}
              <div className="el-node-line" style={{ top: '15%', left: '25%', width: '120px', height: '2px', transform: 'rotate(25deg)' }}></div>
              <div className="el-node-line" style={{ top: '55%', left: '80%', width: '150px', height: '2px', transform: 'rotate(150deg)' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section: Why Learn */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'var(--el-navy)', textAlign: 'center', marginBottom: '64px' }}>
            Why Learn With VENSAIRA?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            {[
              { id: '01', title: 'Practical Learning', text: 'Focus on concepts that can be applied to real-world technology and projects.', color: 'var(--el-primary)' },
              { id: '02', title: 'Future-Ready Skills', text: 'Build knowledge around AI, Generative AI, cloud computing, and emerging technologies.', color: 'var(--el-violet)' },
              { id: '03', title: 'Hands-On Approach', text: 'Learn by understanding how modern technologies are built and applied.', color: 'var(--el-accent)' },
              { id: '04', title: 'Continuous Growth', text: 'Develop skills that support your long-term technology journey.', color: 'var(--el-indigo)' },
            ].map(card => (
              <div key={card.id} style={{ 
                background: 'var(--el-bg-light)', 
                padding: '40px 32px', 
                borderRadius: 'var(--radius-lg)', 
                borderTop: `4px solid ${card.color}`,
                transition: 'transform 0.3s ease',
                cursor: 'default'
              }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: card.color, display: 'block', marginBottom: '16px' }}>{card.id}</span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--el-navy)', marginBottom: '16px' }}>{card.title}</h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Third Section: Learning Path Strip */}
      <section style={{ padding: '100px 24px', background: 'var(--el-bg-navy)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '64px' }}>
            From Fundamentals to Practical Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '24px', fontSize: '1.25rem', fontWeight: 600 }}>
            <span style={{ padding: '16px 32px', background: 'rgba(255,255,255,0.1)', borderRadius: '50px' }}>Learn</span>
            <span style={{ color: 'var(--el-accent)' }}>&rarr;</span>
            <span style={{ padding: '16px 32px', background: 'rgba(255,255,255,0.1)', borderRadius: '50px' }}>Build</span>
            <span style={{ color: 'var(--el-accent)' }}>&rarr;</span>
            <span style={{ padding: '16px 32px', background: 'rgba(255,255,255,0.1)', borderRadius: '50px' }}>Practice</span>
            <span style={{ color: 'var(--el-accent)' }}>&rarr;</span>
            <span style={{ padding: '16px 32px', background: 'rgba(255,255,255,0.1)', borderRadius: '50px', border: '2px solid var(--el-accent)' }}>Apply</span>
          </div>
        </div>
      </section>
    </div>
  );
}
