import React from "react";
import './styles/Footer.css';
import Logo from '../assets/img/vectors/HIWA-logo-full.svg';
import fbLogo from '../assets/img/vectors/facebook-square.svg';
import courseLogo from '../assets/img/vectors/syllabus.svg';
import moroniLogo from '../assets/img/vectors/angel-moroni.svg';
import handsLogo from '../assets/img/vectors/helping-hands.svg';
import {
    Container,
    Grid,
    Header,
    List,
    Segment,
  } from 'semantic-ui-react';

const footerLinks = [

    {
        id: "church link",
        href: "https://www.churchofjesuschrist.org/",
        imgSrc: moroniLogo,
        imgAlt: "Angel Moroni Icon",
        title: "The Church of Jesus Christ of Latter-day Saints"
    },
    {
        id: "missionary link",
        href: "https://www.comeuntochrist.org/",
        imgSrc: handsLogo,
        imgAlt: "Hands reaching out; love",
        title: "ComeUntoChrist.org"
    },
    {
        id:"MyInstitute link",
        href: "https://myinstitute.churchofjesuschrist.org/home",
        imgSrc: courseLogo,
        imgAlt: "Official MyInstitute",
        title: "MyInstitute"
    },
    {
        id: "Facebook link",
        href: "https://www.facebook.com/groups/135365039879698/",
        imgSrc: fbLogo,
        imgAlt: "Facebook Logo",
        title: "Connect with us on Facebook!"
    }
    
];


function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
};


const footerLinksJsx = footerLinks.map(footerLink => {
    return(   
        <List.Item key={footerLink.id}>
            <a href={footerLink.href}>
                <p><img className="icon" src={footerLink.imgSrc} alt={footerLink.imgAlt}/> {footerLink.title}</p>
            </a>
        </List.Item>
    );
});


/**
 * Footer that will display on wider sized screens
 * 
 * @author [Harmon Transfield](https://github.com/ZaraDev-Tempest)
 * @version 1.0
 */
export const DesktopFooter = () => {
    return(
        <footer className="desktop-footer-container">
           <Segment inverted vertical className="segment-style">
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Column width={7} textAlign='center' style={{marginRight: "5em"}}>
                            <img className="logo" src={Logo} alt="Hamilton Institutes Logo"/>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header inverted as='h3' content='Links' size='large'/>
                            <List link inverted>
                                {footerLinksJsx}
                            </List>
                        </Grid.Column>
                    </Grid>
                </Container>
                <Container className="footer-copyright text-center py-3">
                    <p>
                        &copy; {new Date().getFullYear()} Copyright by ZaraDev, Harmon Transfield
                    </p>
                </Container>
            </Segment>
        </footer>
    );
};


/**
 * Footer that will display on all mobile screens
 * 
 * @author [Harmon Transfield](https://github.com/ZaraDev-Tempest)
 * @version 1.0
 */
export const MobileFooter = () => {
    return(
        <footer className="mobile-footer-container">
            <img className="logo" src={Logo} alt="Hamilton Institutes Logo"/>
            <div className="footer-copyright text-center py-3">
            &copy; {new Date().getFullYear()} Copyright by ZaraDev, Harmon Transfield
            </div>
        </footer>
    );
};

