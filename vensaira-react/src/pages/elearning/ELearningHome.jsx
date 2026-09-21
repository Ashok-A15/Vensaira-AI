import { Link } from 'react-router-dom';
import { courses } from '../../data/courses';
import CourseCard from '../../components/elearning/CourseCard';
import '../../styles/elearning.css';

export default function ELearningHome() {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="elearning-page">
      {/* SECTION 1 — DARK HERO */}
      <section style={{ background: 'var(--el-bg-navy)', color: 'white', padding: '120px 24px', display: 'flex', alignItems: 'center', minHeight: '90vh', position: 'relative', overflow: 'hidden' }}>
        
        <div className="container el-hero-split" style={{ position: 'relative', zIndex: 1, padding: 0 }}>
          <div className="el-animate-fade-up">
            <span style={{ display: 'inline-block', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--el-accent)', marginBottom: '24px', textTransform: 'uppercase' }}>
              SKILLS TODAY. BIGGER TOMORROW.
            </span>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontFamily: 'var(--font-heading)', marginBottom: '24px', lineHeight: 1.1 }}>
              <span style={{ color: 'white' }}>Learn. Build.</span><br />
              <span style={{ color: 'var(--el-accent)' }}>Innovate.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '40px', lineHeight: 1.6, maxWidth: '540px' }}>
              Build practical skills in Artificial Intelligence, Generative AI, Cloud Computing, and modern technologies — and turn your ideas into real-world impact.
            </p>
            <div style={{ marginBottom: '48px' }}>
              <Link to="/elearning/courses" className="btn" style={{ padding: '14px 32px', fontSize: '1.05rem', background: 'linear-gradient(90deg, #0284c7, #06b6d4)', border: 'none', color: 'white', borderRadius: '8px', fontWeight: 600, display: 'inline-block', boxShadow: '0 4px 20px rgba(6, 182, 212, 0.3)', transition: 'all 0.2s' }}>
                Explore Courses &rarr;
              </Link>
            </div>
            
            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ color: 'var(--el-primary)' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>Multiple</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Courses</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ color: 'var(--el-primary)' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>Growing</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Learning Community</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ color: 'var(--el-primary)' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 12 3a4.65 4.65 0 0 0-4.5 4.5c0 .92.31 1.77.84 2.45.72.8 1.15 1.52 1.34 2.55"></path></svg></div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>Hands-on</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Projects</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ color: 'var(--el-primary)' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="18" y="3" width="4" height="18"></rect><rect x="10" y="8" width="4" height="13"></rect><rect x="2" y="13" width="4" height="8"></rect></svg></div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>Industry-Relevant</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Curriculum</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="el-visual-container el-animate-slide-right" style={{ animationDelay: '0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '540px', aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
              
              {/* Background Image Overlay */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/laptop.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5 }}></div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--el-bg-navy) 0%, transparent 50%, rgba(15,23,42,0.6) 100%)' }}></div>
              
              {/* Floating Card 1 (Chart) */}
              <div style={{ position: 'absolute', top: '15%', left: '10%', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '16px', alignItems: 'flex-end', animation: 'elFloat 6s ease-in-out infinite' }}>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>AI Skills</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Real Impact</div>
                </div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '30px' }}>
                  <div style={{ width: '8px', height: '40%', background: '#0284c7', borderRadius: '2px' }}></div>
                  <div style={{ width: '8px', height: '70%', background: '#0284c7', borderRadius: '2px' }}></div>
                  <div style={{ width: '8px', height: '50%', background: '#0284c7', borderRadius: '2px' }}></div>
                  <div style={{ width: '8px', height: '100%', background: '#06b6d4', borderRadius: '2px' }}></div>
                </div>
              </div>
              
              {/* Floating Cards (Right Side List) */}
              <div style={{ position: 'absolute', top: '15%', right: '8%', display: 'flex', flexDirection: 'column', gap: '12px', animation: 'elFloat 7s ease-in-out infinite reverse' }}>
                
                {/* Learn Card */}
                <div style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderRadius: '12px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '16px', width: '220px' }}>
                  <div style={{ width: '36px', height: '36px', background: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>Learn</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Structured courses</div>
                  </div>
                </div>
                
                {/* Build Card */}
                <div style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderRadius: '12px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '16px', width: '220px' }}>
                  <div style={{ width: '36px', height: '36px', background: 'rgba(6, 182, 212, 0.2)', color: '#22d3ee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>Build</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Hands-on projects</div>
                  </div>
                </div>
                
                {/* Innovate Card */}
                <div style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderRadius: '12px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '16px', width: '220px' }}>
                  <div style={{ width: '36px', height: '36px', background: 'rgba(124, 58, 237, 0.2)', color: '#a78bfa', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>Innovate</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Solve real problems</div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHY LEARN WITH VENSAIRA */}
      <section style={{ padding: '120px 24px', background: 'var(--el-bg-light)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="el-label">WHY LEARN WITH VENSAIRA</span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'var(--el-navy)', margin: '0 auto 24px' }}>
              More Than Courses — A Launchpad for Your Future
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
              We provide a practical, hands-on learning experience designed to help you build real skills and apply them in the AI-driven world.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            <div style={{ background: 'white', padding: '40px 32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--el-border)', transition: 'transform 0.3s ease', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(8, 120, 201, 0.1)', color: 'var(--el-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>1</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--el-navy)' }}>Industry-Relevant Content</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>Learn skills that are useful across modern technology and real-world applications.</p>
            </div>
            
            <div style={{ background: 'white', padding: '40px 32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--el-border)', transition: 'transform 0.3s ease', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--el-violet)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>2</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--el-navy)' }}>Hands-On Learning</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>Build practical knowledge through projects and examples.</p>
            </div>
            
            <div style={{ background: 'white', padding: '40px 32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--el-border)', transition: 'transform 0.3s ease', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(6, 182, 212, 0.1)', color: 'var(--el-accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>3</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--el-navy)' }}>Learn at Your Own Pace</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>Follow structured learning at a pace that works for you.</p>
            </div>
            
            <div style={{ background: 'white', padding: '40px 32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--el-border)', transition: 'transform 0.3s ease', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--el-indigo)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>4</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--el-navy)' }}>Expert Guidance</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>Learn concepts and practices aligned with real-world technology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FEATURED COURSES (DARK) */}
      <section style={{ padding: '120px 24px', background: 'var(--el-bg-navy)', color: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ display: 'inline-block', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', marginBottom: '24px', textTransform: 'uppercase' }}>
              FEATURED COURSES
            </span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', margin: '0 auto 24px' }}>
              Start with Our Most Popular Courses
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
              Explore our core courses and take the first step toward building your future.
            </p>
          </div>
          
          <div className="course-grid">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <Link to="/elearning/courses" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem', background: 'white', border: 'none', color: 'var(--el-navy)', borderRadius: '8px', fontWeight: 600 }}>
              View All Courses &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4 — LEARNING JOURNEY */}
      <section style={{ padding: '120px 24px', background: 'var(--el-bg-light)' }}>
        <div className="container" style={{ maxWidth: '1200px', textAlign: 'center' }}>
          <span className="el-label">YOUR LEARNING JOURNEY</span>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'var(--el-navy)', marginBottom: '24px' }}>
            A Clear Path to Real Skills
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto 64px', lineHeight: 1.6 }}>
            Follow a simple, structured path to go from learning to doing.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '24px', position: 'relative' }}>
            <div style={{ background: 'white', border: '1px solid var(--el-border)', borderRadius: '16px', padding: '32px 24px', flex: '1 1 200px', maxWidth: '250px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--el-primary)', display: 'block', marginBottom: '12px' }}>01</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--el-navy)' }}>Learn Fundamentals</span>
            </div>
            
            <div style={{ color: 'var(--el-border)', fontSize: '1.5rem', fontWeight: 700 }}>&rarr;</div>
            
            <div style={{ background: 'white', border: '1px solid var(--el-border)', borderRadius: '16px', padding: '32px 24px', flex: '1 1 200px', maxWidth: '250px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--el-violet)', display: 'block', marginBottom: '12px' }}>02</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--el-navy)' }}>Build Skills</span>
            </div>
            
            <div style={{ color: 'var(--el-border)', fontSize: '1.5rem', fontWeight: 700 }}>&rarr;</div>
            
            <div style={{ background: 'white', border: '1px solid var(--el-border)', borderRadius: '16px', padding: '32px 24px', flex: '1 1 200px', maxWidth: '250px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--el-accent)', display: 'block', marginBottom: '12px' }}>03</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--el-navy)' }}>Create Projects</span>
            </div>
            
            <div style={{ color: 'var(--el-border)', fontSize: '1.5rem', fontWeight: 700 }}>&rarr;</div>
            
            <div style={{ background: 'white', border: '1px solid var(--el-border)', borderRadius: '16px', padding: '32px 24px', flex: '1 1 200px', maxWidth: '250px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--el-indigo)', display: 'block', marginBottom: '12px' }}>04</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--el-navy)' }}>Advance Your Career</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* SECTION 5 — LEARNER TESTIMONIALS */}
      <section style={{ padding: '120px 24px', background: 'var(--el-bg-navy)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ display: 'inline-block', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', marginBottom: '24px', textTransform: 'uppercase' }}>
            WHAT LEARNERS SAY
          </span>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', margin: '0 auto 64px' }}>
            Trusted by Future Innovators
          </h2>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '48px', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ fontSize: '1.25rem', color: '#cbd5e1', fontStyle: 'italic', lineHeight: 1.6 }}>
              "Sample learner feedback will appear here."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--el-dark-blue), var(--el-indigo))', padding: '120px 24px', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="container" style={{ maxWidth: '800px', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', marginBottom: '24px' }}>Start Your Learning Journey Today</h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: '48px', lineHeight: 1.6 }}>
            Build practical skills, work on real projects, and keep growing with modern technology.
          </p>
          <Link to="/elearning/courses" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem', background: 'white', border: 'none', color: 'var(--el-navy)', borderRadius: '8px', fontWeight: 600 }}>
            Explore Courses &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
