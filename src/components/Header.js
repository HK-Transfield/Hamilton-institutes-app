import React from "react";
import { Link } from "react-router-dom";
import { Menu as DesktopMenu } from 'semantic-ui-react';
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
        title: "Why Institute?",
        linkTo: "/why-institute"
    },
    {
        title: "Course Selection",
        linkTo: "/course-selection"
    }
];


export class DesktopHeader extends React.Component { 
    state={};
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    
    render() {
        const { activeItem } = this.state;

        const navLinksJsx = navLinks.map((navItem, i) => {
            return(
                <Link 
                    to={navItem.linkTo} 
                    key={navItem.linkTo}
                >
                    <DesktopMenu.Item
                        name={navItem.title}
                        active={activeItem === navItem.title}
                        onClick={this.handleItemClick}
                        className="desktop-item"
                    >
                        {navItem.title}
                    </DesktopMenu.Item>
               </Link>
            );
        });
    
        return (
            <header>
                <DesktopMenu 
                    style={
                        {
                            backgroundColor: "e00748",
                            height: "60px"
                        }
                    }>
                    <Link className="nav-brand" to="/">
                        <DesktopMenu.Header>
                            HAMILTON INSTITUTES
                        </DesktopMenu.Header>
                    </Link>
                       {navLinksJsx}
                </DesktopMenu>
            </header>     
        );
    }
}


export class MobileHeader extends React.Component {
    constructor(props){
        super(props);
        this.state={
            menuOpen:false,
        }
    }
    
    handleMenuClick() {
        this.setState({menuOpen:!this.state.menuOpen});
    }
    
    handleLinkClick() {
        this.setState({menuOpen: false});
    }
    
    render(){
        const navLinksJsx = navLinks.map((navLink, i)=>{
            return (
               <Link to={navLink.linkTo}>
                    <MenuItem 
                        key={navLink.title} 
                        delay={`${i * 0.1}s`}
                        onClick={()=>{this.handleLinkClick();}}>
                            {navLink.title}
                    </MenuItem>
               </Link>
            );
        });
      
      return(
        <div>
          <div className="hamburger-container">
            <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='white'/>
            <div className="mobile-logo">HAMILTON INSTITUTES</div>
          </div>
          <Menu open={this.state.menuOpen}>
            {navLinksJsx}

            {/* Decided to add only the Facebook link here,
            as the footer did not look that good */}
            <MenuItem 
             delay={`${4 * 0.1}s`}
             onClick={()=>{this.handleLinkClick();}}
             >
                <a href="https://www.facebook.com/groups/135365039879698/">
                    <p>Facebook Group <img className="hamburger-icon" src={fbLogo} alt="Facebook Logo"/></p>
                </a>
            
            </MenuItem>
          </Menu>
        </div>
      );
    };
};
  


  /* MenuItem.jsx*/
const MenuItem = (props) => {
    return(
        <div className="menu-item-container" style={{animationDelay:props.delay}}>
            <div 
            className="menu-item"
            style={{animationDelay:props.delay}} 
            onClick={props.onClick}
            >
            {props.children}  
            </div>
        <div className="menu-item-line" style={{animationDelay:props.delay,}}/>
        </div>  
    );  
};
  

  /* Menu.jsx */
class Menu extends React.Component {
    constructor(props){
      super(props);
      this.state={
        open: this.props.open? this.props.open:false,
      }
    }
      
    static getDerivedStateFromProps(props, state) {
        if(props.open !== state.open)
            return({open:props.open});
    }
    
    render(){
      return(
        <div className="menu-container" style={{height: this.state.open ? '100%':0}}>
          {
            this.state.open?
              <div className="menu-list">
                {this.props.children}
              </div>:null
          }
        </div>
      )
    }
}

  /* MenuButton.jsx */
class MenuButton extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open: this.props.open? this.props.open:false,
            color: this.props.color? this.props.color:'black',
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.open !== state.open)
            return({open:props.open});
    }
    
    handleClick(){
        this.setState({open:!this.state.open});
    }
    
    render(){
        const styles = {
            line: {
                height: '2px',
                width: '20px',
                background: this.state.color,
                transition: 'all 0.2s ease',
            },
            lineTop: {
                transform: this.state.open ? 'rotate(45deg)':'none',
                transformOrigin: 'top left',
                marginBottom: '5px',
            },
            lineMiddle: {
                opacity: this.state.open ? 0: 1,
                transform: this.state.open ? 'translateX(-16px)':'none',
            },
            lineBottom: {
                transform: this.state.open ? 'translateX(-1px) rotate(-45deg)':'none',
                transformOrigin: 'top left',
                marginTop: '5px',
            },       
        }
        return(
            <div
                className="menu-button-container"
                onClick={this.props.onClick ? this.props.onClick: 
                    ()=> {
                        this.handleClick();
                    }
                }
            >
                <div style={{...styles.line,...styles.lineTop}}/>
                <div style={{...styles.line,...styles.lineMiddle}}/>
                <div style={{...styles.line,...styles.lineBottom}}/>
            </div>
        ); 
    };
};