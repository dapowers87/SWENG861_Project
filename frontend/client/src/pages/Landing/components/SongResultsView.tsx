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
            <Card style={{width: '45%'}}>
                {SongSearchResults.thumbnailUrl ?
                    <Image src={SongSearchResults.thumbnailUrl} wrapped />
                    : <div/>
                }
                <Card.Content>
                    <Card.Header>{SongSearchResults.artistName} - {SongSearchResults.songName} </Card.Header>
                    <Card.Meta><strong>Genre: </strong>{SongSearchResults.genre ?? 'N/A'}</Card.Meta>
                    <Card.Meta><strong>Total Number of Plays: </strong>{SongSearchResults.totalPlays ?? 'N/A'}</Card.Meta>
                    <Card.Meta><strong>Score: </strong>{SongSearchResults.score ?? '-'}/10</Card.Meta>
                    {SongSearchResults.musicVideoUrl ? 
                        <Card.Description style={{marginBottom: '10px'}}><strong>Watch the Music Video:</strong> <a href={SongSearchResults.musicVideoUrl} target="_blank">Here</a> </Card.Description>
                        : <div/>
                    }
                    <Card.Description>{SongSearchResults.description ? SongSearchResults.description : <i>No Song Description Available</i>}</Card.Description>
                </Card.Content>
            </Card>
        </Fragment>
    )
}

export default SongResultsView;