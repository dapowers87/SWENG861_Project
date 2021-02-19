import React, { Fragment, useContext } from 'react'
import { AppContext, IInitialState } from '../../../store';

const SongResultsView: React.FC = () => {

    const { state } = useContext(AppContext);
    const { SongSearchResults } = state as IInitialState;

    return (
        <Fragment>
            SongResultsView
        </Fragment>
    )
}

export default SongResultsView;