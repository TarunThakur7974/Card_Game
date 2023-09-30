import React from 'react'

const Restart = ({ score, bestScore }) => {
    return (
        <div>
            <h1 className='RestartContainer'>
                <div className="rebox">
                    <span><p>your Score : {score}</p> <p>Best Score : {bestScore}</p>
                        <button onClick={() => { window.location.reload() }}>Restart</button></span>
                </div>
            </h1>
        </div>
    )
}

export default Restart
