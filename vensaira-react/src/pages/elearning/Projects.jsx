import { useState, useEffect } from 'react';
import { PROJECTS } from '../../data/projects';
import '../../styles/elearning.css';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.title = 'Practical Projects | Vensaira AI eLearning';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

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
            Practical Projects
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#475569',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Build real-world projects and apply the skills you learn through our courses.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="el-courses-grid">
          {PROJECTS.map(project => (
            <div key={project.id} className="el-card">

              {/* Project Image */}
              <div className="el-card-img-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="el-card-img"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="el-card-body">
                <span className="el-card-category">{project.category}</span>
                <h3 className="el-card-title">{project.title}</h3>
                <p className="el-card-desc">{project.description}</p>

                {/* Tech Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      style={{
                        background: '#EEF4FC',
                        color: '#1677E8',
                        fontSize: '12px',
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: '12px'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="el-card-meta">
                  <div>
                    <span className="el-card-meta-label">Level</span>
                    <span className="el-card-meta-value">{project.level}</span>
                  </div>
                  <div>
                    <span className="el-card-meta-label">Duration</span>
                    <span className="el-card-meta-value">{project.duration}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="el-card-btn"
                  style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  View Project &rarr;
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(11, 31, 58, 0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '36px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                position: 'relative'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span className="el-card-category" style={{ margin: 0 }}>
                  {selectedProject.category}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close modal"
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    lineHeight: 1,
                    cursor: 'pointer',
                    color: '#64748B',
                    padding: '4px'
                  }}
                >
                  &times;
                </button>
              </div>

              <h2 id="project-modal-title" style={{ fontSize: '24px', color: '#0B1F3A', marginBottom: '16px', lineHeight: 1.3 }}>
                {selectedProject.title}
              </h2>

              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
                {selectedProject.description}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                background: '#F8FAFC',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Difficulty</span>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0B1F3A' }}>{selectedProject.level}</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Est. Time</span>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0B1F3A' }}>{selectedProject.duration}</div>
                </div>
              </div>

              <h4 style={{ fontSize: '15px', color: '#0B1F3A', marginBottom: '12px' }}>Core Objectives</h4>
              <ul style={{ paddingLeft: '20px', color: '#475569', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                {selectedProject.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>

              <h4 style={{ fontSize: '15px', color: '#0B1F3A', marginBottom: '12px' }}>Technologies</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {selectedProject.technologies.map(t => (
                  <span key={t} style={{
                    background: '#EEF4FC',
                    color: '#1677E8',
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: '12px'
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="el-card-btn"
                style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}
              >
                Close Details
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
