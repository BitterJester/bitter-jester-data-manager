import React, {useState} from 'react';
import {Card, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {Title} from "../Title";
import {OriginalSongs} from "../../Pages/OriginalSongCompetition";

type Props = {
    originalSongs: OriginalSongs;
}

const OverallBandRankingsCard = (props: Props) => {
    const {originalSongs} = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Card className={'overall-band-rankings-card'}>
            <Title titleDisplayText={'OVERALL SONG RANKINGS'}/>
            <div className={'ranking-dropdown-container'}>
                <h4 className={'ranking-title'}>
                    FIRST PLACE
                </h4>
                <Dropdown className={'ranking-dropdown'} isOpen={isOpen} toggle={toggle}>
                    <DropdownToggle className={'toggle'} caret>
                        First Place
                    </DropdownToggle>
                    <DropdownMenu>
                        {
                            originalSongs.originalSongs.map(song => {
                                return (
                                    <DropdownItem onClick={() => null}>
                                        {`${song.songName} - ${song.bandName}`}
                                    </DropdownItem>
                                );
                            })
                        }
                    </DropdownMenu>
                </Dropdown>
            </div>
        </Card>
    );
};

export default OverallBandRankingsCard;