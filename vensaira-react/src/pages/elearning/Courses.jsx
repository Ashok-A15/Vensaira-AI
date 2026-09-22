import { Link } from 'react-router-dom';
import { COURSES } from '../../data/courses';
import '../../styles/elearning.css';

export default function Courses() {
  return (
    <div style={{ background: '#F5F8FC', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="el-container">

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{
            display: 'inline-block',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#1677E8',
            marginBottom: '16px'
          }}>
            VENSAIRA AI eLEARNING
          </span>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            color: '#0B1F3A',
            marginBottom: '20px',
            lineHeight: 1.2
          }}>
            Explore Our Courses
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#475569',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Build practical skills with structured courses designed for the technologies shaping the future.
          </p>
        </div>

        {/* Course Grid */}
        <div className="el-courses-grid">
          {COURSES.map(course => (
            <div key={course.id} className="el-card">

              {/* Course Image */}
              <div className="el-card-img-wrap">
                <img
                  src={course.image}
                  alt={course.title}
                  className="el-card-img"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="el-card-body">
                <span className="el-card-category">{course.category}</span>
                <h3 className="el-card-title">{course.title}</h3>
                <p className="el-card-desc">{course.description}</p>

                <div className="el-card-meta">
                  <div>
                    <span className="el-card-meta-label">Level</span>
                    <span className="el-card-meta-value">{course.level}</span>
                  </div>
                  <div>
                    <span className="el-card-meta-label">Duration</span>
                    <span className="el-card-meta-value">{course.duration}</span>
                  </div>
                </div>

                <Link to={`/elearning/courses/${course.id}`} className="el-card-btn">
                  Explore Course &rarr;
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
