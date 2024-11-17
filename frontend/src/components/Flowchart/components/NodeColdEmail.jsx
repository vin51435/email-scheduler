import { Handle, Position } from '@xyflow/react';
import { memo, useCallback } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { FaRegEdit } from 'react-icons/fa';
import { useReactFlowContext } from '../../../context/ReactFlowProvider';
import { MdOutlineEmail } from "react-icons/md";

const ColdEmailNode = memo((props) => {
  const { deleteNode, openModal } = useReactFlowContext();
  const handleClick = useCallback(() => openModal('addColdEmail', props), [props.id, openModal]);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="node cold-email" >
        <span className='icon_span'><MdOutlineEmail /></span>
        <div className="content">
          <div className='header'>
            <h3 >Cold Email</h3>
            <h4>{props.data?.template ?? 'Default Template'}</h4>
          </div>
        </div>

        <div className={`actions ${props?.dragging ? 'hidden' : 'show'}`}>
          <span className="edit" onClick={handleClick}>
            <FaRegEdit />
          </span>
          <span className="delete" role="button" onClick={() => deleteNode(props.id)}>
            <TiDeleteOutline />
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});

export default ColdEmailNode;

