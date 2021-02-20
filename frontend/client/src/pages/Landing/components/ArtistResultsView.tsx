import React, { Fragment, useContext, useState } from 'react'
import { Accordion, AccordionTitleProps, Card, Divider, Grid, Image } from 'semantic-ui-react';
import { AppContext, IInitialState } from '../../../store';
import { ArtistAlbumSearchResult } from '../../../types/ArtistSearchResult';
import AlbumView from './AlbumView';

const ArtistResultsView: React.FC = () => {

    const { state } = useContext(AppContext);
    const { ArtistSearchResults } = state as IInitialState;

    const [activeIndex, setActiveIndex] = useState(-1);

    const handleAccordionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: AccordionTitleProps) => {
        const index = data.index ?? -1;
        const newIndex = activeIndex === index ? -1 : parseInt(index.toString());

        setActiveIndex(newIndex);
    }
    
    if(!ArtistSearchResults) {
        return <div/>
    }

    return (
        <Fragment>
            <Grid>
                <Grid.Row>
                    <Grid.Column width='16'>
                        <Card style={{width: '45%', margin: '0 auto'}}>
                            { ArtistSearchResults.logoUrl ?
                                <Image src={ArtistSearchResults.logoUrl} wrapped />
                                : <div/>
                            }
                            <Card.Content>
                                {!ArtistSearchResults.logoUrl ?
                                    <Card.Header>{ArtistSearchResults.artistName}</Card.Header>
                                    : <div/>
                                }
                                <Card.Meta><strong>Years Active: </strong>{ArtistSearchResults.formationYear} - {ArtistSearchResults.disbandYear ?? 'Present'}</Card.Meta>
                                <Card.Meta><strong>Number of Members: </strong>{ArtistSearchResults.numberOfMembers}</Card.Meta>
                                <Card.Meta><strong>Genre: </strong>{ArtistSearchResults.genre}</Card.Meta>
                                { ArtistSearchResults.bandWebsiteUrl ?
                                    <Card.Meta><strong>Website: </strong><a href={ArtistSearchResults.bandWebsiteUrl} target="_blank">{ArtistSearchResults.bandWebsiteUrl}</a></Card.Meta>
                                    : <div/>
                                }
                                { ArtistSearchResults.thumbnailUrl ?
                                    <Card.Description>
                                            <Image src={ArtistSearchResults.thumbnailUrl} wrapped />
                                    </Card.Description> 
                                    : <div/>
                                }
                                <Card.Description style={{marginTop: '10px'}}>{ArtistSearchResults.biography ?? <i>No Biography Found</i>}</Card.Description>
                            </Card.Content>
                            <Divider horizontal content='Albums' />
                            <Card.Content extra>
                                <Accordion>
                                    {ArtistSearchResults.albums.sort((a: ArtistAlbumSearchResult, b: ArtistAlbumSearchResult) => parseInt(a.yearReleased) - parseInt(b.yearReleased)).map((album: ArtistAlbumSearchResult, index: number) => (
                                        <Fragment>
                                            <Accordion.Title active={activeIndex === index} index={index} onClick={handleAccordionClick} content={`${album.albumName} (${album.yearReleased})`} />
                                            <Accordion.Content active={activeIndex === index}>
                                                <AlbumView album={album} key={'album-' + index} />
                                            </Accordion.Content>
                                        </Fragment>
                                    ))}
                                </Accordion>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Fragment>
    )
}

export default ArtistResultsView;