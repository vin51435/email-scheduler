import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import axios from 'axios';
import EdgeAddNode from './components/EdgeAddNode';
import NodeTest from './components/NodeTest';
import ColdEmailNode from './components/NodeColdEmail';
import WaitDelayNode from './components/NodeWaitDelay';
import LeadSourceNode from './components/NodeLeadSource';
import useLayoutedElements from '../../hooks/useLayoutedElementsFlowchart';
import EdgeEndAddNode from './components/EdgeEndAddNode';
import AddLeadNode from './components/NodeAddLeadNode';
import SequenceStart from './components/NodeSequenceStart';

const initialNodes = [
  {
    id: "1",
    position: {
      x: 262,
      y: 12
    },
    data: {
      label: "Lead Source",
      emails: [
        "v3p51435@gmail.com",
        "vinit31435@gmail.com"
      ]
    },
    type: "LeadSourceNode",
    draggable: false,
    deletable: false,
    measured: {
      width: 220,
      height: 68
    },
    width: 220,
    selected: false,
    height: 68
  },
  {
    id: "sequenceStart",
    position: {
      x: 262,
      y: 180
    },
    data: {
      label: "sequenceStart"
    },
    type: "SequenceStart",
    draggable: false,
    deletable: false,
    measured: {
      width: 220,
      height: 50
    },
    selectable: false,
    width: 220,
    height: 50
  },
  {
    id: "1-1",
    position: {
      x: 550,
      y: 12
    },
    data: {
      label: "addLeadSource"
    },
    type: "AddLeadNode",
    deletable: false,
    measured: {
      width: 220,
      height: 78
    },
    width: 220,
    selected: false,
    dragging: false,
    height: 78
  },
  {
    id: "2",
    position: {
      x: 262,
      y: 330
    },
    data: {
      label: "ColdEmailNode",
      subject: "First mail",
      body: "Immediate Mail"
    },
    type: "ColdEmailNode",
    measured: {
      width: 220,
      height: 68
    },
    width: 220,
    selected: false,
    dragging: false,
    height: 68
  },
  {
    id: "3",
    position: {
      x: 262,
      y: 498
    },
    data: {
      label: "Wait/Delay",
      delay: "2"
    },
    type: "WaitDelayNode",
    measured: {
      width: 220,
      height: 68
    },
    width: 220,
    selected: false,
    height: 68
  },
  {
    id: "4",
    position: {
      x: 262,
      y: 666
    },
    data: {
      label: "ColdEmailNode",
      subject: "Second mail",
      body: "This mail comes after 2 minutes of previous mail"
    },
    type: "ColdEmailNode",
    measured: {
      width: 220,
      height: 68
    },
    width: 220,
    height: 68,
    selected: true
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: 'sequenceStart', data: { label: 'leadSource', count: 1 }, type: 'default' },
  { id: 'e1-1.1', source: 'sequenceStart', target: '2', data: { label: 'sequenceStart', count: 1 }, type: 'addNode' },
  { id: 'e1-3', source: '2', target: '3', data: { label: '+' }, type: 'addNode' },
  { id: 'e1-4', source: '3', target: '4', data: { label: '+' }, type: 'addNode' },
  { id: 'e1-52', source: '4', target: '4', data: { label: '+' }, type: 'endAddButton' },
];

let nodeId = 10;

export default function Flowchart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => ({
    testNode: NodeTest,
    ColdEmailNode,
    WaitDelayNode,
    LeadSourceNode,
    AddLeadNode,
    SequenceStart
  }), []);
  const { getLayoutedElements } = useLayoutedElements();
  const edgeTypes = { addNode: EdgeAddNode, endAddButton: EdgeEndAddNode };

  const onClick = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${id}` },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const saveWorkflow = async () => {
    try {
      const hasLeadSource = nodes.some((node) => node.type === 'LeadSourceNode');
      if (!hasLeadSource) {
        throw new Error('No LeadSourceNode found. Please add a Lead Source node before proceeding.');
      }

      const payload = { nodes, edges };
      const url = import.meta.env.VITE_DEVELOPMENT === 'production'
        ? 'https://email-scheduler-tz4t.onrender.com/api/v1/submit-workflow'
        : 'http://localhost:3002/api/v1/submit-workflow';
      const response = await axios.post(url, payload);
      alert('Workflow saved successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className='main'>
      <div className='react-flow-controls'>
        <div className='react-flow-controls-save'>
          <button className='btn2' onClick={() => saveWorkflow()}>Save Workflow</button>
        </div>
      </div>
      <div className='react-flow_container' style={{ width: '100%', height: '85%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          fitView
          defaultEdgeOptions={{ animated: true, type: 'addNode', focusable: false }}
        >
          <Panel position="top-right">
            <button
              className='btn2'
              onClick={() =>
                getLayoutedElements({
                  'elk.algorithm': 'layered',
                  'elk.direction': 'DOWN',
                })
              }
            >
              vertical layout
            </button>

          </Panel>
          {/* <Panel position="top-left">
            <button onClick={onClick} className="btn-add">Add Node</button>
          </Panel> */}
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
