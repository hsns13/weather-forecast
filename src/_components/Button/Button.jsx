import React, { Fragment, useState, useEffect } from 'react';

const Button = (props) => {
    const [active, setActive] = useState('');
    const [name, setName] = useState('');

    const onClick = (e) => {
        if (name !== e.target.value) {
            setActive('');
        }
        setActive('active');
        props.onClick(e);
    };

    useEffect(() => {
        setName(props.name);
    });

    return (
        <Fragment>
            <button className={['button', `button--${props.type}`].join(' ')}
                onClick={onClick}
                value={props.name}>
                {props.name}
            </button>
        </Fragment>
    );
};

export default Button;