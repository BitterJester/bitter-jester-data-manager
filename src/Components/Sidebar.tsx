import React from 'react';

export const Sidebar = () => {
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    return (
        <div>
            <div className={'openSidebarComponent'}>
                <img src={require('../static/bj15ylogo.png')} alt='BJ15Years' onClick={() => openNav()} />
            </div>
            <div id='mySidenav' className={'sidenav'}>
                <span className="closebtn" onClick={() => closeNav()}>&times;</span>
                <a href='/completedSubmissions' >Completed Submissions</a>
                <a href='/incompleteApplications' >Incomplete Applications</a>
            </div>
        </div>
    );
};