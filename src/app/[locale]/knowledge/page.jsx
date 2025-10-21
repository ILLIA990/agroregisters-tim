import '@/app/styles/style.css'
import { useTranslations } from 'next-intl'
import '@/app/styles/agrarianPage.css'

export default function KnowledgeCatPage() {
	const t = useTranslations('agrarian')

	return (
		<main>
			<div className='page-k'></div>
			<div className='agrarian-wrapper'>
				<div className='page-k'>
					<section className='intro-section'>
						<div className='text-block'>
							<h1>{t('what_is_title')}</h1>
							<p dangerouslySetInnerHTML={{ __html: t.raw('what_is_text') }} />
							<br />
							<p dangerouslySetInnerHTML={{ __html: t.raw('what_is_text_2') }} />
						</div>
						<img src='/agrarian-about.png' alt='Agrarian' />
					</section>
				</div>

				<section className='types-section'>
					<div className='page-k'>
						<h1>{t('types_title')}</h1>
						<div className='types-cards'>
							<div className='card'>
								<div className='card-top'>
									<h3>{t('types_goods_title')}</h3>
									<img
										src='/knowledge-icons/golden-rmb-coins-cloth-bag 2.svg'
										alt='sss'
									/>
								</div>
								<h2
									dangerouslySetInnerHTML={{ __html: t('types_goods_text') }}
								/>
							</div>
							<div className='card'>
								<div className='card-top'>
									<h3>{t('types_financial_title')}</h3>
									<img src='/knowledge-icons/golden-rmb-coins-cloth-bag 1.svg' />
								</div>
								<h2
									dangerouslySetInnerHTML={{
										__html: t('types_financial_text'),
									}}
								/>
							</div>
						</div>
					</div>
				</section>

				<section className='features-section'>
					<div className='page-k'>
						<h1>{t('features_title')}</h1>
						<div className='features-list'>
							<div className='features-section-card'>
								<div className='icons-block'>
									<img src='/knowledge-icons/golden-rmb-coins-cloth-bag 11.svg' />
									<div className='icon-features-section'>
										<img src='/knowledge-icons/check.svg' />
									</div>
								</div>
								<h2 dangerouslySetInnerHTML={{ __html: t('feature_1') }} />
							</div>
							<div className='features-section-card'>
								<div className='icons-block'>
									<img src='/knowledge-icons/golden-rmb-coins-cloth-bag 11 (1).svg' />
									<div className='icon-features-section'>
										<img src='/knowledge-icons/check.svg' />
									</div>
								</div>
								<h2 dangerouslySetInnerHTML={{ __html: t('feature_2') }} />
							</div>
							<div className='features-section-card'>
								<div className='icons-block'>
									<img src='/knowledge-icons/golden-rmb-coins-cloth-bag 11 (2).svg' />
									<div className='icon-features-section'>
										<img src='/knowledge-icons/check.svg' />
									</div>
								</div>
								<h2 dangerouslySetInnerHTML={{ __html: t('feature_3') }} />
							</div>
							<div className='features-section-card'>
								<div className='icons-block'>
									<img src='/knowledge-icons/golden-rmb-coins-cloth-bag 11 (3).svg' />
									<div className='icon-features-section'>
										<img src='/knowledge-icons/check.svg' />
									</div>
								</div>
								<h2 dangerouslySetInnerHTML={{ __html: t('feature_4') }} />
							</div>
							<div className='features-section-card'>
								<div className='icons-block'>
									<img src='/knowledge-icons/golden-rmb-coins-cloth-bag 11 (4).svg' />
									<div className='icon-features-section'>
										<img src='/knowledge-icons/check.svg' />
									</div>
								</div>
								<h2 dangerouslySetInnerHTML={{ __html: t('feature_5') }} />
							</div>
							<div className='features-section-card'>
								<div className='icons-block'>
									<img src='/knowledge-icons/golden-rmb-coins-cloth-bag 11 (5).svg' />
									<div className='icon-features-section'>
										<img src='/knowledge-icons/check.svg' />
									</div>
								</div>
								<h2 dangerouslySetInnerHTML={{ __html: t('feature_6') }} />
							</div>
						</div>
					</div>
				</section>

				<section className='important-section'>
					<div className='page-k'>
						<h1>{t('important_title')}</h1>
						<div className='important-list'>
							<div className='sections-section-card'>
								<div className='important-list-numbers'>01</div>
								<h2 dangerouslySetInnerHTML={{ __html: t('important_1') }} />
							</div>
							<div className='sections-section-card'>
								<div className='important-list-numbers'>02</div>
								<h2 dangerouslySetInnerHTML={{ __html: t('important_2') }} />
							</div>
							<div className='sections-section-card'>
								<div className='important-list-numbers'>03</div>
								<h2 dangerouslySetInnerHTML={{ __html: t('important_3') }} />
							</div>
							<div className='sections-section-card'>
								<div className='important-list-numbers'>04</div>
								<h2 dangerouslySetInnerHTML={{ __html: t('important_4') }} />
							</div>
							<div className='sections-section-card'>
								<div className='important-list-numbers'>05</div>
								<h2 dangerouslySetInnerHTML={{ __html: t('important_5') }} />
							</div>
							<div className='sections-section-card'>
								<div className='important-list-numbers'>06</div>
								<h2 dangerouslySetInnerHTML={{ __html: t('important_6') }} />
							</div>
							<div className='sections-section-card'>
								<div className='important-list-numbers'>07</div>
								<h2 dangerouslySetInnerHTML={{ __html: t('important_7') }} />
							</div>
						</div>
					</div>
				</section>

				<div className='page-k'>
					<section className='intro-section'>
						<div className='text-block'>
							<h1>{t('registry_title')}</h1>
							<p dangerouslySetInnerHTML={{ __html: t.raw('registry_text') }} />
							<br />
							<p dangerouslySetInnerHTML={{ __html: t.raw('registry_text_2') }} />
						</div>
						<img src='/agrarian-2.png' alt='Agrarian' />
					</section>
				</div>

				<div className='page-k-w'>
					<div className='page-k'>
						<section className='admin-section'>
							<img
								src='/agrarian-3.png'
								alt='Agrarian'
								width={536}
								height={390}
							/>
							<div className='text-block'>
								<h1>{t('admin_title')}</h1>
								<p dangerouslySetInnerHTML={{ __html: t('admin_text') }} />
								<br />
								<p dangerouslySetInnerHTML={{ __html: t('admin_text_2') }} />
							</div>
						</section>
					</div>
				</div>

				<div className='page-k'>
					<section className='ifc-section'>
						<h1>{t('ifc_title')}</h1>
						<p dangerouslySetInnerHTML={{ __html: t('ifc_text') }} />
						<br />
						<p dangerouslySetInnerHTML={{ __html: t('ifc_text2') }} />
						<br />
						<p dangerouslySetInnerHTML={{ __html: t.raw('ifc_text3') }} />
						<div className='ifc-section-img'>
							<img src='/ifc.svg' alt='ifc' />
							<img src='/ifc2.svg' alt='Agrarian' />
						</div>
					</section>
				</div>
			</div>
		</main>
	)
}
