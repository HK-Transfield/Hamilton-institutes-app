import React from "react";
import './App.css';
import Landing from "./components/routes/Landing";
import Schedule from "./components/routes/Schedule"
import Why from "./components/routes/Information";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {DesktopHeader, MobileHeader} from "./components/Header";
import {DesktopFooter, MobileFooter} from "./components/Footer";

/**
 * Hamilton Institutes -- Main Application function
 * 
 * @version 1.0
 * @author [Harmon Transfield](https://github.com/ZaraDev-Tempest)
 */
const App = () => {
  return (
    <ViewportProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={() => 
            <LandingPage/>
          }/>
          <Route path="/course-schedule" exact component={() =>
            <Schedule
              header={<Header/>}
              footer={<Footer/>}
            />
          }/>
          <Route path="/why-institute" exact component={() =>
            <Why
              header={<Header/>}
              footer={<Footer/>}
            />
          }/>
        </Switch>
      </Router>   
    </ViewportProvider>
  );
}
export default App;

/*************************************************************************/

const viewportContext = React.createContext({});

const ViewportProvider = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={ width }>
      {children}
    </viewportContext.Provider>
  );
};

/**
 * retrieve screen width
 */
const useViewport = () => {
  const width = React.useContext(viewportContext);
  return width;
};

/*************************************************************************/

/**
 * responsive header UI
 */
const Header = () => {
  let width = useViewport();
  let breakpoint = 620;

  return width < breakpoint ? <MobileHeader/> : <DesktopHeader/>;
};

/**
 * responsive landing page UI
 */
const LandingPage = () => {
  let width = useViewport();
  let mobileBreakpoints = [620, 411, 375, 360, 320];

  return <Landing 
    width={width}
    breakpoints={mobileBreakpoints}
    header={<Header/>}
    footer={<Footer/>}
  />;
};

const Footer = () => {
  let width = useViewport();
  let breakpoint = 620;

  return width < breakpoint ? <MobileFooter/> : <DesktopFooter/>;
};

/*************************************************************************/