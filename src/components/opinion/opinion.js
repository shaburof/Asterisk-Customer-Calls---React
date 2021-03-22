import React from 'react';

const Opinion = ({ call }) => {
    const showOpinion = call.opinion ? true : false;
    const colors = {
        1: '#ff0f00', 2: '#ff6b0e', 3: '#95e200', 4: '#9ee207', 5: '#00c720'
    };
    const color = colors[call.opinion];

    return <>
        {showOpinion ? <div className="dcall__opinion" style={{ backgroundColor: color }}>{call.opinion}</div> : ''}
    </>
}

export default Opinion;