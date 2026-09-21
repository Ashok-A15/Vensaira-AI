import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { courses } from '../../data/courses';
import CourseCard from '../../components/elearning/CourseCard';
import '../../styles/elearning.css';

export default function Dashboard() {
  const { user, enrolledCourses } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/elearning/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const myCourses = courses.filter(c => enrolledCourses.includes(c.id));
  const availableCourses = courses.filter(c => !enrolledCourses.includes(c.id));

  return (
    <div className="elearning-page" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome, {user.firstName}</h1>
          <p className="section-description">Manage your learning journey and explore new topics.</p>
        </div>

        {myCourses.length > 0 && (
          <div className="dashboard-section">
            <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '24px' }}>My Courses</h2>
            <div className="course-grid">
              {myCourses.map(course => (
                <CourseCard key={course.id} course={course} isEnrolled={true} />
              ))}
            </div>
          </div>
        )}

        <div className="dashboard-section">
          <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Available Courses</h2>
          {availableCourses.length > 0 ? (
            <div className="course-grid">
              {availableCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <p className="section-description">You have enrolled in all available courses!</p>
          )}
        </div>
      </div>
    </div>
  );
}
