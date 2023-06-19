import {useState, useEffect, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Outlet} from 'react-router-dom'
import {PfImage} from '@profabric/react-components';

import ContentHeader from '../components/ContentHeader'
import { setWindowClass, addWindowClass, removeWindowClass } from '../utils/helpers'
import Header from '../modules/main/header/Header'
import Footer from '../modules/main/footer/Footer'
import MenuSidebar from '../modules/main/menu-sidebar/MenuSidebar'
import ControlSidebar from '../modules/main/control-sidebar/ControlSidebar'
import {toggleSidebarMenu} from '../store/reducers/ui';

export default function Root() {
  const dispatch = useDispatch()
  
  // Retrive user status from Reducer Store 
  const authentication = useSelector((state: any) => state.auth.authentication)
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  
  // Add AdminLTE CSS classes to Body tag
  setWindowClass('hold-transition sidebar-mini layout-fixed')
  
  // Reading all properties to control user interface appearance
  const screenSize = useSelector((state: any) => state.ui.screenSize)

  const controlSidebarCollapsed = useSelector(
    (state: any) => state.ui.controlSidebarCollapsed
  )

  const menuSidebarCollapsed = useSelector(
    (state: any) => state.ui.menuSidebarCollapsed
  )

  const handleToggleMenuSidebar = () => {
    dispatch(toggleSidebarMenu())
  }

  // Defines if user is authenticated or not.
  useEffect(() => {
    setIsAppLoaded(Boolean(authentication))
  }, [authentication])

  useEffect(() => {
    if (controlSidebarCollapsed) {
      removeWindowClass('control-sidebar-slide-open')
    } else {
      addWindowClass('control-sidebar-slide-open')
    }
  }, [screenSize, controlSidebarCollapsed])

  useEffect(() => {
    removeWindowClass('register-page')
    removeWindowClass('login-page')
    removeWindowClass('hold-transition')

    addWindowClass('sidebar-mini')

    // fetchProfile();
    return () => {
      removeWindowClass('sidebar-mini')
    };
  }, [])

  useEffect(() => {
    removeWindowClass('sidebar-closed')
    removeWindowClass('sidebar-collapse')
    removeWindowClass('sidebar-open')
    if (menuSidebarCollapsed && screenSize === 'lg') {
      addWindowClass('sidebar-collapse')
    } else if (menuSidebarCollapsed && screenSize === 'xs') {
      addWindowClass('sidebar-open')
    } else if (!menuSidebarCollapsed && screenSize !== 'lg') {
      addWindowClass('sidebar-closed')
      addWindowClass('sidebar-collapse')
    }
  }, [screenSize, menuSidebarCollapsed])

  const getAppTemplate = useCallback(() => {
    {/*}
    if (!isAppLoaded) {
      return (
        <div className="preloader flex-column justify-content-center align-items-center">
          <PfImage
            className="animation__shake"
            src="/img/logo.png"
            alt="AdminLTELogo"
            height={60}
            width={60}
          />
        </div>
      );
    }
  */}
    return (
      <>
        <Header />
        <MenuSidebar />
        <div
          id="sidebar-overlay"
          role="presentation"
          onClick={handleToggleMenuSidebar}
          onKeyDown={() => {}}
        />
        <ContentHeader title="Home" />
        <div className="content-wrapper">
          <div className="pt-3" />
          <section className="content">
            <Outlet />
          </section>
        </div>
        <Footer />
        <ControlSidebar />
      </>
      
    )
  }, [isAppLoaded]);

  return <div className="wrapper">{getAppTemplate()}</div>

}
