import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { FaRegEdit } from 'react-icons/fa';
import { useReactFlowContext } from '../../../context/ReactFlowProvider';
import { LuUserPlus2 } from 'react-icons/lu';


const LeadSourceNode = memo((props) => {
  const { deleteNode, openModal } = useReactFlowContext();

  return (
    <>
      <div className='node lead-source'>
        <span className='icon_span'><LuUserPlus2 /></span>
        <div className='content'>
          <span>
            <h3>Leads from</h3>
            <h4>Sample list</h4>
          </span>
        </div>
        <div className={`actions ${props?.dragging ? 'hidden' : 'show'}`}>
          <span className='edit' onClick={() => openModal('addLeadSource', props)}>
            <FaRegEdit />
          </span>
          <span className='delete' role='button' onClick={() => deleteNode(props.id)}>
            <TiDeleteOutline />
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});

export default LeadSourceNode;

