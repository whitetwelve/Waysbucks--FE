import React from 'react';
import bg1 from "../../assets/img/bg1.png"
import bg2 from "../../assets/img/bg2.png"
import bg3 from "../../assets/img/bg3.png"
import bg4 from "../../assets/img/bg4.png"
import "../../assets/css/Main.css"

const Background = () => {
    return (
        <>
            <div className="container">
                <div className="img-1st">
                    <img src={bg1} />
                </div>
                <div className="img-2nd">
                    <img src={bg2}/>
                </div>
                <div className="img-3rd">
                    <img src={bg3}/>
                </div>
                <div className="img-4th">
                    <img src={bg4}/>
                </div>
            </div>
        </>
    )
}

export default Background