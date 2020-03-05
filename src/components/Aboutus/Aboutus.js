import React, { Fragment } from 'react';
import './Aboutus.css'

const About = (props) => {
    return (
        <div className="root">
            <h1 className="heading">{props.heading}</h1>
            <p className="paragraph-styling">
                  {props.paragraph}
            </p>
        </div>
    )
}

const Aboutus = () => {
    return (
        <Fragment>
            <About 
                paragraph="We are a community driven platform for sharing memes"
                heading="What do we do"      
            />
            <About 
                paragraph="Hezekiah: Founder"
                heading="Key People"      
            />
        </Fragment>
    )
}

export default Aboutus;