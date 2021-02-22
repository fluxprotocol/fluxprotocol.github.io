import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import PendingMarketsOverviewConnector from '../../../../connectors/PendingMarketsOverviewConnector';
import trans from '../../../../translation/trans';


export default function PendingPage(): ReactElement {
    return (
        <section>
            <Helmet>
                <title>
                    {trans('marketResolution.title.head', {
                        appName: trans('global.appName'),
                    })}
                </title>
            </Helmet>
            <PendingMarketsOverviewConnector />
        </section>
    );
}
