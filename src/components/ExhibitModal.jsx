import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ExhibitModal({ exhibit, onClose }) {
  const slides = [];
  slides.push('text');
  if (exhibit.photos && exhibit.photos.length > 0) {
    slides.push('photos');
  }
  if (exhibit.embedUrl || (exhibit.videos && exhibit.videos.length > 0)) {
    slides.push('video');
  }

  const [currentSlide, setCurrentSlide] = useState(0);

  // Prevent clicks inside the modal from propagating up and locking the pointer again
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const slideType = slides[currentSlide];

  return (
    <div className="exhibit-modal-overlay" onClick={onClose}>
      <div className="exhibit-modal" onClick={handleModalClick}>
        <button className="close-button" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2 className="modal-title">{exhibit.title}</h2>
        </div>

        <div className="slider-container">
          {currentSlide > 0 && (
            <button className="slider-arrow slider-arrow-left" onClick={prevSlide} aria-label="Previous Slide">
              <ChevronLeft size={32} />
            </button>
          )}

          <div className="slide-content">
            {slideType === 'text' && (
              <div className="slide-text">
                <div className="text-metadata-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {exhibit.date && (
                    <div className="text-section">
                      <h3>Дата</h3>
                      <p>{exhibit.date}</p>
                    </div>
                  )}
                  {exhibit.keyFigures && (
                    <div className="text-section">
                      <h3>Ключевые фигуры</h3>
                      <p>{exhibit.keyFigures}</p>
                    </div>
                  )}
                  {exhibit.organization && (
                    <div className="text-section">
                      <h3>Ключевая организация</h3>
                      <p>{exhibit.organization}</p>
                    </div>
                  )}
                  {exhibit.event && (
                    <div className="text-section">
                      <h3>Событие</h3>
                      <p>{exhibit.event}</p>
                    </div>
                  )}
                  {exhibit.theme && (
                    <div className="text-section">
                      <h3>Суть / Главная тема</h3>
                      <p>{exhibit.theme}</p>
                    </div>
                  )}
                </div>
                
                {exhibit.mainPoints && (
                  <div className="text-section" style={{ marginTop: '1rem' }}>
                    <h3>Главное</h3>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                      {exhibit.mainPoints.map((point, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem', color: '#e5e5e5', fontSize: '1.1rem', lineHeight: '1.6' }}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Fallback for old description prop */}
                {!exhibit.mainPoints && !exhibit.keyFigures && !exhibit.essence && exhibit.description && (
                  <p className="modal-description">{exhibit.description}</p>
                )}
              </div>
            )}

            {slideType === 'photos' && (
              <div className="slide-media">
                <div className="photos-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}>
                  {exhibit.photos.map((photoUrl, idx) => (
                    <img key={idx} src={photoUrl} alt={`${exhibit.title} ${idx + 1}`} className="media-item" style={{ height: 'auto', flexShrink: 0 }} />
                  ))}
                </div>
              </div>
            )}

            {slideType === 'video' && (
              <div className="slide-media">
                {exhibit.embedUrl ? (
                  <iframe
                    className="iframe-item"
                    src={exhibit.embedUrl}
                    title={exhibit.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video controls className="video-item">
                    <source src={exhibit.videos[0]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
          </div>

          {currentSlide < slides.length - 1 && (
            <button className="slider-arrow slider-arrow-right" onClick={nextSlide} aria-label="Next Slide">
              <ChevronRight size={32} />
            </button>
          )}
        </div>

        <div className="slider-dots">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`dot ${currentSlide === idx ? 'active' : ''}`} 
              onClick={() => setCurrentSlide(idx)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
