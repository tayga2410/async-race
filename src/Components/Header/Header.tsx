import React from 'react';
import './header.css';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <h1 className="header__title">{title}</h1>
);

export default Header;
