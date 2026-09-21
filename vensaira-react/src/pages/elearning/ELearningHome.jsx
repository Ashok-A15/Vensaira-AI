import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { COURSES } from '../../data/courses';
import '../../styles/elearning.css';

export default function ELearningHome() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.el-animate');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="elearning-layout" ref={sectionRef}>
      
      {/* 1. Hero Section */}
      <section style={{ 
        background: `linear-gradient(to right, rgba(11, 31, 58, 0.95) 40%, rgba(11, 31, 58, 0.7) 100%), url('/assets/elearning/elearning-hero.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '160px 0 120px',
        color: '#FFF'
      }}>
        <div className="el-container">
          <div className="el-animate" style={{ maxWidth: '700px' }}>
            <span style={{ 
              display: 'inline-block', 
              fontSize: '13px', 
              fontWeight: 700, 
              letterSpacing: '0.1em', 
              textTransform: 'uppercase', 
              color: '#3B82F6', 
              marginBottom: '24px' 
            }}>
              Vensaira eLearning Platform
            </span>
            <h1 style={{ 
              fontSize: 'clamp(40px, 5vw, 64px)', 
              fontWeight: 700, 
              marginBottom: '24px', 
              lineHeight: 1.1,
              color: '#FFF'
            }}>
              Learn the Technologies Shaping the Future
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#CBD5E1', 
              marginBottom: '40px', 
              lineHeight: 1.6 
            }}>
              Build practical skills in AI, software engineering, cloud computing and modern digital technologies through structured learning experiences.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/elearning/courses" className="el-btn">
                Explore Courses &rarr;
              </Link>
              <Link to="/elearning/signup" className="el-btn el-btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#FFF' }}>
                Get Started &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Course Categories & Featured Courses */}
      <section className="el-section">
        <div className="el-container">
          
          <div className="el-animate" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>Explore Learning Paths</h2>
            <p style={{ fontSize: '18px', color: 'var(--el-text-light)', maxWidth: '600px', margin: '0 auto' }}>
              Master the skills needed to design, build, and scale modern technology solutions.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '32px' 
          }}>
            {COURSES.map((course, idx) => (
              <div key={course.id} className="el-course-card el-animate" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--el-blue)', letterSpacing: '0.05em' }}>
                      {course.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                    {course.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: 'var(--el-text-light)', lineHeight: 1.5, marginBottom: '24px', flex: 1 }}>
                    {course.description}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    borderTop: '1px solid var(--el-border)', 
                    paddingTop: '16px',
                    marginBottom: '24px'
                  }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '12px', color: 'var(--el-text-light)', fontWeight: 600 }}>Level</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--el-navy)' }}>{course.level}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '12px', color: 'var(--el-text-light)', fontWeight: 600 }}>Duration</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--el-navy)' }}>{course.duration}</span>
                    </div>
                  </div>

                  <Link to={`/elearning/courses/${course.slug}`} className="el-btn" style={{ width: '100%', justifyContent: 'center' }}>
                    View Course &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Bottom CTA */}
      <section className="el-section" style={{ background: '#FFF' }}>
        <div className="el-container">
          <div className="el-animate" style={{ 
            background: 'var(--el-navy)', 
            borderRadius: '16px', 
            padding: '80px 40px', 
            textAlign: 'center',
            color: '#FFF'
          }}>
            <h2 style={{ fontSize: '32px', color: '#FFF', fontWeight: 700, marginBottom: '16px' }}>
              Ready to Accelerate Your Career?
            </h2>
            <p style={{ fontSize: '18px', color: '#CBD5E1', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
              Join Vensaira eLearning and gain practical, hands-on experience in the technologies driving digital transformation.
            </p>
            <Link to="/elearning/signup" className="el-btn" style={{ padding: '16px 32px' }}>
              Create Free Account &rarr;
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
