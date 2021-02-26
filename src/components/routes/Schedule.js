import React from "react";
import "../styles/Schedule.css";
import GoogleMap from '../map/GoogleMap';
import { Switch, Router } from 'react-router-dom';
import { Tab, Header } from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import { courseTest } from '../CourseTest';
import { MultiTimeSlotTable, SingleTimeSlotTable } from '../TimetableFormat';


/**
 * The course selection page, allowing users to learn more about 
 * each course available.
 * 
 * @author [Harmon Transfield](https://github.com/ZaraDev-Tempest) 
 * @version 1.0
 */
export default class Schedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpened: false,
            loading: true,
            courses: [],
            whichViewToShow: "",
            currentViewedId: 0,
            open: false,
            currentOpenedTab: "hillcrest"
        };
        this.hillcrestCourses = [];
        this.wardStCourses = [];
        this.onlineCourses = [];
    };

    // make sure that the API is fetched before rendering the component
    async componentDidMount() {
        this.setState({courses: courseTest, loading: false});

        console.log("mounting...");

        // push each course to the appropriate array
        courseTest.map(course => {
            if(course.location.toString().toLowerCase() === 'hillcrest rd') {
                this.hillcrestCourses.push(course);
            } else if(course.location.toString().toLowerCase() === 'ward st') {
                this.wardStCourses.push(course);
            } else if(course.location.toString().toLowerCase() === 'online') {
                this.onlineCourses.push(course);
            }
        });
    };

    componentWillUnmount() {
        console.log("unmounting...")
    };

    render() {

        /**
         * @description Describes content that is found in each tab.
         */
        const panes =
            [
                {
                    // tab 1
                    menuItem: 'Hillcrest Rd',
                    render: () => <Tab.Pane attached={false} className="schedule-tabs">
                        <GoogleMap locationIndex={0}/>                   
                        <Header className="tab-header" as="h2">Day Classes</Header> 
                        <MultiTimeSlotTable
                            timeSlot1="11:10 am — 11:50 am"
                            timeSlot2="1:10 pm — 2:00 pm"
                            
                            timeOfDay="day"
                            courses={this.hillcrestCourses}
                        />
                   
            
                        
                        <Header className="tab-header" as="h2">Evening Classes</Header>
                        <SingleTimeSlotTable
                            timeSlot="6:00 pm — 7:00 pm"
                            timeOfDay="evening"
                            courses={this.hillcrestCourses}
                        />
                    </Tab.Pane>,
                },
                {
                    // tab 2
                    menuItem: 'Ward St',
                    render: () => <Tab.Pane attached={false} className="schedule-tabs">
                        <GoogleMap locationIndex={1}/>                     
                        <Header className="tab-header" as="h2">Day Classes</Header>
                        <SingleTimeSlotTable
                            timeSlot="12:10 pm — 1:00 pm"
                            timeOfDay="day"
                            courses={this.wardStCourses}
                        />
                        
                        <Header className="tab-header" as="h2">Evening Classes</Header>
                        <SingleTimeSlotTable
                            timeSlot="6:30 pm — 7:00 pm"
                            timeOfDay="evening"
                            courses={this.wardStCourses}
                        />
                    </Tab.Pane>,
                },
                {
                    // tab 3
                    menuItem: 'Online',
                    render: () => <Tab.Pane attached={false} className="schedule-tabs">Tab 1 Content</Tab.Pane>,
                }
            ];
        

        return (
            <div className="schedule">
                {this.props.header}
            
                <Tab  
                
                    menu={
                        { 
                            color: "grey",
                            inverted: true,
                            style: {
                                fontFamily: "'Titillium Web'",
                                fontSize: "17px",
                                borderRadius: "0px"
                            }
                        }
                    } 
                    panes={panes} 
                    
                />
        
                {this.props.footer}   
            </div>
        );
    };
};
