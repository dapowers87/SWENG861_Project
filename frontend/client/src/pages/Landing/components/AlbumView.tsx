import React, { Fragment } from 'react'
import { Card, Image } from 'semantic-ui-react';
import { ArtistAlbumSearchResult } from '../../../types/ArtistSearchResult';

const AlbumView: React.FC<{album: ArtistAlbumSearchResult}> = ({ album }) => {
    
    return (
        <Fragment>
            <Card style={{width: '60%'}}>
                {album.thumbnailUrl ? 
                    <Image src={album.thumbnailUrl} wrapped />
                    : <div/>
                }
                <Card.Content>
                    <Card.Header>{album.albumName}</Card.Header>
                    <Card.Meta><strong>Year Released: </strong>{album.yearReleased}</Card.Meta>
                    <Card.Meta><i>{album.albumType}{album.albumType !== "Album" ? ' Album' : ''}</i></Card.Meta>
                    <Card.Description>{album.description ? album.description : <i>No Album Description Available</i>}</Card.Description>
                </Card.Content>
            </Card>
        </Fragment>
    )
}

export default AlbumView;