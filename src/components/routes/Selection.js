import React from "react";
import "../styles/Selection.css";
import CourseModal  from "../CourseViews";
import GoogleMap from '../map/GoogleMap';
import { Switch, Router } from 'react-router-dom';
import { Tab, Header, Table } from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import { courseTest } from '../CourseTest';


/**
 * The course selection page, allowing users to learn more about 
 * each course available.
 * 
 * @author [Harmon Transfield](https://github.com/ZaraDev-Tempest) 
 * @version 1.0
 */
export default class Selection extends React.Component {

    constructor(props) {
        super(props);
        this.displayCourseInformation = this.displayCourseInformation.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.updateCurrentViewedId = this.updateCurrentViewedId.bind(this);
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

    displayCourseInformation() {
        console.log("clicked");
    };

    handleOpenModal() {
        this.setState({ modalOpened: true });
      };
      
    handleCloseModal() {
        this.setState({ modalOpened: false, currentViewedId: 0 });
    };
    
    updateCurrentViewedId (id) {
        this.setState({currentViewedId: id});
    }
    
    render() {

        /**
         * @description Describes content that is found in each tab.
         */
        const panes =
            [
                {
                    // tab 1
                    menuItem: 'Hillcrest Rd',
                    render: () => <Tab.Pane attached={false}>
                        {/* <GoogleMap locationIndex={0}/>                    */}
                        <Header className="tab-header" as="h2">Day Classes</Header>
                        
                        <div className="table-container">
                            <Table
                                stackable={false}
                                color="red" 
                                celled 
                                padded 
                                style={{fontFamily: "'verdana'"}}
                            >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell textAlign="center">Time</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Monday</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Tuesday</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Wednesday</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Thursday</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Friday</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {/* classes from 11:10am - 11:50am at Hillcrest Rd */}
                                    <Table.Row>
                                        <Table.HeaderCell textAlign="center">11:10 am — 11:50 am</Table.HeaderCell>
                                        <Table.Cell textAlign="center">
                                            <div>
                                                <CourseModal courses={this.hillcrestCourses}/>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <div>
                                                <CourseModal courses={this.hillcrestCourses}/>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell textAlign="center"></Table.Cell>
                                        <Table.Cell textAlign="center"></Table.Cell>
                                        <Table.Cell textAlign="center"></Table.Cell>
                                    </Table.Row>
                                    
                                    {/* classes from 1:10pm - 2:00pm at Hillcrest Rd */}
                                    <Table.Row>
                                        <Table.HeaderCell textAlign="center">1:10 pm — 2:00 pm</Table.HeaderCell>
                                        <Table.Cell textAlign="center"></Table.Cell>
                                        <Table.Cell textAlign="center">
                                        <div>
                                                <CourseModal courses={this.hillcrestCourses}/>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell textAlign="center"></Table.Cell>
                                        <Table.Cell textAlign="center"></Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <div>
                                                <CourseModal courses={this.hillcrestCourses}/>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </div>
            
                        
                        <Header className="tab-header" as="h2">Evening Classes</Header>
                        <Table color="violet" celled padded style={{overflowX: "auto"}}>
                            <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Time</Table.HeaderCell>
                                        <Table.HeaderCell>Monday</Table.HeaderCell>
                                        <Table.HeaderCell>Tuesday</Table.HeaderCell>
                                        <Table.HeaderCell>Wednesday</Table.HeaderCell>
                                        <Table.HeaderCell>Thursday</Table.HeaderCell>
                                        <Table.HeaderCell>Friday</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {/* classes from 6:00 pm - 7:00 pm at Hillcrest Rd */}
                                    <Table.Row>
                                        <Table.HeaderCell>6:00 pm — 7:00 pm</Table.HeaderCell>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell></Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                    </Tab.Pane>,
                },
                {
                    // tab 2
                    menuItem: 'Ward St',
                    render: () => <Tab.Pane attached={false}>
                        {/* <GoogleMap locationIndex={1}/>                      */}
                        <Header className="tab-header" as="h2">Day Classes</Header>
                        <hr/>
                        <CourseModal courses={this.wardStCourses}/>
                        <Header className="tab-header" as="h2">Evening Classes</Header>
                        <hr/>
                    </Tab.Pane>,
                },
                {
                    // tab 3
                    menuItem: 'Online',
                    render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
                }
            ];
        

        return (
            <div className="selection">
                {this.props.header}
                
                <Tab className="selection-tabs" panes={panes}/>
        
                {/*this.props.footer*/}   
            </div>
        );
    };
};
