import React from "react";
import "./styles/CourseThumbnail.css";
import "./styles/CourseModal.css";
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import HelmetMetaData from './HelmetMetaData';
import {FacebookShareButton, FacebookIcon} from "react-share";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";

export class CourseModal2 extends React.Component {
    constructor(props) {
        super(props);
    }
}

/**
 * 
 * @param {array} props.courses Courses available at each location
 * @version 1.0
 */
const CourseModal = (props) => {
    let { path, url } = useRouteMatch();
    const [clicked, setClicked] = React.useState(false);

    let courseModal = props.courses.map(course => {
        return(
           <div>
                <Link to={`${url}` + course.url}>
                    <CourseThumbnail
                        key={course.id} 
                        imgUrl={course.thumbnailURL}
                        title={course.title}
                        courseType={course.courseType}
                        onClick={() => setClicked(true)}
                    />
                </Link>
            
                <Route exact path={`${path}` + course.url} 
                    component={
                       <div>hi</div>
                //        <CreateCourseModal
                //        key={course.id}
                //        course={course}
                //        isClicked={clicked}
                //    />
                    }
                />
         
           </div>
        );
    });
    return courseModal;
} 
export default CourseModal;


/**
 * Determines what colour the top border will be, based on the course type
 * 
 * @param {string} courseType The type of course that is on offer
 * @returns {string} The colour of the border that will be displayed. Used in styles. 
 */
function setBarColor(courseType) {
    if(courseType.toString().toLowerCase() === "cornerstone course") 
        return "yellow";
    else if(courseType.toString().toLowerCase() === "primary elective")
        return "blue";
    else if(courseType.toString().toLowerCase() === "secondary elective")
        return "orange";
    else if(courseType.toString().toLowerCase() === " selected course outline")
        return "pink";
}


// https://blog.logrocket.com/building-a-modal-module-for-react-with-react-router/
/**
 * Generates the Modal node
 * 
 * @param {boolean} props.isClicked 
 * @param {object} param1 
 */
const CreateCourseModal = (props, {course}) => {
    const [open, setOpen] = React.useState(false);
    return(     
        <Modal
            className="modal-container"
            closeOnEscape={true}
            onClose={props.isClicked == false}
            onOpen={props.isClicked == true}
            open={props.isClicked}
            style={
                {
                    borderTop: "5px solid", 
                    borderColor: setBarColor(course.courseType)
                }
            }
        >
            <Modal.Header 
                style={
                    {
                        textAlign: "center",
                        fontSize: "25px", 
                        fontFamily:"'Libre Baskerville'"
                    }
                } 
                className="modal-header"
            >
                {course.title}
            </Modal.Header>
            <Image fluid={true} src="https://d3ewd3ysu1dfsj.cloudfront.net/images/stories/large/59523.jpg?1606777992"/>
            <Modal.Content>
                
                <Modal.Description style={{fontFamily: "Verdana"}}>
                    <Header>Teacher</Header>
                    <p>{course.teacher}</p>
                    
                    <Header>Description</Header>
                    <p>{course.description}</p>

                    <Header>Share this Course!</Header>
                    <HelmetMetaData></HelmetMetaData>
                    <FacebookShareButton 
                        url={"http://www.camperstribe.com"}
                        quote={"CampersTribe - World is yours to explore"}
                        hashtag="#camperstribe"
                        style={{marginRight: "10px"}}
                    >
                        <FacebookIcon size={36} />
                    </FacebookShareButton>
                    <FacebookShareButton 
                        url={"http://www.camperstribe.com"}
                        quote={"CampersTribe - World is yours to explore"}
                        hashtag="#camperstribe"
                        style={{marginRight: "10px"}}
                    >
                        <FacebookIcon size={36} />
                    </FacebookShareButton>
                </Modal.Description>
                
            </Modal.Content>
            <Modal.Actions>
                <Link to="/course-selection">
                    <Button color='black' onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </Link>
            </Modal.Actions>
        </Modal>        
    );
}


const CourseThumbnail = (props) => {
    return(
        <div className="course-thumbnail-container">
            <div className="course-type-bar" style={{backgroundColor: setBarColor(props.courseType)}}/>
            <img src={props.imgUrl} alt={props.title}/>
            <div className="title-container">
                <div className="title-grad"/>
                <div className="title-block">
                    <h6>{props.title}</h6>
                </div>
            </div>
        </div>
    );
}