import React, { useCallback } from 'react';

import IconButton from '@material-ui/core/IconButton';
import DarkmodeIcon from '@material-ui/icons/Brightness2';
import LightmodeIcon from '@material-ui/icons/Brightness5';
import { storeDarkmode, useDarkmode } from '../../utils/darkmode';

import s from './DarkmodeButton.module.scss';

export default function DarkmodeButton() {
    const isDarkmodeActive = useDarkmode();

    const handleButtonClick = useCallback(() => {
        storeDarkmode(!isDarkmodeActive);
    }, [isDarkmodeActive]);

    return (
        <IconButton aria-label="delete" onClick={handleButtonClick}>
            {!isDarkmodeActive && <DarkmodeIcon className={s.icon} />}
            {isDarkmodeActive && <LightmodeIcon className={s.icon} />}
        </IconButton>
    );
}
