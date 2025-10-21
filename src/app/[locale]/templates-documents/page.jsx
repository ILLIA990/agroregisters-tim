'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import '@/app/styles/style.css';
import '@/app/styles/td.css';

export default function TD() {
    const t = useTranslations('TD');
    function renderWithLineBreaks(text) {
        return text.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>
                {line}
                <br />
            </React.Fragment>
        ));
    }
    return (
        <div className="page">
            <h1>{t('Title')}</h1>
            <h2>{renderWithLineBreaks(t('Description'))}</h2>
            <div className="divide-two-parts">
                <div className="first-block">
                    <div className="first-block-header">
                        <h3 className="block-title">{t('Block1_Title')}</h3>
                        <img src="/golden-rmb-coins-cloth-bag 1.svg" alt="" />
                    </div>
                    <div className="first-block-body">
                        <div>
                            <h2>{renderWithLineBreaks(t('Block1_Text'))}</h2>
                        </div>
                        <div className="buttons-block">
                            <a className="first-button" href="https://agroregisters.com.ua/wp-content/uploads/2019/09/FCR-template.docx">
                                {t('Block1_Button1')}
                            </a>
                            <a className="first-button" href="https://agroregisters.com.ua/wp-content/uploads/2019/10/Uzgodzhennya-FAR-ta-Dogovir-kredytu.docx">
                                {t('Block1_Button2')}
                            </a>
                            <a className="first-button" href="https://agroregisters.com.ua/wp-content/uploads/2019/10/Uzgodzhennya-FAR-ta-Dogovir-kupivli-prodazhu.docx">
                                {t('Block1_Button3')}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="second-block">
                    <div className="second-block-header">
                        <h3 className="block-title">{t('Block2_Title')}</h3>
                        <img src="/golden-rmb-coins-cloth-bag.svg" alt="" />
                    </div>
                    <div className="second-block-body">
                        <div>
                            <h2>{renderWithLineBreaks(t('Block2_Text'))}</h2>
                        </div>
                        <div className="buttons-block">
                            <a className="second-button" href="https://agroregisters.com.ua/wp-content/uploads/2019/09/CCR-template.docx">
                                {t('Block2_Button1')}
                            </a>
                            <a className="second-button" href="https://agroregisters.com.ua/wp-content/uploads/2019/10/Uzgodzhennya-TAR-ta-Dogovir-miny-tovaru.docx">
                                {t('Block2_Button2')}
                            </a>
                            <a className="second-button" href="https://agroregisters.com.ua/wp-content/uploads/2019/10/Uzgodzhennya-TAR-ta-Forvardnyj-kontrakt.docx">
                                {t('Block2_Button3')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
