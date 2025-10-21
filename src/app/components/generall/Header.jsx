'use client';
import React, { useEffect, useState } from 'react';
import HeaderDesk from "@/app/components/generall/HeaderDesk";
import HeaderMobile from "@/app/components/generall/HeaderMobile";

const Header = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 768); // 768px — стандартный порог
        };

        checkScreen(); // начальная проверка
        window.addEventListener('resize', checkScreen); // обновлять при ресайзе

        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    return isMobile ? <HeaderMobile /> : <HeaderDesk />;
};

export default Header;
