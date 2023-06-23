import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {toggleControlSidebar, toggleSidebarMenu} from '../../../store/reducers/ui'
import MessagesDropdown from './submenus-dropdown/MessagesDropdown'
import NotificationsDropdown from './submenus-dropdown/NotificationsDropdown'
import LanguagesDropdown from './submenus-dropdown/LanguagesDropdown';

const Header = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch()
  const navbarVariant = useSelector((state: any) => state.ui.navbarVariant)
  const headerBorder = useSelector((state: any) => state.ui.headerBorder)

  const getContainerClasses = useCallback(() => {
    let classes = `main-header navbar navbar-expand ${navbarVariant}`
    if (headerBorder) {
      classes = `${classes} border-bottom-0`
    }
    return classes;
  }, [navbarVariant, headerBorder])

  const handleToggleMenuSidebar = () => {
    dispatch(toggleSidebarMenu())
  }

  const handleToggleControlSidebar = () => {
    dispatch(toggleControlSidebar());
  };

  return (
    <nav className={getContainerClasses()}>
      
      {/* Groups the left side items of the navigation bar */}
      <ul className="navbar-nav">
        {/* This section shows or hide the menu sidebar */}
        <li className="nav-item">
          <button
            onClick={handleToggleMenuSidebar}
            type="button"
            className="nav-link"
          >
            <i className="fas fa-bars" />
          </button>
        </li>

        {/* Redirects to root page */}
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="nav-link">
            {t<string>('header.label.home')}
          </Link>
        </li>

        {/* Redirects to root page. Needs review */}
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="nav-link">
            {t<string>('header.label.contact')}
          </Link>
        </li>
      </ul>

      {/* Groups the right side items of the navigation bar.
        * Here, all elements have submenus
        */}
      <ul className="navbar-nav ml-auto">
        <MessagesDropdown />
        <NotificationsDropdown />
        <LanguagesDropdown />
        <li className="nav-item">
          <button
            type="button"
            className="nav-link"
            onClick={handleToggleControlSidebar}
          >
            <i className="fas fa-th-large" />
          </button>
        </li>
      </ul>
    </nav>
  )

}

export default Header
