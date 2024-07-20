import React, { useEffect, useState } from 'react';
import HeaderNav from './header';
import './popup.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface PopupSegmentProps {
    onClose: () => void;
}
function PopupSegment({ onClose }: PopupSegmentProps) {
    const SCHEMA_DATA = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ];

    const [nameofSegment, setNameofSegment] = useState('');
    const [segmentList, setSegmentList] = useState<any[]>([]);
    const [selectvalue, setSelectedvalue] = useState('');
    const [segmentDropDown, setSegmentDropDown] = useState<any[]>([]);

    //set a schema list for newly added dropdown
    const handleSegmentDropdown = () => {
        if (selectvalue) {
            const selectedOption = SCHEMA_DATA.find((item) => item.value === selectvalue);
            if (selectedOption && !segmentList.some((item) => item.value === selectvalue)) {
                setSegmentList([...segmentList, selectedOption]);
                setSelectedvalue('');
            }
        }
    };

    //api calling 
    const handleSubmitdata =  async() => {
        const datalist = segmentList.map((option: any) => {
            let key = option.value;
            let ans = option.label;
            return { [key]: ans };
          });
    
        const dataObject:any = {
          "segment_name": nameofSegment,
          "schema": datalist
        };
    
        try {
          const response =  await axios?.post('/api', dataObject);
          toast.success(`Data sent successfully: ${JSON.stringify(response.data)}`);
          // Clear the form
          setSegmentList([]);
          setNameofSegment('');
        } catch (error) {
          toast.error(`Error sending data:, ${error}`);
        }
      };
//handling newly added dropdown values change
    const handleAddsegment = (index: number, value: string) => {
        const selectedOption = SCHEMA_DATA.find((item) => item.value === value);
        if (selectedOption) {
            const updatedSegmentList = [...segmentList];
            updatedSegmentList[index] = selectedOption;
            setSegmentList(updatedSegmentList);
        }
    };
//maping segment datalist to dropdown
    useEffect(() => {
        const dropDownOptions = SCHEMA_DATA.filter((option) =>
            !segmentList.some((item) => item.value === option.value)
        );
        setSegmentDropDown(dropDownOptions);
    }, [segmentList]);

    return (
        <div className='fullscreen ' style={{ zIndex: '3' }}>
            <div className='modal-container overflow model-view'>
                <HeaderNav navTeaxt='Saving Segment' />
                <div className='p-3'>
                    <div>
                        <h6>Enter the Name of the Segment</h6>
                        <form>
                            <input
                                className=''
                                type="text"
                                value={nameofSegment}
                                placeholder="Name of the segment"
                                onChange={(e) => setNameofSegment(e.target.value)}
                                style={{ width: "96%" }}
                            />
                        </form>
                    </div>
                    <p className='mt-3' style={{ fontSize: '16px' }}>To save your segment, you need to add the schemas to build the query</p>
                    <div className='mt-1 mb-1'>
                        <div className='d-flex align-items-center justify-content-end'>
                            <div className='mx-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="green" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8" />
                                </svg>
                                <span className='mx-2' style={{ fontSize: '16px' }}>User Tracks</span>
                            </div>
                            <div className='mx-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="#cf133b" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8" />
                                </svg>
                                <span className='mx-2' style={{ fontSize: '16px' }}>Group Tracks</span>
                            </div>
                        </div>
                    </div>
                    <form className={`${segmentList[0] ? 'border border-primary border-3 mt-1' : ""}`}>
                        {segmentList.map((option, index) => (
                            <div className='p-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill={`${index === 0 ? "green" : "#cf133b"}`} className="bi bi-circle-fill" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8" />
                                </svg>
                                <select
                                    className='p-2 m-1 rounded-0'
                                    key={index}
                                    value={option.value}
                                    onChange={(e) => handleAddsegment(index, e.target.value)}
                                    style={{ width: "80%" }}
                                >
                                    <option value="">{option.label}</option>
                                    {segmentDropDown.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                                <button disabled className='border border-0 rounded-0 p-2 m-1' style={{ backgroundColor: '#e5f0f8' }}>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                    </svg>

                                </button>
                            </div>

                        ))}
                    </form>
                    <form className='mt-1 p-1' >
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="#rgba(192, 198, 203, 0.4)" className="bi bi-circle-fill" viewBox="0 0 16 16">
                            <circle cx="8" cy="8" r="8" />
                        </svg>
                        <select
                            className='p-2 m-1 rounded-0'
                            value={selectvalue}
                            onChange={(e) => setSelectedvalue(e.target.value)}
                            style={{ width: "80%" }}
                        >
                            <option value="">{'Add schema to segment'}</option>
                            {segmentDropDown.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <button className='border border-0 rounded-0 p-2 m-1' style={{ backgroundColor: '#e5f0f8' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                    </svg>
                        </button>
                    </form>
                    <div>
                        <a href="#" onClick={handleSegmentDropdown}>+Add new schema </a>
                    </div>


                </div>

            </div>
            <div className='footer-modal'>
                <div className='footer-container m-3'>
                    <button className='border border-0 p-2 mx-1' style={{ background: "green", color: "white", borderRadius: "4px" }} onClick={handleSubmitdata}>save the segment</button>
                    <button className='border border-0 p-2 mx-1' style={{ background: "light", color: "red", borderRadius: "4px" }} onClick={onClose}>Close</button>
                </div>
            </div>
      <ToastContainer />
        </div>
    );
}

export default PopupSegment;
