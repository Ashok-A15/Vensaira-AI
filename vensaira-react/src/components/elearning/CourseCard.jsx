import { Link } from 'react-router-dom';

export default function CourseCard({ course, isEnrolled = false }) {
  // Determine gradient class based on category
  let cardClass = 'course-card';
  if (course.category.includes('Artificial Intelligence') || course.category.includes('AI')) {
    cardClass += ' course-card-ai';
  } else if (course.category.includes('Generative')) {
    cardClass += ' course-card-genai';
  } else if (course.category.includes('Cloud')) {
    cardClass += ' course-card-cloud';
  } else {
    cardClass += ' course-card-ai'; // Default fallback
  }

  return (
    <div className={cardClass}>
      <span className="course-category">{course.category}</span>
      <h3 className="course-title">{course.title}</h3>
      <p className="course-desc">{course.description}</p>
      
      <div className="course-meta">
        <span>Level: {course.level}</span>
        <span>{course.duration}</span>
      </div>

      {isEnrolled && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>
            <span>Progress</span>
            <span>0%</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '0%', height: '100%', background: 'var(--electric-blue)' }}></div>
          </div>
        </div>
      )}
      
      <Link to={`/elearning/courses/${course.id}`} className={isEnrolled ? "btn btn-primary" : "btn btn-secondary"} style={{ width: '100%', textAlign: 'center', marginTop: 'auto' }}>
        {isEnrolled ? "Continue Learning" : "View Course →"}
      </Link>
    </div>
  );
}
