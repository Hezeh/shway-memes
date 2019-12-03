import React from 'react';
import './Policy.css'

const communityGuidelines = [ 
    {
        id: 1,
        content: "We are an encourage open discussions. Let's do more of that."
    },
    {
        id: 2,
        content: "Laughing is cool. Let's do more of that."
    },
    {
        id: 3,
        content: "We have a condenscending feeling towards politics. Let's do less of that."
    },
    {
        id: 4,
        content: " We are a community that allows diverse topics. Let's do more of that."
    },
    {
        id: 5,
        content: "We understand that people are opinionated about various topics. Be cool with others."
    },
    {
        id: 6,
        content: "We have a really young generation. We are still learning."
    },
    {
        id: 7,
        content: "Gangster Points are shway. Let's earn more."
    },
    {
        id: 8,
        content: "We like really cool memes. Let's do more of that."
    },
    {
        id: 9,
        content: "Stay smart. Be cool"
    },
]

const Policy = () => {
    return (
        <React.Fragment>
            <div className="heading">
                <h1>Site Policy</h1>
            </div>
            <div className="paragraph-styling">
                {communityGuidelines.map((guide) => (
                   <p key={guide.id}>{guide.content}</p>
                ))}
            </div>
        </React.Fragment>
    )
}

export default Policy;