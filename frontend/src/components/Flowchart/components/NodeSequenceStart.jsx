import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';

const SequenceStart = memo(() => (
  <>
    <Handle type="target" position={Position.Top} />
    <div className="node sequence-start">
      <span className="header">
        <h4>Sequence Start Point</h4>
      </span>
    </div>
    <Handle type="source" position={Position.Bottom} />
  </>
));

export default SequenceStart;
