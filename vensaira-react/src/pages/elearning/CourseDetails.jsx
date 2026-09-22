import { useParams, useNavigate } from 'react-router-dom';
import { COURSES } from '../../data/courses';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import '../../styles/elearning.css';

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, isEnrolled, enroll } = useAuth();
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [learningMode, setLearningMode] = useState(false);
  const sectionRef = useRef(null);

  // Match by slug or id
  const course = COURSES.find(c => c.slug === courseId || c.id === courseId);

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
  }, [learningMode]);

  if (!course) {
    return (
      <div className="elearning-layout" style={{ padding: '160px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', color: 'var(--el-navy)' }}>Course Not Found</h1>
        <button onClick={() => navigate('/elearning/courses')} className="el-btn" style={{ marginTop: '24px' }}>
          Back to Courses
        </button>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);

  const handleEnroll = () => {
    if (!user) {
      navigate('/elearning/login', { state: { returnTo: `/elearning/courses/${course.slug}` } });
      return;
    }
    enroll(course.id);
    setEnrollSuccess(true);
  };

  const handleStartLearning = () => {
    setLearningMode(true);
  };

  if (learningMode) {
    return (
      <div className="elearning-layout" style={{ display: 'flex', minHeight: '100vh', background: '#FFF' }}>
        {/* Sidebar */}
        <aside style={{ width: '320px', background: 'var(--el-bg)', borderRight: '1px solid var(--el-border)', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', color: 'var(--el-navy)' }}>
            {course.title}
          </h2>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--el-text-light)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Progress
            </div>
            <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '25%', height: '100%', background: 'var(--el-blue)' }}></div>
            </div>
          </div>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {course.modules.map((m, i) => (
                <li key={m.id} style={{ marginBottom: '12px' }}>
                  <div style={{ padding: '12px 16px', background: i === 0 ? '#E0E7FF' : 'transparent', borderRadius: '8px', cursor: 'pointer', border: '1px solid', borderColor: i === 0 ? '#C7D2FE' : 'transparent' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: i === 0 ? 'var(--el-blue)' : 'var(--el-text-light)', marginBottom: '4px' }}>
                      Module {i + 1}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: i === 0 ? 'var(--el-navy)' : 'var(--el-text)' }}>
                      {m.title}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        
        {/* Main Content Area */}
        <main style={{ flex: 1, padding: '40px 60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--el-navy)' }}>
              {course.modules[0].title}
            </h1>
            <button onClick={() => setLearningMode(false)} className="el-btn el-btn-secondary">
              Exit Course
            </button>
          </div>
          <div style={{ width: '100%', aspectRatio: '16/9', background: '#0F172A', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
            <span style={{ color: '#FFF', fontSize: '18px' }}>▶ Video Player Mock</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="el-btn el-btn-secondary" disabled style={{ opacity: 0.5 }}>&larr; Previous Lesson</button>
            <button className="el-btn">Next Lesson &rarr;</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="elearning-layout" ref={sectionRef}>
      {/* Course Hero */}
      <section style={{ background: 'var(--el-navy)', padding: '80px 0', color: '#FFF' }}>
        <div className="el-container">
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="el-animate" style={{ flex: 1, minWidth: '300px' }}>
              <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#3B82F6', marginBottom: '16px' }}>
                {course.category}
              </span>
              <h1 style={{ fontSize: '40px', fontWeight: 700, marginBottom: '24px', lineHeight: 1.2 }}>
                {course.title}
              </h1>
              <p style={{ fontSize: '18px', color: '#CBD5E1', marginBottom: '32px', lineHeight: 1.6 }}>
                {course.description}
              </p>
              <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Level</span>
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>{course.level}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Duration</span>
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>{course.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="el-animate" style={{ width: '400px', flexShrink: 0 }}>
              <div style={{ background: '#FFF', borderRadius: '12px', overflow: 'hidden', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <div style={{ width: '100%', height: '200px', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
                  <img src={course.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                {enrolled ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button onClick={handleStartLearning} className="el-btn" style={{ width: '100%', justifyContent: 'center' }}>
                      Start Learning
                    </button>
                    <button onClick={() => navigate('/elearning/dashboard')} className="el-btn el-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                      Go to Dashboard
                    </button>
                  </div>
                ) : (
                  <button onClick={handleEnroll} className="el-btn" style={{ width: '100%', justifyContent: 'center' }}>
                    Enroll Now
                  </button>
                )}
                
                {enrollSuccess && (
                  <div style={{ marginTop: '16px', color: '#16A34A', fontSize: '14px', textAlign: 'center', fontWeight: 600 }}>
                    Successfully enrolled!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="el-section">
        <div className="el-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
            
            {/* Learning Outcomes */}
            <div className="el-animate">
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: 'var(--el-navy)' }}>What You'll Learn</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {course.learningOutcomes.map((outcome, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '16px', color: 'var(--el-text)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--el-blue)', fontSize: '20px' }}>✓</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            {/* Modules */}
            <div className="el-animate">
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: 'var(--el-navy)' }}>Course Modules</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {course.modules.map((module, idx) => (
                  <div key={idx} style={{ background: '#FFF', border: '1px solid var(--el-border)', borderRadius: '8px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--el-blue)', textTransform: 'uppercase', marginBottom: '8px' }}>
                          Module {idx + 1}
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--el-navy)', margin: 0 }}>
                          {module.title}
                        </h3>
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--el-text-light)', fontWeight: 600 }}>
                        {module.lessons} lessons
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
