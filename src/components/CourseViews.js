import React, { useState } from "react";
import "./styles/CourseThumbnail.css";
import "./styles/CourseModal.css";
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import HelmetMetaData from './HelmetMetaData';
import {
    FacebookShareButton, 
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    EmailShareButton,
    EmailIcon,
} from "react-share";
import { ModalContainer, ModalRoute } from 'react-router-modal';
import {
    BrowserRouter as Router,
    useRouteMatch,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation,
    useParams
} from "react-router-dom";


/**
 * 
 * @param {array} props.courses Courses available at each location
 * @version 1.0
 */
const CourseModal = (props) => {
    const [clicked, setClicked] = React.useState(false);
    let {path, url} = useRouteMatch();
    let location = useLocation();

    let courseModal = props.courses.map(course => {
        return(
           <div>
                <CreateCourseModal
                    key={course.id}
                    course={course}
                />
                {/* <Link 
                    to={`/course-selection${course.url}`}
                    // onClick={() => setClicked(true)}
                >
                    <CourseThumbnail
                        key={course.id} 
                        imgUrl={course.thumbnailURL}
                        title={course.title}
                        courseType={course.courseType}
                    />
                </Link>
                <Route exact 
                    path={"/course-selection/:id"} 
                    children={ 
                        <CreateCourseModal
                            key={course.id}
                            course={course}
                            isClicked={true}
                        />
                    }
                /> */}
         
           </div>
        );
    });
    return courseModal;
} 
export default CourseModal;


// https://blog.logrocket.com/building-a-modal-module-for-react-with-react-router/
/**
 * Generates the Modal node
 * 
 * @param {boolean} props.isClicked 
 * @param {object} param1 
 */
const CreateCourseModal = (props) => {
    /*
    The modal inside semantic-ui-react has a boolean open prop. Once you 
    define that prop you are overriding the internal state that is 
    controlled on the Modal component out of the box.

    You'll need to control the open state of the component yourself to 
    achieve this. You will need to get a parameter from your route that 
    specifies whether the modal is open. If that parameter is present you 
    can set the modal as open. If it is not present, you can set it as 
    closed.

    You will also need to handle the closing of the modal since it is not 
    internal to the Modal component anymore. Probably the easiest way would 
    be to set an onClick event on the close button that will push the router 
    history to the previous step. Or you can push to somewhere else if you 
    prefer to go elsewhere.

    You can pass in a node (not just a string) on the closeIcon prop where 
    you could actually define your own button and the click event that does 
    the router push.
    */
    const [open, setOpen] = React.useState(false);
    
    let history = useHistory();

    let back = e => {
        setOpen(false)
        //e.stopPropagation();
        //history.goBack();
    };

    return(     
        <Modal
            className="modal-container"
            closeOnEscape={true}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <div>
                    <CourseThumbnail
                        key={props.course.id} 
                        imgUrl={props.course.thumbnailURL}
                        title={props.course.title}
                        courseType={props.course.courseType}  
                    />
                </div>
            }
            style={
                {
                    borderTop: "5px solid", 
                    borderColor: setBarColor(props.course.courseType)
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
                {props.course.title}
            </Modal.Header>
            <Image fluid={true} src="https://d3ewd3ysu1dfsj.cloudfront.net/images/stories/large/59523.jpg?1606777992"/>
            <Modal.Content>
                
                <Modal.Description style={{fontFamily: "Verdana"}}>
                    <Header>Teacher</Header>
                    <p>{props.course.teacher}</p>
                    
                    <Header>Description</Header>
                    <p>{props.course.description}</p>

                    <Header>Share this Course!</Header>
                    <HelmetMetaData></HelmetMetaData>
                    {/* <SocialMediaButtons/> */}
                </Modal.Description>
                <FacebookShareButton 
                    url={"http://www.camperstribe.com"}
                    quote={""}
                    hashtag="#"    
                >
                    <FacebookIcon size={36} />
                </FacebookShareButton>
                <WhatsappShareButton
                    url={"http://www.camperstribe.com"}
                >
                    <WhatsappIcon size={36} />
                </WhatsappShareButton>
            </Modal.Content>
            <Modal.Actions>
                <Link to="/course-selection">
                    <Button color='black' onClick={back}>
                        Close
                    </Button>
                </Link>
            </Modal.Actions>
        </Modal>        
    );
}


/**
 * Generate a thumbnail node, display summarizec information of the course.
 * 
 * @param {string} props.title The title of the course offered
 * @param {string} props.imgUrl Image URL associated with the course
 */
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