import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

const CustomScroll = (props) => {
    return (
        <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
            {...props}
        />
    );
};

export default CustomScroll;