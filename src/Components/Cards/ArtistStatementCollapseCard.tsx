import React, {useState} from 'react';
import {Card, Collapse} from "reactstrap";
import {Title} from "../Title";
import {OriginalSong} from "../../Pages/OriginalSongCompetition";

type Props = {
    originalSong: OriginalSong;
};

const ArtistStatementCollapseCard = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const {originalSong} = props;

    return (
        <div className={'lyrics-card-container'}>
            <Card onClick={toggle}>
                <div>
                    <span className={'dropdown-chevron'}>
                        {
                            isOpen ?
                                <svg className="bi bi-chevron-up" width="1em" height="1em" viewBox="0 0 16 16"
                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z"
                                          clipRule="evenodd"/>
                                </svg> :
                                <svg className="bi bi-chevron-down" width="1em" height="1em" viewBox="0 0 16 16"
                                     fill="currentColor"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
                                          clipRule="evenodd"/>
                                </svg>
                        }
                    </span>
                    <div className={'title-container'}>
                        <Title titleDisplayText={'CLICK HERE TO READ ARTIST STATEMENT'}/>
                    </div>
                </div>
                <Collapse isOpen={isOpen}>
                    <div>
                        <p style={{whiteSpace: "pre-wrap", textAlign: 'left'}}>
                            {originalSong ? originalSong.songDescription : ''}
                        </p>
                    </div>
                </Collapse>
            </Card>
        </div>
    );
};

export default ArtistStatementCollapseCard;