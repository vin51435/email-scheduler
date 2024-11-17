import { Handle, Position } from '@xyflow/react';
import React, { memo } from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { useReactFlowContext } from '../../../context/ReactFlowProvider';
import { IoMdTimer } from "react-icons/io";

const WaitDelayNode = memo((props) => {
  const { deleteNode, openModal } = useReactFlowContext();

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className='node wait-time'>
        <span className='icon_span'><IoMdTimer /></span>
        <div className='content'>
          <div className='header'>
            <h3 >Delay</h3>
            <h4>Wait {props.data?.delay ?? '-'} minutes</h4>
          </div>
        </div>
        <div className={`actions ${props?.dragging ? 'hidden' : 'show'}`}>
          <span className='edit' onClick={() => openModal('waitTime', props)} >
            <FaRegEdit />
          </span>
          {/* {!props?.deletable &&  */}
          <span className='delete' onClick={() => deleteNode(props.id)}>
            <TiDeleteOutline />
          </span>
          {/* } */}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});

export default WaitDelayNode;

