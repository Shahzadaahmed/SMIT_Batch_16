// Header Component...!

import React, { FC } from 'react';

interface HeaderProp {
    screenName: string;
}

const Header: FC<HeaderProp> = ({ screenName }) => {
// const Header = ( props : HeaderProp ) => {
    // const { screenName } = props
    return (
        <h1> Header Screen </h1>
    );
};

export default Header;