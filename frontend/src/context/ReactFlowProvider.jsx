import React, { createContext, useContext, useState, memo, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import { useReactFlow } from '@xyflow/react';
import { MdOutlineCancelPresentation } from "react-icons/md";

const ReactFlowContext = createContext();

const defaultData = {
  coldEmail: {
    label: 'Cold Email',
    subject: 'Initial Email',
    body: 'This is the body of the cold email.',
  },
  waitDelay: {
    label: 'Wait/Delay',
    delay: '5',
  }
};

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

    if (!sourceNode) {
      return;
    }

    const newNodeId = `new-${Date.now()}`;
    const newNodePosition = {
      x: sourceNode.position.x,
      y: (sourceNode.position.y + sourceNode.width),
    };
    const newNodeData = type === 'coldEmail' ? defaultData.coldEmail : defaultData.waitDelay;

    const newNode = {
      id: newNodeId,
      position: newNodePosition,
      data: newNodeData,
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

    const newNodePosition = {
      x: ((source.position.x + target.position.x) / 2),
      y: ((source.position.y + target.position.y) / 2) + 60,
    };

    const newNodeData = type === 'coldEmail' ? defaultData.coldEmail : defaultData.waitDelay;

    const newNode = {
      id: newNodeId,
      position: newNodePosition,
      data: newNodeData,
      type: type === 'coldEmail' ? 'ColdEmailNode' : 'WaitDelayNode',
    };

    setNodes((nodes) => {
      const updatedNodes = [
        ...nodes.map((node) => {
          if (node.id === props.source) {
            return { ...node, position: { ...node.position } };
          }
          if (node.id === props.target) {
            return { ...node, position: { ...node.position } };
          }
          return node;
        }),
        newNode,
      ];


      const newNodeYPosition = newNodePosition.y;

      const finalNodes = updatedNodes.map((node) => {

        if (node.position.y > newNodeYPosition) {
          return {
            ...node,
            position: { ...node.position, y: node.position.y + 180 },
          };
        }
        return node;
      });

      return finalNodes;
    });


    setEdges((edges) => [
      ...edges.filter((edge) => edge.id !== props.id),
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
      { id: `${props.id}${newNodeId}`, source: newNodeId, target: 'sequenceStart', data: { label: 'Add Lead' }, type: 'default' }
    ]);
  };

  const ModalComponent = useCallback(() => {
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      console.log('name, value and props.id', name, value, nodeType?.props?.id);
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          if (node?.id !== nodeType.props.id) return node;

          const updatedNodeData = { ...node.data };

          try {
            if (name === "emails") {
              updatedNodeData[name] = value.split(",").map(email => email.trim());
            } else {
              updatedNodeData[name] = value;
            }
          } catch (error) {
            console.error('Error updating node data', error);
            return node;
          }

          return {
            ...node,
            data: updatedNodeData,
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
          <button className='' onClick={() => addNodeHandleNodeTypeSelect('coldEmail', nodeType.props)}>Cold Email Node</button>
          <button className='' onClick={() => addNodeHandleNodeTypeSelect('waitDelay', nodeType.props)}>Wait/Delay Node</button>
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
              defaultValue={node?.data?.emails}
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
            <h2>Wait Time</h2>
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
        return (
          <div className='react-modal'>
            <div className='rect-modal-header'>
              <h2>Cold Email</h2>
              <span className='icon_span' onClick={closeModal}><MdOutlineCancelPresentation /></span>
            </div>
            <div>
              <label htmlFor="subject">Subject:</label>
              <input
                id="subject"
                name="subject"
                placeholder="Email Subject"
                defaultValue={node?.data?.subject ?? ''}
                onChange={handleInputChange}
                className="nodrag"
                style={{ width: '100%', marginBottom: '5px' }}
              />

              <label htmlFor="body">Body:</label>
              <textarea
                id="body"
                name="body"
                placeholder="Email Body"
                defaultValue={node?.data?.body ?? ''}
                onChange={handleInputChange}
                className="nodrag"
                style={{ width: '100%', height: '60px' }}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  }, [nodeType?.type]);

  const deleteNode = (id) => {
    const nodeId = id;

    setEdges((prevEdges) => {
      const connectedEdges = prevEdges.filter(
        (edge) => edge.source === nodeId || edge.target === nodeId
      );

      if (connectedEdges.some((edge) => edge.type === 'endAddButton')) {
        const updatedEdges = prevEdges.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId
        );

        connectedEdges.forEach((edge) => {
          if (edge.type !== 'endAddButton') {
            const newEdge = {
              id: `${edge.source}-${Date.now()}`,
              source: edge.source,
              target: edge.source,
              type: 'endAddButton',
            };
            updatedEdges.push(newEdge);
          }
        });
        return updatedEdges;
      }

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


    setNodes((prevNodes) => {
      const updatedNodes = prevNodes.filter((node) => node.id !== nodeId);
      return updatedNodes;
    });
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
