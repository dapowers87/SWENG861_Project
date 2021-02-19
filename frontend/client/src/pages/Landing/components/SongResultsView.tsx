import React, { Fragment, useContext } from 'react'
import { Card, Image } from 'semantic-ui-react';
import { AppContext, IInitialState } from '../../../store';

const SongResultsView: React.FC = () => {

    const { state } = useContext(AppContext);
    const { SongSearchResults } = state as IInitialState;

    if(!SongSearchResults) {
        return <div/>
    }

    return (
        <Fragment>
            <Card>
                {SongSearchResults.thumbnailUrl ?
                    <Image src={SongSearchResults.thumbnailUrl} wrapped />
                    : <div/>
                }
                <Card.Content>
                    <Card.Header>{SongSearchResults.artistName} - {SongSearchResults.songName} </Card.Header>
                    <Card.Meta>Total Number of Plays: {SongSearchResults.totalPlays}</Card.Meta>
                    <Card.Meta>Score: {SongSearchResults.score}/10</Card.Meta>
                    {SongSearchResults.musicVideoUrl ? 
                        <Card.Description style={{marginBottom: '10px'}}><strong>Watch the Music Video:</strong> <a href={SongSearchResults.musicVideoUrl} target="_blank">Here</a> </Card.Description>
                        : <div/>
                    }
                    <Card.Description>{SongSearchResults.description ? SongSearchResults.description : 'No Description Found'}</Card.Description>
                </Card.Content>
            </Card>
        </Fragment>
    )
}

export default SongResultsView;