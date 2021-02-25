import React, { ReactElement } from 'react';
import trans from '../../translation/trans';
import s from './Overview.module.scss';

interface KeyValue {
    key: String,
    value: String
}

interface Props {
    data: KeyValue[]
}

export default function Overview({data}: Props): ReactElement {
    return (
        <div className={s['overview__container']}>
            <div className={s['overview-header']}>
                <span>{trans('market.label.overview', {}, true)}</span>
            </div>
            <div className={s['overview']}>
                {
                    data.map((d, i) => (
                        <div key={i} className={s['overview__info-row']}>
                            <span className={s['overview__info-key']}>{d.key}</span>
                            <span className={s['overview__info-value']}>{d.value}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
