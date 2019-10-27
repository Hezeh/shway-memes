import React, { Fragment } from 'react';
import './Aboutus.css'

const About = (props) => {
    return (
        <div>
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
                paragraph="We make your world more fun and elegant. Your next smile is just a click away!"
                heading="What do we do"      
            />
            <About 
                paragraph="Hezekiah Maina: Founder and CEO"
                heading="People"      
            />
        </Fragment>
    )
}

export default Aboutus;