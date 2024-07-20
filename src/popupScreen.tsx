// src/components/Popup.js
import React, { useState } from 'react';

const Popup = ( onClose:any) => {
  const [segmentName, setSegmentName] = useState<any>('');
  const [schemas, setSchemas] = useState<any>([]);
  const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];
  
  const handleAddSchema = () => {
    setSchemas([...schemas, '']);
  };

  const handleSchemaChange = (index:any, value:any) => {
    const newSchemas = [...schemas];
    newSchemas[index] = value;
    setSchemas(newSchemas);
  };

  const handleSubmit = () => {
    const formattedSchemas:any = schemas?.map((schema:any) => ({
      [schema]: schemaOptions.find(option => option.value === schema)?.label
    }));
    const data = {
      segment_name: segmentName,
      schema: formattedSchemas
    };
    // Send data to server here, e.g., using fetch or axios
    console.log(data);
    onClose();
  };

  const availableOptions = schemaOptions.filter(option => !schemas.includes(option.value));

  return (
    <div className="popup">
      <h2>Save Segment</h2>
      <input
        type="text"
        value={segmentName}
        onChange={(e) => setSegmentName(e.target.value)}
        placeholder="Segment Name"
      />
      <div className="schema-box">
        {schemas?.map((schema:any, index:any) => (
          <select
            key={index}
            value={schema}
            onChange={(e) => handleSchemaChange(index, e.target.value)}
          >
            <option value="">Select schema</option>
            {availableOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}
      </div>
      <select>
        <option value="">Add schema to segment</option>
        {availableOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button onClick={handleAddSchema}>+ Add new schema</button>
      <button onClick={handleSubmit}>Save</button>
      <button onClick={()=>onClose()}>Close</button>
    </div>
  );
};

export default Popup;
