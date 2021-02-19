import React, { Fragment, useContext } from 'react'
import { AppContext, IInitialState } from '../../../store';

const ArtistResultsView: React.FC = () => {

    const { state } = useContext(AppContext);
    const { ArtistSearchResults } = state as IInitialState;
    
    if(!ArtistSearchResults) {
        return <div/>
    }

    return (
        <Fragment>
            ArtistResultsView
        </Fragment>
    )
}

export default ArtistResultsView;