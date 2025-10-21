'use client';

import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import '@/app/styles/hos.css';

export default function StoryPage({ params }) {
    // const t = useTranslations('stories');
    // const story = t.raw(params.id);

    if (!story) return notFound();

    return (
			<div className='page'>
				<div className='story-container'>
					{/* <h1 className='story-title'>{story.title}</h1> */}
					<a
						href='https://youtube.com/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img
							src='/video-h-o-s.png'
							width={900}
							height={400}
							alt={story.title}
						/>
					</a>
					<a
						className='video-preview'
						href={video.url}
						target='_blank'
						rel='noopener noreferrer'
					>
						<div className='play-icon'>&#9658;</div>
					</a>


					{/* <div className='story-content'>
						{story.content?.map((p, idx) => (
							<p key={idx}>{p}</p>
						))}
					</div> */}
				</div>
			</div>
		)
}
