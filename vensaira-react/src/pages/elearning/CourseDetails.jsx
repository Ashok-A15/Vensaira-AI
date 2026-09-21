import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../../data/courses';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import '../../styles/elearning.css';

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, isEnrolled, enroll } = useAuth();
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="container" style={{ padding: '160px 0', textAlign: 'center' }}>
        <h1 className="section-title">Course Not Found</h1>
        <button onClick={() => navigate('/elearning')} className="btn btn-primary" style={{ marginTop: '24px' }}>
          Back to Courses
        </button>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);

  const handleEnroll = () => {
    if (!user) {
      navigate('/elearning/login', { state: { returnTo: `/elearning/courses/${course.id}` } });
      return;
    }
    
    enroll(course.id);
    setEnrollSuccess(true);
  };

  return (
    <div className="elearning-page">
      <div className="course-header">
        <div className="container">
          <div className="course-header-content">
            <span className="course-category" style={{ fontSize: '0.85rem' }}>{course.category}</span>
            <h1 className="course-details-title">{course.title}</h1>
            <p className="section-description" style={{ fontSize: '1.2rem', marginBottom: '32px' }}>
              {course.description}
            </p>
            <div className="course-meta" style={{ border: 'none', padding: 0, margin: 0, justifyContent: 'flex-start', gap: '32px' }}>
              <span><strong>Level:</strong> {course.level}</span>
              <span><strong>Duration:</strong> {course.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '120px' }}>
        <div className="course-content-grid">
          <div className="course-main-content">
            <h2 className="course-section-title" style={{ textTransform: 'uppercase' }}>What you will learn</h2>
            <ul className="course-list">
              {course.whatYouWillLearn.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2 className="course-section-title" style={{ textTransform: 'uppercase' }}>Course Modules</h2>
            <ul className="course-list">
              {course.modules.map((module, index) => (
                <li key={index}><strong>Module {index + 1}:</strong> {module}</li>
              ))}
            </ul>
          </div>

          <div className="course-sidebar">
            <div className="course-sidebar-card">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '16px' }}>
                {enrolled ? "You're enrolled in this course." : "Ready to start?"}
              </h3>
              
              {!enrolled && (
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
                  Join this course today and build your skills for the future.
                </p>
              )}
              
              {enrolled ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button onClick={() => alert("Starting course...")} className="btn btn-primary" style={{ width: '100%' }}>
                    Start Learning
                  </button>
                  <button onClick={() => navigate('/elearning/dashboard')} className="btn btn-secondary" style={{ width: '100%', background: '#f8fafc', color: '#0f172a', borderColor: '#cbd5e1' }}>
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <button onClick={handleEnroll} className="btn btn-primary" style={{ width: '100%' }}>
                  Enroll Now
                </button>
              )}
              
              {enrollSuccess && (
                <div style={{ marginTop: '16px', color: '#16a34a', fontSize: '0.9rem', textAlign: 'center', fontWeight: 600 }}>
                  Successfully enrolled!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
