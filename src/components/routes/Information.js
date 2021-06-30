import React from "react";

/**
 * This page will eventually display more detailed information
 * about what Institute is, quotes from leaders of the church
 * and a welcome from the institute directors.
 * 
 * @param {Element} props.header
 * @param {Element} props.footer 
 * @returns The Information component node
 * 
 * @author HK Transfield
 */
const Information = ({header, footer}) => {
    return(
        <div>
            {header}
            <p>Hello there, this page will eventually get updated.</p>
            {footer}
        </div>
    );
}
export default Information;