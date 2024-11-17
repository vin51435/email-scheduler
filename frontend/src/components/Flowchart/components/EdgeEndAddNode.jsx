import React, { useCallback, useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, useReactFlow } from '@xyflow/react';
import Modal from 'react-modal';
import { useReactFlowContext } from '../../../context/ReactFlowProvider';

export default function EdgeEndAddNode(props) {
  const { openModal } = useReactFlowContext();


  const edgePath = `M${props.sourceX},${props.sourceY} L${props.sourceX},${props.sourceY + 50}`;
  const labelX = props.sourceX;
  const labelY = props.sourceY + 50;

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
          <button className="edgebutton nodrag nopan" onClick={() => openModal('endAddButton', props)}>+</button>
        </div>
      </EdgeLabelRenderer>

      {/* <ModalComponent /> */}
    </>
  );
}
