import React from 'react';
import { Header, Table } from 'semantic-ui-react';
import CourseModal  from "./CourseViews";

const courseModal = (courses, day, startTime) => {
    const courseModalNode = courses.map(course => {
        return (course.dayOfWeek === day && course.startTime === startTime ?
            <CourseModal course={course}/> : null)
    });
    return courseModalNode;
}

const daysOfWeekTableRow = <Table.Row>
    <Table.HeaderCell textAlign="center">Time</Table.HeaderCell>
    <Table.HeaderCell textAlign="center">Monday</Table.HeaderCell>
    <Table.HeaderCell textAlign="center">Tuesday</Table.HeaderCell>
    <Table.HeaderCell textAlign="center">Wednesday</Table.HeaderCell>
    <Table.HeaderCell textAlign="center">Thursday</Table.HeaderCell>
    <Table.HeaderCell textAlign="center">Friday</Table.HeaderCell>
</Table.Row>

export const MultiTimeSlotTable = (props) => {
    const courses = props.courses;
    const timeSlot1 = props.timeSlot1;
    const timeSlot2 = props.timeSlot2;
    const startTime1 = timeSlot1.substring(0, 5);
    const startTime2 = timeSlot2.substring(0, 5);

    return(
        <Table
            color={
                props.timeOfDay === "day" ? "red" : 
                props.timeOfDay === "evening" ? "violet" : 
                null
            } 
            celled 
            padded 
            style={{fontFamily: "'verdana'"}}
            className="table-container"
        >
            <Table.Header>
                {daysOfWeekTableRow}    
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.HeaderCell textAlign="center">{timeSlot1}</Table.HeaderCell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Monday", startTime1.trim())}</Table.Cell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Tuesday", startTime1.trim())}</Table.Cell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Wednesday", startTime1.trim())}</Table.Cell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Thursday", startTime1.trim())}</Table.Cell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Friday", startTime1.trim())}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell textAlign="center">{timeSlot2}</Table.HeaderCell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Monday", startTime2.trim())}</Table.Cell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Tuesday", startTime2.trim())}</Table.Cell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Wednesday", startTime2.trim())}</Table.Cell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Thursday", startTime2.trim())}</Table.Cell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Friday", startTime2.trim())}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}

/**
 * 
 */
export const SingleTimeSlotTable = (props) => {
    const courses = props.courses;
    const timeSlot = props.timeSlot;
    const startTime = timeSlot.substring(0, 5);

    return(
        <Table 
            color={
                props.timeOfDay === "day" ? "red" : 
                props.timeOfDay === "evening" ? "violet" : 
                null
            }  
            celled 
            padded 
            style={{fontFamily: "'verdana'"}}
        >
            <Table.Header>
                {daysOfWeekTableRow}    
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.HeaderCell textAlign="center">{timeSlot}</Table.HeaderCell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Monday", startTime.trim())}</Table.Cell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Tuesday", startTime.trim())}</Table.Cell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Wednesday", startTime.trim())}</Table.Cell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Thursday", startTime.trim())}</Table.Cell>
                    <Table.Cell textAlign="center">{courseModal(courses, "Friday", startTime.trim())}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}