import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { PfDropdown, PfImage } from '@profabric/react-components';
import { setAuthentication } from '../../../../store/reducers/auth';

const StyledSmallUserImage = styled(PfImage)`
  margin-top: 2px;
`;

const StyledBigUserImage = styled(PfImage)`
`;

const UserHeader = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 175px;
  padding: 10px;
  img {
    z-index: 5;
    height: 90px;
    width: 90px;
    padding: 3px;
    border: 3px solid #adb5bd;
  }
  p {
    z-index: 5;
    font-size: 17px;
    margin-top: 10px;
    small {
      display: block;
      font-size: 12px;
    }
  }
`;

const UserBody = styled.li`
  padding: 15px;
`;

const UserFooter = styled.li`
  padding: 10px;
`;

export const StyledDropdown = styled(PfDropdown)`
  border: none;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  --pf-dropdown-menu-min-width: 280px;
`;

declare const FB: any;

const UserDropdown = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const authentication = useSelector((state: any) => state.auth.authentication);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logOut = async (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    dispatch(setAuthentication(undefined));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navigateToProfile = (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    navigate('/profile');
  };

  return (
    <StyledDropdown isOpen={dropdownOpen} hideArrow>
      <StyledSmallUserImage
        slot="button"
        src={authentication.profile.picture}
        fallbackSrc="/img/user.png"
        alt="User"
        width={25}
        height={25}
        rounded
      />
      <div slot="menu" className='header-submenu'>
        <UserHeader className="bg-primary">
          <StyledBigUserImage
            src={authentication.profile.picture}
            fallbackSrc="/img/user.png"
            alt="User"
            width={90}
            height={90}
            rounded
          />
          <p>
            {authentication.profile.login}
            <small>
              <span>Member since </span>
              <span>
                {/* {DateTime.fromISO(user.createdAt).toFormat('dd LLL yyyy')} */}
              </span>
            </small>
          </p>
        </UserHeader>
        <UserBody className='border-top border-bottom'>
          <div className="row">
            <div className="col-4 text-center">
              <Link to="/">{t<string>('header.user.followers')}</Link>
            </div>
            <div className="col-4 text-center">
              <Link to="/">{t<string>('header.user.sales')}</Link>
            </div>
            <div className="col-4 text-center">
              <Link to="/">{t<string>('header.user.friends')}</Link>
            </div>
          </div>
        </UserBody>
        <UserFooter>
          <button
            type="button"
            className="btn btn-default btn-flat"
            onClick={navigateToProfile}
          >
            {t<string>('header.user.profile')}
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-flat float-right"
            onClick={logOut}
          >
            {t<string>('login.button.signOut')}
          </button>
        </UserFooter>
      </div>
    </StyledDropdown>
  );
};

export default UserDropdown;
