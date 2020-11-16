import React from 'react';

export default (props) => (
    <section {...props}>
        <div className="inner">
            {props.children}
        </div>
    </section>
);