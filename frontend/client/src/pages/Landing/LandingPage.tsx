import React, { Fragment, useContext } from 'react'
import { Divider, Form, Grid, Header } from 'semantic-ui-react'
import { AppContext, IInitialState, types } from '../../store';

const LandingPage: React.FC = () => {

    const { state, dispatch } = useContext(AppContext);
    const { MusicSearch } = state as IInitialState;

    const handleArtistNameChange = (event: React.ChangeEvent<any>, { value }: any) => {
        dispatch({ type: types.SETMUSICSEARCH, MusicSearch: { ArtistName: value, SongName: '' }});
    }

    const handleSongNameChange = (event: React.ChangeEvent<any>, { value }: any) => {
        dispatch({ type: types.SETMUSICSEARCH, MusicSearch: { SongName: value, ArtistName: '' }});
    }

    const handleSearch = () => {

    }
    
    return (
        <Fragment>
            <Grid celled>
                <Grid.Row>
                    <Grid.Column width='16'>
                        <Header textAlign='center' as="h2">Enter an Artist's Name OR Song Name</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column stretched>
                        <Form style={{margin: '0 auto', width: '60%'}}>
                            <Form.Group>
                                <Form.Input width='16' label='Artist Name' value={MusicSearch.ArtistName} name='ArtistName' onChange={handleArtistNameChange} />
                            </Form.Group>
                            <Divider horizontal content='OR' />
                            <Form.Group>
                                <Form.Input width='16' label='Song Name' value={MusicSearch.SongName} name='SongName' onChange={handleSongNameChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Button positive onClick={handleSearch}>Search</Form.Button>
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
           
            </Grid>
        </Fragment>
    )
}

export default LandingPage;