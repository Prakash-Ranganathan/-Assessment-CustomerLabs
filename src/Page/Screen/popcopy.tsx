import React, { useCallback, useEffect, useState } from 'react'

function PopupSegment() {
    const schema: any = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ]


    const [nameofSegment, setNameofSegment] = useState<any>('')
    const [segmentList, setSegmentList] = useState<any>([])
    const [selectvalue, setSelectedvalue] = useState<any>('')
    const [segmentDropDown, setSegmentDropDown] = useState<any>()

    const handleSegmentDropdown = () => {

        if (selectvalue) {
            schema.filter((item: any, index: number) => {
                if (item.value === selectvalue) {
                    setSegmentList([...segmentList, item])
                    setSelectedvalue('')
                }
            }
            )
        }
    }

    const handleAddsegment = (index: number, value: any) => {
        console.log("wwewewesdsd>>>>", value, index)
        const newSchemas = [...segmentList];
        newSchemas[index] = value;
        setSegmentList(newSchemas);
        if(value!=''){
            setSegmentList(segmentList.filter((item:any)=>item!==value))
            
        }
    }
    console.log("sefff0", segmentList)


    useEffect(() => {
        let DropDown: any = schema?.filter((option: any) =>
            segmentList?.every((item: any) => item.value !== option.value)
        )
        setSegmentDropDown(DropDown)
    }, [segmentList])

    console.log("wewew", segmentDropDown)
    return (
        <div>
            <div>
                <h4>Enter the Name of the Segment</h4>
                <form>
                    <input type='text' value={nameofSegment} placeholder="Name of the segment" onChange={(e) => setNameofSegment(e.target.value)} />
                </form>
            </div>
            <p>To save your segment, you need to add the schemas to bulid the quary</p>
            <div className='d-flex'>
                <span><li>User Traks</li>
                    <li>Group Traks</li></span>
            </div>
            <div>
                {segmentList?.map((option: any, index: any) => (
                    <select key={index} value={option.value} onChange={(e) => handleAddsegment(index, e?.target?.value)}>
                        <option value="">{option.label}</option> {/* Default placeholder option */}
                        {segmentDropDown?.map((item: any) => (
                            <option key={item?.value} value={item?.value}>
                                {item?.label}
                            </option>
                        ))
                        }
                    </select>
                ))}

            </div>
            <form>
                <select onChange={(e) => setSelectedvalue(e.target.value)}>
                    <option value={''} selected>{'add schema to segment'}</option>
                    {segmentDropDown && segmentDropDown?.map((option: any, index: any) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}

                </select>
            </form>
            <a href='#' onClick={() => { handleSegmentDropdown() }}>+Add new schema</a>

        </div>
    )
}

export default PopupSegment