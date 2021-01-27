import React, { FormEvent, ReactElement, useState } from "react";
import classnames from 'classnames';
import { Link } from "react-router-dom";
import MuiMenu from '@material-ui/core/Menu';
import MuiMenuItem from '@material-ui/core/MenuItem';

import fluxLogoBlack from '../../assets/images/flux-logo-black.svg';
import fluxLogoWhite from '../../assets/images/flux-logo-white.svg';
import { useDarkModeThemeContext } from "../../utils/hooks/useDarkModeTheme";
import Button from "../../components/Button";
import trans from "../../translation/trans";
import { Account } from "../../models/Account";

import s from './Menu.module.scss';
import { formatCollateralToken } from "../../services/CollateralTokenService";
interface Props {
    className?: string;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onProfileClick: () => void;
    account: Account | null;
}

export default function Menu({
    onLoginClick,
    onLogoutClick,
    onProfileClick,
    account,
    className = ''
}: Props): ReactElement {
    const { theme } = useDarkModeThemeContext();
    const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null);

    function handleMenuClick(event: FormEvent) {
        setMenuAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setMenuAnchorEl(null);
    }

    function handleLogoutClick() {
        handleMenuClose();
        onLogoutClick();
    }

    function handleProfileClick() {
        handleMenuClose();
        onProfileClick();
    }

    return (
        <header className={classnames(s.menu, className)}>
            <div className={s.menu__items}>
                <div className={s.menu__item}>
                    <Link to="/">
                        <img
                            className={s.menu__logo}
                            src={theme === 'light' ? fluxLogoBlack : fluxLogoWhite}
                            alt="Flux home"
                        />
                    </Link>
                </div>
                <div className={s.menu__item} />
                <div className={classnames(s.menu__item, s['menu__last-item'])}>
                    {account === null && (
                        <Button onClick={onLoginClick}>{trans('auth.login')}</Button>
                    )}

                    {account && (
                        <>
                            <Button onClick={handleMenuClick} className={s.accountMenuButton}>
                                {account.accountId}
                            </Button>
                            <MuiMenu anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
                                <MuiMenuItem disabled>NEAR: {formatCollateralToken(account.balance, 24)} Ⓝ</MuiMenuItem>
                                <MuiMenuItem onClick={handleProfileClick}>Profile</MuiMenuItem>
                                <MuiMenuItem onClick={handleLogoutClick}>Logout</MuiMenuItem>
                            </MuiMenu>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
