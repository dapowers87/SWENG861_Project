import React, { Fragment, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Form, Grid, Header } from 'semantic-ui-react'
import agent from '../../api/agent';
import { AppContext, IInitialState, types } from '../../store';
import ArtistResultsView from './components/ArtistResultsView';
import SongResultsView from './components/SongResultsView';

const LandingPage: React.FC = () => {

    const artistType = 'Artist';
    const songType = 'ArtistSong';
    const artistHeader = "Enter in an Artist's Name";
    const songHeader = "Enter in an Artist's Name and One of Their Song's Track Name";

    const { state, dispatch } = useContext(AppContext);
    const { MusicSearch, ArtistSearchResults, SongSearchResults } = state as IInitialState;

    const [searchType, setSearchType] = useState('Artist');
    const [header, setHeader] = useState(artistHeader);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if(searchType === artistType) {
            setHeader(artistHeader);
        } else {
            setHeader(songHeader);
        }

        dispatch({ type: types.SETMUSICSEARCH, MusicSearch: { }});
    }, [searchType])

    const handleArtistNameChange = (event: React.ChangeEvent<any>, { value }: any) => {
        dispatch({ type: types.SETMUSICSEARCH, MusicSearch: { ...MusicSearch, ArtistName: value }});
    }

    const handleSongNameChange = (event: React.ChangeEvent<any>, { value }: any) => {
        dispatch({ type: types.SETMUSICSEARCH, MusicSearch: { ...MusicSearch, SongName: value }});
    }

    const handleSearch = async () => {
        var response = null;

        setIsSearching(true);
        if(searchType === artistType) {
            response = await agent.Artist.search(MusicSearch.ArtistName);
        } else {
            response = await agent.Song.search(MusicSearch.ArtistName, MusicSearch.SongName);
        }
        setIsSearching(false);

        if(response === undefined) {
            toast.error("No results found");
            dispatch({ type: types.SETSONGSEARCHRESULTS, SongSearchResults: undefined});
        } else {
            if(searchType === artistType) {
                dispatch({ type: types.SETARTISTSEARCHRESULTS, ArtistSearchResults: response});
            } else {
                dispatch({ type: types.SETSONGSEARCHRESULTS, SongSearchResults: response});
            }
        }
    }

    const clearResults = () => {
        dispatch({ type: types.SETSONGSEARCHRESULTS, SongSearchResults: undefined});
        dispatch({ type: types.SETMUSICSEARCH, MusicSearch: { }});
    }
    
    return (
        <Fragment>
            <Grid celled>
                <Grid.Row>
                    <Grid.Column width='16'>
                        <Form>
                            <Form.Radio label='Search by Artist Name' checked={searchType === artistType} onClick={() => setSearchType(artistType)} />
                            <Form.Radio label='Search by Artist and Song Track Name' checked={searchType === songType} onClick={() => setSearchType(songType)} />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width='16'>
                        <Header textAlign='center' as="h2" content={header} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column stretched>
                        <Form style={{margin: '0 auto', width: '60%'}}>
                            <Form.Group>
                                <Form.Input width='16' label='Artist Name' value={MusicSearch.ArtistName ? MusicSearch.ArtistName : ''} name='ArtistName' onChange={handleArtistNameChange} />
                            </Form.Group>
                            {searchType === songType ?
                                <Fragment>
                                    <Form.Group>
                                        <Form.Input width='16' label='Song Track Name' value={MusicSearch.SongName ? MusicSearch.SongName : ''} name='SongName' onChange={handleSongNameChange} />
                                    </Form.Group>
                                </Fragment>
                            : <div/>}
                            <Form.Group widths='16'>
                                <Form.Button style={{marginTop: '15px'}} disabled={isSearching} loading={isSearching} positive onClick={handleSearch}>Search</Form.Button>
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {SongSearchResults || ArtistSearchResults ? 
                        <Button fluid negative content='Clear Results' onClick={clearResults} />
                        : <div/>
                    }
                </Grid.Row>
                <Grid.Row style={{marginTop: '20px'}}>
                    <Grid.Column width='16' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {SongSearchResults ? 
                            <SongResultsView />
                            : ArtistSearchResults ? 
                                <ArtistResultsView />
                                : <div/>    
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Fragment>
    )
}

export default LandingPage;