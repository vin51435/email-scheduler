import React, { useCallback } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useReactFlow } from '@xyflow/react';
import Modal from 'react-modal';
import { useReactFlowContext } from '../../../context/ReactFlowProvider';
export default function EdgeAddNode(props) {
  const { openModal } = useReactFlowContext();
  const [edgePath, labelX, labelY] = getBezierPath(props);

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={props.markerEnd} style={props.style} className="baseedge" />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button className="edgebutton nodrag nopan" onClick={() => openModal('addNode', props)}>+</button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
