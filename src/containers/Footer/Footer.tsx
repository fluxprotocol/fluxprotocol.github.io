import React from 'react';

import twitterLogo from '../../assets/images/icons/twitter_logo.png';
import telegramLogo from '../../assets/images/icons/telegram_logo.png';

import s from './Footer.module.scss';


export default function Footer() {
    return (
        <footer className={s.root}>
            <div className={s.wrapper}>
                <div className={s.logo} />
                <div className={s.socials}>
                    <a href="https://twitter.com/fluxprotocol" className={s.social} rel="noopener noreferrer" target="_blank" >
                        <img src={twitterLogo} alt="Twitter page" />
                    </a>
                    <a href="https://t.me/fluxprotocol" className={s.social} rel="noopener noreferrer" target="_blank" >
                        <img src={telegramLogo} alt="Telegram group" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
