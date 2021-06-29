import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import './styles/Header.css';
// import 'semantic-ui-css/semantic.min.css';
import fbLogo from '../assets/img/vectors/facebook-square.svg';

// store menu items
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


export const DesktopHeader = () => {
    const [activeItem, setActiveItem] = useState('');

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


export const MobileHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => setMenuOpen(!menuOpen);
    const handleLinkClick = () => setMenuOpen(false);

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
                <MenuButton open={menuOpen} onClick={()=>handleMenuClick()} color='white'/>
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
                        <p>Facebook Group <img className="hamburger-icon" src={fbLogo} alt="Facebook Logo"/></p>
                    </a>
                </MenuItem>
            </HamburgerMenu>
        </div>
    );
}
  


  /* MenuItem.jsx*/
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
  

//   /* Menu.jsx */
// class HambsurgerMenu extends React.Component {
//     constructor(props){
//       super(props);
//       this.state={
//         open: this.props.open? this.props.open:false,
//       }
//     }
      
//     static getDerivedStateFromProps(props, state) {
//         if(props.open !== state.open)
//             return({open:props.open});
//     }
    
//     render(){
//       return(
//         <div className="menu-container" style={{height: this.state.open ? '100%':0}}>
//           {
//             this.state.open?
//               <div className="menu-list">
//                 {this.props.children}
//               </div>:null
//           }
//         </div>
//       )
//     }
// }

const HamburgerMenu = (props) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (props.open !== open)
            setOpen(props.open);
    }, [props, open]);

    return(
        <div className="menu-container" style={{height: open ? '100%':0}}>
          {
            open ?
              <div className="menu-list">
                {props.children}
              </div> : null
          }
        </div>
      );
}

  /* MenuButton.jsx */
  const MenuButton = (props) => {
    const [open, setOpen] = useState(props.open ? props.open : false);
    const [color, setColor] = useState(props.color ? props.color : 'black');

    useEffect(() => {
        if (props.open !== open)
            setOpen(props.open);

        if (props.color)
            setColor(props.color);
            
    }, [props, open, color]);

    const handleClick = () => setOpen(!open);

    const styles = {
        line: {
            height: '2px',
            width: '20px',
            background: color,
            transition: 'all 0.2s ease',
        },
        lineTop: {
            transform: open ? 'rotate(45deg)':'none',
            transformOrigin: 'top left',
            marginBottom: '5px',
        },
        lineMiddle: {
            opacity: open ? 0: 1,
            transform: open ? 'translateX(-16px)':'none',
        },
        lineBottom: {
            transform: open ? 'translateX(-1px) rotate(-45deg)':'none',
            transformOrigin: 'top left',
            marginTop: '5px',
        },       
    }

    return(
        <div
            className="menu-button-container"
            onClick={props.onClick ? props.onClick: 
                ()=> {
                    handleClick();
                }
            }
        >
            <div style={{...styles.line,...styles.lineTop}}/>
            <div style={{...styles.line,...styles.lineMiddle}}/>
            <div style={{...styles.line,...styles.lineBottom}}/>
        </div>
    ); 
}

