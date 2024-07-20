import React, { useState } from 'react'
import PopupSegment from './popup-segment'
import HeaderNav from './header'
import './segment.css'
function Segment() {
    const [isPopup, setIsPopup] = useState<boolean>(false)
    const handlePopupsegmentOpen = () => {
        setIsPopup(true)
    }
    const handlePopupsegmentClose = () => {
        setIsPopup(false)
    };
    return (
        <div className='fullscreen overflow'>
            <div className='flex-container'>
                <button className='p-2 mx-3 border border-2' style={{ zIndex: '3', backgroundColor: ' rgba(80, 73, 73, 0.38)', color: 'white', borderColor: '#efe7e7' }} onClick={handlePopupsegmentOpen}>Save Segment</button>

            </div>
            {isPopup === true && <PopupSegment onClose={handlePopupsegmentClose} />}
        </div>
    )
}

export default Segment