import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { COURSES } from '../../data/courses';
import '../../styles/elearning.css';

export default function Dashboard() {
  const { user, enrolledCourses } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Dashboard | Vensaira AI eLearning';
    if (!user) {
      navigate('/elearning/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const myCourses = COURSES.filter(c => enrolledCourses.includes(c.id));
  const recommendedCourses = COURSES.filter(c => !enrolledCourses.includes(c.id)).slice(0, 3);
  
  // Mock progress for the first enrolled course
  const continueCourse = myCourses.length > 0 ? myCourses[0] : null;

  return (
    <div className="elearning-layout" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="el-container">
        
        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--el-navy)', marginBottom: '8px' }}>
            Welcome back, {user.firstName || 'Learner'}
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--el-text-light)' }}>
            Continue your learning journey and explore new topics.
          </p>
        </div>

        {/* Continue Learning */}
        {continueCourse && (
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--el-navy)', marginBottom: '24px' }}>
              Continue Learning
            </h2>
            <div className="el-course-card" style={{ flexDirection: 'row', alignItems: 'stretch' }}>
              <div style={{ width: '300px', flexShrink: 0, overflow: 'hidden' }}>
                <img 
                  src={continueCourse.image} 
                  alt={continueCourse.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--el-blue)', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  {continueCourse.category}
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
                  {continueCourse.title}
                </h3>
                
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                    <span style={{ color: 'var(--el-text-light)' }}>Progress</span>
                    <span style={{ color: 'var(--el-navy)' }}>42%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--el-border)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '42%', height: '100%', background: 'var(--el-blue)' }}></div>
                  </div>
                </div>

                <div>
                  <Link to={`/elearning/courses/${continueCourse.slug}`} className="el-btn">
                    Continue Learning &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Courses */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--el-navy)', marginBottom: '24px' }}>
            Recommended Courses
          </h2>
          {recommendedCourses.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '32px' 
            }}>
              {recommendedCourses.map(course => (
                <div key={course.id} className="el-course-card">
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
                    <Link to={`/elearning/courses/${course.slug}`} className="el-btn" style={{ width: '100%', justifyContent: 'center' }}>
                      Explore Course &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--el-text-light)' }}>You have enrolled in all available courses!</p>
          )}
        </div>

      </div>
    </div>
  );
}
