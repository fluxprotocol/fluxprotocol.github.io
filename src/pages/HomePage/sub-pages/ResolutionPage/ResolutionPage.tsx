import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import FinalizedMarketsOverviewConnector from '../../../../connectors/FinalizedMarketsOverviewConnector';
import trans from '../../../../translation/trans';


export default function ResolutionPage(): ReactElement {
    return (
        <section>
            <Helmet>
                <title>
                    {trans('marketResolution.title.head', {
                        appName: trans('global.appName'),
                    })}
                </title>
            </Helmet>
            <FinalizedMarketsOverviewConnector />
        </section>
    );
}
