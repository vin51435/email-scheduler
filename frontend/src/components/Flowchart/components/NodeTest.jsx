import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { useReactFlowContext } from '../../../context/ReactFlowProvider';


const NodeTest = memo(function NodeTest(props) {
  const { deleteNode } = useReactFlowContext();

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className='node'>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" className="nodrag" />
        <div className={`actions ${props?.dragging ? 'hidden' : 'show'}`}>
          <span className='edit'>
            <FaRegEdit />
          </span>
          <span className='delete' role='button' onClick={() => deleteNode(props.id)}>
            <TiDeleteOutline />
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
});

export default NodeTest;

