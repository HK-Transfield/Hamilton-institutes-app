import React from "react";
import "../styles/Selection.css";
import CourseModal  from "../CourseViews";
import GoogleMap from '../map/GoogleMap';
import { Switch, Router } from 'react-router-dom';
import { Tab, Header } from 'semantic-ui-react';
import ReactDOM from 'react-dom';

/***************************************************************************************/

/**
 * Used to test the layout and the functions of the website.
 * Will replace it with an API when ready.
 */
const courseTest = [
    {
        id: 1,
        title: "Christ and the Everlasting Gospel",
        location: "Ward St",
        courseType: "Cornerstone Course",
        teacher: "Brother Skux",
        day: "Wednesday",
        startTime: "",
        thumbnailURL: "https://assets.ldscdn.org/c9/e3/c9e3fede4d3d3f40d5d116264f40cfea1badfd6f/jesus_last_supper.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
        url:"/christ-and-the-everlasting-gospel"
    },
    {
        id: 2,
        title: "Book of Mormon Book Club",
        location: "Hillcrest Rd",
        courseType: "Primary Elective",
        teacher: "Sister Stud",
       
        thumbnailURL: "https://assets.ldscdn.org/2d/9f/2d9f8689e00d4b026e9f68f531605176634e7dba/brass_plates_book_of_mormon_visual_library.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
        url:"/bom-book-club"
    }
];

/***************************************************************************************/


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
                        <hr/>
                        <CourseModal courses={this.hillcrestCourses}/>
                        <Header className="tab-header" as="h2">Evening Classes</Header>
                        <hr/>
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
                
                <Tab panes={panes}/>
        
                {this.props.footer}   
            </div>
        );
    };
};
