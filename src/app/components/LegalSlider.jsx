'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import styles from '@/app/styles/legalSlider.module.css';
import '@/app/styles/style.css';

import { useTranslations } from 'next-intl';
import { getSlides } from '@/app/data/slidesLegal';

export default function LegalSlider() {
    const [swiperRef, setSwiperRef] = useState(null);
    const t = useTranslations('LegalSlider');
    const tSlides = useTranslations('LegalSlides');
    if (!tSlides) {
        return null;
    }
    const slides = getSlides(tSlides);
    function renderWithLineBreaks(text) {
        return text.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>
                {line}
                <br />
            </React.Fragment>
        ));
    }

    return (
        <div className={styles.container}>
            <div className="headerLegal">
                <div>
                    <h2 className={styles.heading}>{t('title1')}</h2>
                    <h2 className={styles.heading}>{t('title2')}</h2>
                </div>
                <img src="/scale-of-justice.svg" alt="justice scale" />
            </div>

            <Swiper
                modules={[FreeMode]}
                navigation={false}
                effect="coverflow"
                spaceBetween={30}
                slidesPerView={1}
                onSwiper={setSwiperRef}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <div className={styles.slide}>
                            <div>
                                <span className={styles.index}>
                                    {String(index + 1).padStart(2, '0')}/{slides.length}
                                </span>
                                <h3 className={styles.title}>{slide.title}</h3>
                                <p className={styles.description}>
                                    {renderWithLineBreaks(slide.description)}
                                </p>
                            </div>

                            <div className={styles.footnotes}>
                                {slide.footnotes.map((note, noteIdx) => (
                                    <p key={noteIdx} className={styles.footnote}>
                                        {note.split(/({\d+})/g).map((part, idx) => {
                                            const match = part.match(/{(\d+)}/);
                                            if (match) {
                                                const linkIndex = parseInt(match[1], 10) - 1;
                                                const url = slide.links?.[linkIndex];
                                                return url ? (
                                                    <a
                                                        key={idx}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={styles.supLink}
                                                    >
                                                        <sup><sup>[{match[1]}]</sup></sup>
                                                    </a>
                                                ) : null;
                                            }
                                            return <span key={idx}>{part}</span>;
                                        })}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="buttons-container">
                            <button className="buttons-legal" onClick={() => swiperRef?.slidePrev()}>
                                <img src="/left.svg" alt={t('prev')} />
                            </button>
                            <span className="footer-index">{String(index + 1).padStart(2, '0')}</span>
                            <button className="buttons-legal" onClick={() => swiperRef?.slideNext()}>
                                <img src="/right.svg" alt={t('next')} />
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

