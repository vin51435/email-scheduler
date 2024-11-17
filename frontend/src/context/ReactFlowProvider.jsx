import React, { createContext, useContext, useState, memo, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import { useReactFlow } from '@xyflow/react';
import { MdOutlineCancelPresentation } from "react-icons/md";

const ReactFlowContext = createContext();

export const ReactFlowContextProvider = memo(({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nodeType, setNodeType] = useState({ type: null, props: null });
  const { getNode, setEdges, setNodes } = useReactFlow();

  const openModal = (type, props) => {
    setNodeType({ type, props });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNodeType(null);
  };

  const endAddButtonOnNodeTypeSelect = (type, props) => {

    closeModal();

    const sourceNode = getNode(props.source);
    const targetNode = getNode(props.target);

    if (!sourceNode || !targetNode) {
      return;
    }

    const newNodeId = `new-${Date.now()}`;
    const newNodePosition = {
      x: sourceNode.position.x + 110,
      y: sourceNode.position.y + 100,
    };

    const newNode = {
      id: newNodeId,
      position: newNodePosition,
      data: { label: type === 'coldEmail' ? 'Cold Email' : 'Wait/Delay' },
      type: type === 'coldEmail' ? 'ColdEmailNode' : 'WaitDelayNode',
    };


    setNodes((nodes) => [...nodes, newNode]);

    setEdges((edges) => [
      ...edges.filter((edge) => edge.id !== props.id),
      { id: `${props.source}-${newNodeId}`, source: props.source, target: newNodeId, type: 'addNode' },
      { id: `${newNodeId}-${props.target}`, source: newNodeId, target: newNodeId, type: 'endAddButton' },
    ]);

  };

  const addNodeHandleNodeTypeSelect = (type, props) => {
    closeModal();

    const source = getNode(props.source);
    const target = getNode(props.target);

    if (!source || !target) {
      console.error('Source or target node not found');
      return;
    }

    const newNodeId = `new-${Date.now()}`;
    const newNodeWidth = 220;
    const newNodeHeight = 59;

    const isVertical = Math.abs(source.position.x - target.position.x) < newNodeWidth;
    const spacing = isVertical ? newNodeHeight + 20 : newNodeWidth + 20;

    const newNodePosition = {
      x: (source.position.x + target.position.x) / 2 - newNodeWidth / 2,
      y: (source.position.y + target.position.y) / 2 - newNodeHeight / 2,
    };

    const newNode = {
      id: newNodeId,
      position: newNodePosition,
      data: { label: type === 'coldEmail' ? 'Cold Email' : 'Wait/Delay' },
      type: type === 'coldEmail' ? 'ColdEmailNode' : 'WaitDelayNode',
    };

    setNodes((nodes) => [
      ...nodes.map(node => {
        if (node.id === props.source) {
          return { ...node, position: { ...node.position, y: node.position.y - spacing / 2, x: node.position.x - spacing / 2 } };
        }
        if (node.id === props.target) {
          return { ...node, position: { ...node.position, y: node.position.y + spacing / 2, x: node.position.x + spacing / 2 } };
        }
        return node;
      }),
      newNode,
    ]);

    setEdges((edges) => [
      ...edges.filter(edge => edge.id !== props.id),
      { id: `${props.source}-${newNodeId}`, source: props.source, target: newNodeId, type: 'addNode' },
      { id: `${newNodeId}-${props.target}`, source: newNodeId, target: props.target, type: 'addNode' },
    ]);
  };

  const addNewLead = (props) => {
    if (!props || !props.positionAbsoluteX || !props.positionAbsoluteY || !props.width) {
      console.error('addNewLead: Invalid props');
      return;
    }

    closeModal();

    const newNodeId = `${Date.now()}`;
    const newNodePosition = { x: props.positionAbsoluteX, y: props.positionAbsoluteY };
    const newAddLeadNodePosition = { x: props.positionAbsoluteX + props.width + 50, y: props.positionAbsoluteY };

    const newNode = {
      id: newNodeId,
      position: newNodePosition,
      data: { label: "Lead Source" },
      type: 'LeadSourceNode',
      draggable: false,
    };

    setNodes((nodes) =>
      nodes.map(node =>
        node?.id === props.id ? { ...node, position: newAddLeadNodePosition } : node
      ).concat(newNode)
    );

    setEdges((edges) => [
      ...edges,
      { id: `${props.id}${newNodeId}`, source: newNodeId, target: edges.find(edge => edge.data.label === 'sequenceStart')?.source, data: { label: 'Add Lead' }, type: 'default' }
    ]);
  };

  const ModalComponent = useCallback(() => {
    const handleInputChange = (event) => {
      const { name, value } = event.target;

      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          if (node.id !== nodeType.props.id) return node;

          let updatedData = { ...node.data };

          switch (name) {
            case "emails":
              updatedData[name] = value.split(",").map((email) => email.trim());
              break;
            default:
              updatedData[name] = value;
          }

          return {
            ...node,
            data: updatedData,
          };
        })
      );
    };

    const node = getNode(nodeType?.props?.id);

    switch (nodeType?.type) {
      case 'endAddButton':
        return (<div className='react-modal'>
          <div className='rect-modal-header'>
            <h2>Select Node Type</h2>
            <span className='icon_span' onClick={closeModal}><MdOutlineCancelPresentation /></span>
          </div>
          <button onClick={() => endAddButtonOnNodeTypeSelect('coldEmail', nodeType.props)}>Cold Email Node</button>
          <button onClick={() => endAddButtonOnNodeTypeSelect('waitDelay', nodeType.props)}>Wait/Delay Node</button>
        </div>);
      case 'addNode':
        return (<div className='react-modal'>
          <div className='rect-modal-header'>
            <h2>Select Node Type</h2>
            <span className='icon_span' onClick={closeModal}><MdOutlineCancelPresentation /></span>
          </div>
          <button onClick={() => addNodeHandleNodeTypeSelect('coldEmail', nodeType.props)}>Cold Email Node</button>
          <button onClick={() => addNodeHandleNodeTypeSelect('waitDelay', nodeType.props)}>Wait/Delay Node</button>
        </div>);
      case 'addLeadSource':
        return (<div className='react-modal'>
          <div className='rect-modal-header'>
            <h2>Add Lead Source</h2>
            <span className='icon_span' onClick={closeModal}><MdOutlineCancelPresentation /></span>
          </div>
          <div>
            <textarea
              name="emails"
              placeholder="Enter email IDs separated by commas"
              value={node?.data?.emails}
              onChange={handleInputChange}
              style={{ width: "100%", height: "100px" }}
            ></textarea>

          </div>
        </div>);
      case 'addLeadNode':
        return (<div className='react-modal'>
          <div className='rect-modal-header'>
            <h2>Add new Lead Source</h2>
            <span className='icon_span' onClick={closeModal}><MdOutlineCancelPresentation /></span>
          </div>
          <button onClick={() => addNewLead(nodeType.props)}>Add new Lead Source</button>
        </div>);
      case 'waitTime':
        return (<div className='react-modal'>
          <div className='rect-modal-header'>
            <h2>Add new Lead Source</h2>
            <span className='icon_span' onClick={closeModal}><MdOutlineCancelPresentation /></span>
          </div>
          <div>
            <label htmlFor="waitTime">Wait Time (minutes):</label>
            <input
              id="waitTime"
              type="number"
              className="nodrag"
              style={{ width: "100%" }}
              defaultValue={Number(node?.data?.delay) || 0}
              name="delay"
              onChange={handleInputChange}
              placeholder="Enter wait time"
            />
          </div>
        </div>);
      case 'addColdEmail':
        return (<div className='react-modal'>
          <div className='rect-modal-header'>
            <h2>Add new Lead Source</h2>
            <span className='icon_span' onClick={closeModal}><MdOutlineCancelPresentation /></span>
          </div>
          <div>
            <label htmlFor="subject">Subject:</label>
            <input
              id="subject"
              name="subject"
              placeholder="Email Subject"
              value={node?.data?.subject}
              onChange={handleInputChange}
              className="nodrag"
              style={{ width: '100%', marginBottom: '5px' }}
            />

            <label htmlFor="body">Body:</label>
            <textarea
              id="body"
              name="body"
              placeholder="Email Body"
              value={node?.data?.body}
              onChange={handleInputChange}
              className="nodrag"
              style={{ width: '100%', height: '60px' }}
            />
            {/* <button onClick={() => addNewColdEmail(nodeType.props)}>Add new Cold Email</button> */}
          </div>
        </div>);
      default:
        return null;
    }
  }, [nodeType?.type]);

  const deleteNode = (id) => {
    const nodeId = id;

    setEdges((prevEdges) => {

      const connectedEdges = prevEdges.filter((edge) => edge.source === nodeId || edge.target === nodeId);


      const sourceEdge = connectedEdges.find((edge) => edge.target === nodeId);
      const targetEdge = connectedEdges.find((edge) => edge.source === nodeId);


      const newEdges = [];
      if (sourceEdge && targetEdge) {
        newEdges.push({
          id: `${sourceEdge.source}-${targetEdge.target}`,
          source: sourceEdge.source,
          target: targetEdge.target,
          type: 'addNode',
        });
      }


      return prevEdges
        .filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
        .concat(newEdges);
    });


    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
  };

  return (
    <ReactFlowContext.Provider value={{ isModalOpen, openModal, closeModal, deleteNode }}>
      {children}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Add Node" ariaHideApp={false} className='react-modal'>
        {isModalOpen && <ModalComponent />}
      </Modal>
    </ReactFlowContext.Provider>
  );
});

export const useReactFlowContext = () => useContext(ReactFlowContext);
