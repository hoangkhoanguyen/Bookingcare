import React from 'react';

import { HomeBody } from './HomeBody/HomeBody';
import { HomeFooter } from './HomeFooter/HomeFooter';
import { HomeHeader } from './HomeHeader/HomeHeader';

export const HomePage = () => {
    return (
        <>
            <HomeHeader />
            <HomeBody />
            <HomeFooter />
        </>);
};
