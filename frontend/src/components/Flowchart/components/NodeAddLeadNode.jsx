import React from 'react';
import { FaPlus } from "react-icons/fa6";
import { useReactFlowContext } from '../../../context/ReactFlowProvider';

const AddLeadNode = (props) => {
  const { openModal } = useReactFlowContext();

  return (
    <div className='node add-lead-node' role='button' onClick={() => { openModal('addLeadNode', props); }}>
      <span ><FaPlus /></span>
      <h3>Add lead Source</h3>
      <p>Click to add leads from List or CRM</p>
      {/* <Handle type="source" position={Position.Bottom} /> */}
    </div>
  );
};

export default React.memo(AddLeadNode);
