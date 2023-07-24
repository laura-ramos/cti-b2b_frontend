/* eslint-disable no-unused-vars */
import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {PfCheckbox, PfSelect} from '@profabric/react-components';

import {
  setNavbarVariant,
  setSidebarSkin,
  toggleDarkMode,
  toggleFooterFixed,
  toggleHeaderBorder,
  toggleHeaderFixed,
  toggleLayoutBoxed,
  toggleLayoutFixed,
  toggleMenuChildIndent,
  toggleMenuItemFlat,
  toggleSidebarMenu,
} from '../../../store/reducers/ui'
import {
  NAVBAR_DARK_VARIANTS,
  NAVBAR_LIGHT_VARIANTS,
  SIDEBAR_DARK_SKINS,
  SIDEBAR_LIGHT_SKINS
} from '../../../utils/themes'
import useScrollPosition from '../../../hooks/useScrollPosition';
import { Button, Form } from 'react-bootstrap'

const ControlSidebar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: any) => state.ui.darkMode);
  const headerBorder = useSelector((state: any) => state.ui.headerBorder);
  const headerFixed = useSelector((state: any) => state.ui.headerFixed);
  const footerFixed = useSelector((state: any) => state.ui.footerFixed);
  const navbarVariant = useSelector((state: any) => state.ui.navbarVariant);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const layoutBoxed = useSelector((state: any) => state.ui.layoutBoxed);
  const layoutFixed = useSelector((state: any) => state.ui.layoutFixed);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);
  const menuSidebarCollapsed = useSelector(
    (state: any) => state.ui.menuSidebarCollapsed
  );
  const ui = useSelector((state: any) => state.ui);
  const scrollPosition = useScrollPosition();

  const handleDarkModeChange = () => {
    dispatch(toggleDarkMode());
  };

  const handleHeaderBorderChange = () => {
    dispatch(toggleHeaderBorder());
  };

  const handleHeaderFixedChange = () => {
    dispatch(toggleHeaderFixed());
  };

  const handleFooterFixedChange = () => {
    dispatch(toggleFooterFixed());
  };

  const handleLayoutBoxedChange = () => {
    dispatch(toggleLayoutBoxed());
  };

  const handleLayoutFixedChange = () => {
    dispatch(toggleLayoutFixed());
  };

  const onNavbarVariantChange = (value: string) => {
    dispatch(setNavbarVariant(value));
  };

  const onSidebarSkinChange = (value: string) => {
    dispatch(setSidebarSkin(value));
  };

  const handleMenuItemFlatChange = () => {
    dispatch(toggleMenuItemFlat());
  };

  const handleMenuChildIndentChange = () => {
    dispatch(toggleMenuChildIndent());
  };

  const handleMenuSidebarCollapsed = () => {
    dispatch(toggleSidebarMenu());
  };

  const getContainerPaddingTop = useCallback(() => {
    if (headerFixed) {
      return `${16 - (scrollPosition <= 16 ? scrollPosition : 0)}px`;
    }
    return `${73 - (scrollPosition <= 57 ? scrollPosition : 57)}px`;
  }, [scrollPosition, headerFixed]);

  const saveCustomize = () => {
    window.localStorage.setItem("ui-customize", JSON.stringify(ui));
  };

  const resetCustomize = () => {
    window.localStorage.removeItem("ui-customize");
  };
  
  return (
    <aside
      className="control-sidebar control-sidebar-dark"
      style={{
        top: 0,
        bottom: footerFixed ? '57px' : '0px',
        padding: `${getContainerPaddingTop()} 16px 16px 16px`,
        overflowY: 'scroll'
      }}
    >
      <h5>Customize AdminLTE</h5>
      <div className='text-center'>
        <Button variant="light" onClick={saveCustomize} className='mr-2'>Save</Button>
        <Button variant="dark"  onClick={resetCustomize}>Reset</Button>
      </div>
      <hr className="mb-2" />

      <div style={{padding: '8px 0'}}>
        <div className="mb-4">
          <Form.Check type='switch' label="Dark mode" checked={darkMode} onChange={handleDarkModeChange}/>
          <Form.Check label="Boxed (Broken when header or footer is fixed)" checked={layoutBoxed} onChange={handleLayoutBoxedChange}/>
        </div>

        <h6>Header Options</h6>

        <div className="mb-4">
          <Form.Check label="Fixed" checked={headerFixed} onChange={handleHeaderFixedChange}/>
          <Form.Check label="No Border"
            checked={headerBorder}
            onChange={handleHeaderBorderChange}/>
        </div>

        <h6>Sidebar Options</h6>

        <div className="mb-4">
          <Form.Check
            label="Collapse"
            checked={menuSidebarCollapsed}
            onChange={handleMenuSidebarCollapsed}
          />
          <Form.Check label="Fixed" checked={layoutFixed} onChange={handleLayoutFixedChange}/>
          <Form.Check
            label="Nav Flat Style"
            checked={menuItemFlat}
            onChange={handleMenuItemFlatChange}
          />
          <Form.Check
            label="Nav Child Indent"
            checked={menuChildIndent}
            onChange={handleMenuChildIndentChange}
          />
        </div>

        <h6>Footer Options</h6>

        <div className="mb-4">
          <Form.Check label="Fixed" checked={footerFixed} onChange={handleFooterFixedChange}/>
        </div>

        <h6>Light Navbar Variants</h6>
        <Form.Select className="form-control" value={navbarVariant} onChange={(e: any) => onNavbarVariantChange(e.target.value)}>
          {NAVBAR_LIGHT_VARIANTS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
        <h6>Dark Navbar Variants</h6>
        <Form.Select className="form-control" value={navbarVariant} onChange={(e: any) => onNavbarVariantChange(e.target.value)}>
          {NAVBAR_DARK_VARIANTS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>

        <PfSelect
          className="mt-3"
          label="Accent Color Variants"
          options={[]}
          type="custom"
          disabled
        />

        <h6>Light Sidebar Variants</h6>
        <Form.Select className="form-control" value={sidebarSkin} onChange={(e: any) => onSidebarSkinChange(e.target.value)}>
          {SIDEBAR_LIGHT_SKINS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>

        <h6>Dark Sidebar Variants</h6>
        <Form.Select className="form-control" value={sidebarSkin} onChange={(e: any) => onSidebarSkinChange(e.target.value)}>
          {SIDEBAR_DARK_SKINS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>

        <PfSelect
          className="mt-3"
          label="Brand Logo Variants"
          options={[]}
          type="custom"
          disabled
        />
      </div>
    </aside>
  );
};

export default ControlSidebar;
