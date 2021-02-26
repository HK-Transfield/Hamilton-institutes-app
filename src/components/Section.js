import React, { useState } from "react";
import './styles/Section.css';
import VisibilitySensor from "react-visibility-sensor";
import { useSpring, animated } from "react-spring";
import { Link } from 'react-router-dom';

// store all infomation displayed in the page here
const landingPageInfo = [
    {
        headerText: "Experience the Gospel of Jesus Christ.",
        imgURL: "https://assets.ldscdn.org/8e/b4/8eb42a72fdf3cb361476e3e1ba1b29b6b288c867/general_conference_tablet.jpeg",
        imgAlt: "Gospel of Jesus Christ Art",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
        headerText: "Connect with Other Young Adults.",
        imgURL: "https://assets.ldscdn.org/8e/b4/8eb42a72fdf3cb361476e3e1ba1b29b6b288c867/general_conference_tablet.jpeg",
        imgAlt: "Young single adults connecting",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
        headerText: "Ready to get started? See what courses are on offer!",
        buttonText: "Select Courses"
    }
];


/**
 * @description Animates an element to fade in when within viewport
 * 
 * @param {bool} props.isVisible        Checks whether the element has appeared in the viewport
 * @param {element} props.children      The element to be animated    
 */
const FadeInDirection = ({ isVisible, children }) => {
    const animation = useSpring({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(50px)",
        //transitionDuration: "1s",
    });
    return <animated.div style={animation}>{children}</animated.div>;
};

/**
 * @description
 * 
 * @param {element} props.children  The element to be animated
 */
export const FadeInContainer = ({ children }) => {
    const [isVisible, setVisibility] = useState(false);

    const onChange = visiblity => {
        visiblity && setVisibility(visiblity);
    };

    return (
        <VisibilitySensor onChange={onChange}>
            <FadeInDirection isVisible={isVisible}>{children}</FadeInDirection>
        </VisibilitySensor>
    );
};


/**
 * @description Simple component that displays title, text, and and image
 * 
 * @param   {bool} props.setAlignment   Set whether to align the image on the left or right
 * @param   {int} props.index           Used to display the appropriate information, depending on index
 */
const Section = (props) => {
    const alignment = {
        alignRight: {
            float: "right"
        },
        alignLeft: {
            float: "left",
            marginRight: "20px"
        },
        alignCenter: {
            float: "none"
        }
    }

    return(
        <div className="section-container">
            <div 
                className="img-container" 
                style={props.setAlignment ? alignment.alignLeft : alignment.alignRight}
            >
                <FadeInContainer>
                    <img 
                        src={landingPageInfo[props.index].imgURL} 
                        alt={landingPageInfo[props.index].imgAlt}
                    />
                </FadeInContainer>
            </div>
            <FadeInContainer>
                <h3 className="section-header">
                    {landingPageInfo[props.index].headerText}
                </h3>
            </FadeInContainer>
            <br/>
            <FadeInContainer>
                <p className="section-text">
                    {landingPageInfo[props.index].text}
                </p>
            </FadeInContainer>           
        </div>
    );
};
export default Section;


/**
 * @description Displays a button that will take users to the course selection page
 */
export const SectionBottom = () => {
    return(
            <div className="section-bottom">
                <FadeInContainer>
                    <h4 style={{color: "white"}} className="section-header">{landingPageInfo[2].headerText}</h4>
                </FadeInContainer>
                <FadeInContainer>
                    <Link to="/course-schedule">
                        <button 
                            className="section-bottom-button"
                        >
                            {landingPageInfo[2].buttonText}
                        </button>
                    </Link>
                </FadeInContainer>
        </div>
    );
};