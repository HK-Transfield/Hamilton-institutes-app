import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import './styles/Header.css';
// import 'semantic-ui-css/semantic.min.css';
import fbLogo from '../assets/img/vectors/facebook-square.svg';

/**
 * Used to store all links avaiable on the web app
 */
const navLinks = [
    {
        title: "Welcome",
        linkTo: "/"
    },
    {
        title: "Why Attend Institute?",
        linkTo: "/why-institute"
    },
    {
        title: "Course Schedules",
        linkTo: "/course-schedule"
    }
];

/**
 * This header bar will display on any desktop computer or mobile tablets.
 * It will show every page title on a clickable button.
 * 
 * @returns The DOM of the desktop header
 * @author HK Transfield
 */
export const DesktopHeader = () => {
    const [activeItem, setActiveItem] = useState('');

    // indicates which link the user click and sets the item as active
    const handleItemClick = (e, { name }) => setActiveItem(name); 

    const navLinksJsx = navLinks.map((navItem, i) => {
        return(
            <Link 
                to={navItem.linkTo} 
                key={navItem.linkTo}
                className="nav-items"
            >
                <Menu.Item
                    name={navItem.title}
                    active={activeItem === navItem.title}
                    onClick={handleItemClick}
                >
                    <p className="nav-link">
                    {navItem.title}
                    </p>
                </Menu.Item>
           </Link>
        );
    });

    return(
        <header>
            <Menu className="nav-bar">
                <Link className="nav-brand" to="/">
                    <Menu.Header>
                        HAMILTON INSTITUTES
                    </Menu.Header>
                </Link>
                    {navLinksJsx}
            </Menu>
        </header>  
    );
}

/****************************************************************************************************************************/

/**
 * When users access the website on any mobile phones. The navigation header
 * will be transformed into a hamburger style menu, which will dropdown with
 * links to all other pages.
 * 
 * @returns The DOM of the mobile header
 * @author HK Transfield
 */
export const MobileHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => setMenuOpen(!menuOpen);   // opens/closes the hamburger menu
    const handleLinkClick = () => setMenuOpen(false);       // closes the menu when a linked is clicked

    // generate approriate nodes for each navigation item
    const navLinksJsx = navLinks.map((navLink, i)=>{
        return (
           <Link to={navLink.linkTo}>
                <MenuItem 
                    key={navLink.title} 
                    delay={`${i * 0.1}s`}
                    onClick={()=>{handleLinkClick();}}>
                        {navLink.title}
                </MenuItem>
           </Link>
        );
    });

    return(
        <div>
            <div className="hamburger-container">
                <OpenMenuButton open={menuOpen} onClick={()=>handleMenuClick()} color='white'/>
                <div className="mobile-logo">HAMILTON INSTITUTES</div>
            </div>
            <HamburgerMenu open={menuOpen}>
                {navLinksJsx}

                {/* Decided to add only the Facebook link here,
                as the footer did not look that good */}
                <MenuItem 
                    delay={`${4 * 0.1}s`}
                    onClick={()=>{handleLinkClick();}}
                >
                    <a href="https://www.facebook.com/groups/135365039879698/">
                        {/* <p>Facebook Group <img className="hamburger-icon" src={fbLogo} alt="Facebook Logo"/></p> */}
                        <p>Facebook Group</p>
                    </a>
                </MenuItem>
            </HamburgerMenu>
        </div>
    );
}
  
/**
 * Each link on the web application will be given a clickable item that will
 * appear when the user opens the hamburger menu
 * 
 * @param {int} props.delay             Used for delayling the animation so that menu items appear one after the other
 * @param {function} props.onClick      The user has clicked on the menu item
 * @param {Node} props.children         The name will contain the relevant information for the link
 * @returns The MenuItem node, which can then be added to the hamburger menu
 */
const MenuItem = ({delay, onClick, children}) => {
    return(
        <div className="menu-item-container" style={{animationDelay:delay}}>
            <div 
                className="menu-item"
                style={{animationDelay:delay}} 
                onClick={onClick}
            >
                {children}  
            </div>
            <div className="menu-item-line" style={{animationDelay:delay}}/>
        </div>  
    );  
};
  
/**
 * 
 * @param {*} param0 
 * @returns 
 */
const HamburgerMenu = ({open, children}) => {
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        if (open !== openMenu)
            setOpenMenu(open);
    }, [open, openMenu]);

    return(
        <div className="menu-container" style={{height: openMenu ? '100%':0}}>
          {
            openMenu ?
              <div className="menu-list">
                {children}
              </div> : null
          }
        </div>
      );
}

/**
 * When using a mobile device, a hamburger menu button
 * will appear at the top left corner of the screen
 * 
 * @param {boolean} props.open Indicates if the menu has been opened
 * @param {string} props.color The color of the button
 * @param {function} props.onClick The user has clicked the button
 * @returns The OpenMenuButton node, which can be used in the mobile header
 */
const OpenMenuButton = ({open, color, onClick}) => {
    const [openMenu, setOpenMenu] = useState(open ? open : false);
    const [colorMenu, setColorMenu] = useState(color ? color : 'black');

    useEffect(() => {
        if (open !== openMenu)
            setOpenMenu(open);

        if (color !== null)
            setColorMenu(color);

    }, [open, color, openMenu, colorMenu]);
    
    // controls if the menu is opened or not
    const handleClick = () => setOpenMenu(!openMenu);

    // syles for the button to open the menu
    const styles = {
        line: {
            height: '2px',
            width: '20px',
            background: colorMenu,
            transition: 'all 0.2s ease',
        },
        lineTop: {
            transform: openMenu ? 'rotate(45deg)':'none',
            transformOrigin: 'top left',
            marginBottom: '5px',
        },
        lineMiddle: {
            opacity: openMenu ? 0: 1,
            transform: openMenu ? 'translateX(-16px)':'none',
        },
        lineBottom: {
            transform: openMenu ? 'translateX(-1px) rotate(-45deg)':'none',
            transformOrigin: 'top left',
            marginTop: '5px',
        },       
    }

    return(
        <div
            className="menu-button-container"
            onClick={onClick ? onClick : () => handleClick()}
        >
            <div style={{...styles.line,...styles.lineTop}}/>
            <div style={{...styles.line,...styles.lineMiddle}}/>
            <div style={{...styles.line,...styles.lineBottom}}/>
        </div>
    ); 
}

