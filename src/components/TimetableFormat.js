import React from 'react';
import { withRouter } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import CourseModal  from "./CourseViews";
import './styles/TimetableFormat.css';

// used to determine when courses take place
const daysArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];


/**
 * Generates a course modal from an array of courses
 * 
 * @param {array} courses The array of all courses availible, which will be displayed.
 * @param {string} day  The day of the week when the course takes place.
 * @param {string} startTime The time that the course is expected to start.
 * 
 * @returns The interactive course modal node to display in the timetable.
 */
const courseModal = (courses, day, startTime) => {
    const courseModalNode = courses.map(course => {
        return (course.dayOfWeek === day && course.startTime === startTime ?
            <CourseModal key={course.id} course={course}/> : null)
    });
    return courseModalNode;
}


/****************************************************************************************************************************/


/**
 * Defines the timetable header row, displaying the days of week.
 * 
 * @param {string} timeOfDay Determines what colour the row will be.
 */
const daysOfWeekRow = (timeOfDay) => {
    let rowStyle = 
        {
            color: "white",
            backgroundImage: 
                timeOfDay === "day" ? "linear-gradient(#21467a 100%, #37217a 100%)" : 
                timeOfDay === "evening" ? "linear-gradient(#4a4a4a 100%, #2b2b2b 100%)" : 
                null,
            border: "5px solid white"
            
        }

    let daysOfWeekTableRowJsx = daysArray.map(day => {
        return(
            <Table.HeaderCell textAlign="center" key={day} style={rowStyle}>
                {day}
            </Table.HeaderCell>
        );
    });

    return(
        <Table.Row>
            <Table.HeaderCell 
                textAlign="center" 
                style={
                    {
                        color: "white",
                        backgroundImage: "linear-gradient(45deg, #ff8c8c 0%, #c72171 52%, #ff0066 100%)",
                        border: "5px solid white"
                    }
                }
            >
                Time
            </Table.HeaderCell>
            {daysOfWeekTableRowJsx}
        </Table.Row>
    );
}


/**
 * Defines each row in the timetable, displaying courses on that day.
 * 
 * @param {array} courses 
 * @param {string} startTime 
 * @param {string} timeOfDay 
 */
const courseRow = (courses, startTime, timeOfDay) => {
    const courseRowJsx = daysArray.map((day, i) => {
        return(
            <Table.Cell 
                key={day} 
                textAlign="center"
                style={
                    {
                        backgroundColor: 
                            timeOfDay === "day" ? "#9dcad4" : 
                            timeOfDay === "evening" ? "#adadad" : 
                            null,
                        border: "5px solid white"
                    }
                }
            >
                {courseModal(courses, day, startTime)}
            </Table.Cell>
        );
    });
    return(courseRowJsx);
}


/****************************************************************************************************************************/


/**
 * Describes a multiline timetable
 * 
 * @param {string} props.courses
 * @param {string} props.timeSlot1
 * @param {string} props.timeSlot2 
 */
export const MultiTimeSlotTable = (props) => {
    const courses = props.courses;
    const timeOfDay = props.timeOfDay;
    const timeSlot1 = props.timeSlot1;
    const timeSlot2 = props.timeSlot2;
    const startTime1 = timeSlot1.substring(0, 5).trim();
    const startTime2 = timeSlot2.substring(0, 5).trim();

    return(
        <div className="table-container">
            <Table
                style={
                    {
                        backgroundColor: 
                            timeOfDay === "day" ? "#ffc8d6" : 
                            timeOfDay === "evening" ? "#ffc8d6" : 
                            null
                    }
                }
                celled 
                padded 
                unstackable={true}
                className="timetable"
            >
                <Table.Header>
                    {daysOfWeekRow(timeOfDay)}   
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.HeaderCell style={{border: "5px solid white"}} textAlign="center">{timeSlot1}</Table.HeaderCell>
                        {courseRow(courses, startTime1, timeOfDay)}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell style={{border: "5px solid white"}} textAlign="center">{timeSlot2}</Table.HeaderCell>
                        {courseRow(courses, startTime2, timeOfDay)}
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}


/**
 * 
 */
export const SingleTimeSlotTable = (props) => {
    const courses = props.courses;
    const timeOfDay = props.timeOfDay;
    const timeSlot = props.timeSlot;
    const startTime = timeSlot.substring(0, 5).trim();

    return(
        <div className="table-container">
            <Table 
                style={
                    {
                        backgroundColor: 
                            timeOfDay === "day" ? "#ffc8d6" : 
                            timeOfDay === "evening" ? "#ffc8d6" : 
                            null,
                    }
                }
                celled 
                padded 
                unstackable={true}
                className="timetable"
            >
                <Table.Header>
                    {daysOfWeekRow(timeOfDay)}    
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.HeaderCell style={{border: "5px solid white"}} textAlign="center">{timeSlot}</Table.HeaderCell>
                        {courseRow(courses, startTime, timeOfDay)}
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}