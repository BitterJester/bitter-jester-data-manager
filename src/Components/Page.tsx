import React from 'react';

const Page = (props) => {
    return (
        <div className={'original-song-competition-container'}>
            <div className={'original-song-container'}>
                {props.children}
            </div>
        </div>
    );
};

export default Page;