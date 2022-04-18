import React, { ReactElement } from 'react';

const TabPanel = (props: {children?: ReactElement, index: number, value: number}) => {
    const {children, value, index, ...other} = props;
    
    return (
        <div
            role="tabpanel"
            hidden={value != index}
            id={`tabpanel-${index}`}
            {...other}
        >
            {children}
        </div>
    )
};

export default TabPanel;