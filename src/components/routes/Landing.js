import React from "react";
import '../styles/Landing.css';
import ImageSlider from "../ImageSlider";
import DoubleArrow from '../../assets/img/vectors/icon-arrows.svg';
import Section, {SectionBottom} from "../Section";
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons';

/**
 *  Hamilton Institutes — landing page
 * 
 * @version 1.0
 * @author [Harmon Transfield](https://github.com/ZaraDev-Tempest)
 */
export default class Landing extends React.Component {
    render() {
        let currentScreenWidth = this.props.width;
        let desktopBreakpoint =  1600;      
        let mobileBreakpoints = {
            general: this.props.breakpoints[0], // 620
            pixel: this.props.breakpoints[1],   // 411
            galaxy: this.props.breakpoints[2],  // 360
            iPhoneX: this.props.breakpoints[3], // 375
            iPhoneSE: this.props.breakpoints[4] // 320
        };                    
        
        return (
            <Parallax 
                ref={ref => (React.parallax = ref)} 
                pages={
                    currentScreenWidth === mobileBreakpoints.general ? 2.6
                    : currentScreenWidth === mobileBreakpoints.pixel ? 2.3
                    : currentScreenWidth === mobileBreakpoints.galaxy ? 0
                    : currentScreenWidth === mobileBreakpoints.iPhoneX ? 0
                    : currentScreenWidth === mobileBreakpoints.iPhoneSE ? 2.7
                    : currentScreenWidth === desktopBreakpoint ? 2.9
                    : 2.8                                              
                }
            >
                {/*IMAGE SLIDER*/}
                <ParallaxLayer 
                    offset={0} 
                    speed={0.2}
                >
                    <ImageSlider/>  
                </ParallaxLayer>

                {/*BOTTOM BACKGROUND IMAGE*/}
                <ParallaxLayer 
                    offset={
                        currentScreenWidth === mobileBreakpoints.general ? 1.4
                        : currentScreenWidth === mobileBreakpoints.pixel ? 1
                        : currentScreenWidth === mobileBreakpoints.galaxy ? 0
                        : currentScreenWidth === mobileBreakpoints.iPhoneX ? 0
                        : currentScreenWidth === mobileBreakpoints.iPhoneSE ? 1.5
                        : currentScreenWidth === desktopBreakpoint ? 1.9
                        : 1.95
                    } 
                    speed={0.4}
                    factor={1.2}
                >
                    <div className="landing-bottom"></div>
                </ParallaxLayer>

                {/*FOOTER*/}
                <ParallaxLayer 
                    offset={
                        currentScreenWidth === mobileBreakpoints.general ? 2.37
                        : currentScreenWidth === mobileBreakpoints.pixel ? 2.12
                        : currentScreenWidth === mobileBreakpoints.galaxy ? 0
                        : currentScreenWidth === mobileBreakpoints.iPhoneX ? 2.0
                        : currentScreenWidth === mobileBreakpoints.iPhoneSE ? 2.4
                        : currentScreenWidth === desktopBreakpoint ? 1.9
                        : 1.801
                    } 
                    speed={0}
                >
                    {this.props.footer}
                </ParallaxLayer>

                {/*BOTTOM SECTION WITH BUTTON*/}
                <ParallaxLayer 
                    offset={
                        currentScreenWidth === mobileBreakpoints.general ? 1.9
                        : currentScreenWidth === mobileBreakpoints.pixel ? 1.6
                        : currentScreenWidth === mobileBreakpoints.galaxy ? 0
                        : currentScreenWidth === mobileBreakpoints.iPhoneX ? 0
                        : currentScreenWidth === mobileBreakpoints.iPhoneSE ? 1.9
                        : currentScreenWidth === desktopBreakpoint ? 0
                        : 2.2

                    }
                    speed={0.1}
                >
                    <SectionBottom/>  
                </ParallaxLayer>

                {/*MIDDLE SECTION WITH CONTENT*/}
                <ParallaxLayer 
                    offset={
                        currentScreenWidth === mobileBreakpoints.general ? 0.1
                        : currentScreenWidth === mobileBreakpoints.pixel ? 0.18
                        : currentScreenWidth === mobileBreakpoints.galaxy ? 0
                        : currentScreenWidth === mobileBreakpoints.iPhoneX ? 0
                        : currentScreenWidth === mobileBreakpoints.iPhoneSE ? 0
                        : currentScreenWidth === desktopBreakpoint ? 0
                        : 0.39
                    } 
                    speed={1.0}
                >
                    <div className="landing-mid-container" preserveAspectRatio="none">
                        <div className="icon-container">
                            <img className="icon-arrow" src={DoubleArrow} alt="double arrow icon"/>
                        </div>
                        <Section setAlignment={true} index={0}/>
                        <Section setAlignment={false} index={1}/>
                    </div>
                </ParallaxLayer>

                {/*NAVIGATION BAR*/}
                <ParallaxLayer
                    offset={0} 
                    speed={0.2}
                >
                    {this.props.header}
                </ParallaxLayer>
            </Parallax>
        );
    };
};