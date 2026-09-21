import { courses } from '../../data/courses';
import CourseCard from '../../components/elearning/CourseCard';
import '../../styles/elearning.css';

export default function Courses() {
  return (
    <div className="elearning-page" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="container">
        <div className="dashboard-header" style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h1 className="dashboard-title">Explore Our Courses</h1>
          <p className="section-description" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
            Build practical skills with structured courses designed for the technologies shaping the future.
          </p>
        </div>

        <div className="course-grid">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
