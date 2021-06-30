import React, { useState, useEffect } from "react";
import "../styles/Schedule.css";
import GoogleMap from '../map/GoogleMap';
import { Switch, Router } from 'react-router-dom';
import { Tab, Header } from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import { MultiTimeSlotTable, SingleTimeSlotTable } from '../TimetableFormat';


/**
 * The course schedule page, allowing users to learn more about 
 * each course available for the semester. Users can view
 * both locations, and even view a map of where classes are.
 * 
 * @param {Element} header Web application navigation bar
 * @param {Element} footer Web application footer bar
 * @returns The completed Schedule node
 * 
 * @author [HK Transfield](https://github.com/HK-Transfield) 
 * @version 2.0
 */
const Schedule = ({header, footer}) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [showView, setShowView] = useState('');
    const [currentTab, setCurrentTab] = useState('hillcrest');
    const [courses, setCourses] = useState([]);

    /**
     * Retrieve course data from the server
     */
    useEffect(() => {
        fetch('./data.json')
        .then(res => res.json())
        .then(result => setCourses([...result])) 
        
        setLoading(false);
    }, []);

    // component WillUnmount in hooks?

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
                        courses={
                            courses.filter(course => course.location.toString().toLowerCase() === 'hillcrest rd')
                        }
                    />
                    <Header className="tab-header" as="h2">Evening Classes</Header>
                    <SingleTimeSlotTable
                        timeSlot="6:00 pm — 7:00 pm"
                        timeOfDay="evening"
                        courses={
                            courses.filter(course => course.location.toString().toLowerCase() === 'hillcrest rd')
                        }
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
                        courses={
                            courses.filter(course => course.location.toString().toLowerCase() === 'ward st')
                        }
                    />
                    <Header className="tab-header" as="h2">Evening Classes</Header>
                    <SingleTimeSlotTable
                        timeSlot="6:30 pm — 7:00 pm"
                        timeOfDay="evening"
                        courses={
                            courses.filter(course => course.location.toString().toLowerCase() === 'ward st')
                        }
                    />
                </Tab.Pane>,
            }
        ];

    return (
        <div className="schedule">
            {header}
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
            {footer}   
        </div>
    );
}
export default Schedule;