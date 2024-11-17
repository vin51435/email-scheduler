const agenda = require('../services/agenda');

const scheduleWorkflow = async (req, res) => {
  const { nodes, edges } = req.body;

  try {
    const leadSourceNodes = nodes.filter((node) => node.type === 'LeadSourceNode');

    if (leadSourceNodes.length === 0) {
      return res.status(400).json({ error: 'No LeadSourceNode found in workflow.' });
    }

    for (const leadSourceNode of leadSourceNodes) {
      const { emails } = leadSourceNode.data;

      if (!emails || emails.length === 0) {
        continue;
      }

      for (const email of emails) {
        const visited = new Set();
        let currentNodeId = leadSourceNode.id;
        let accumulatedDelay = 0;

        while (currentNodeId) {
          visited.add(currentNodeId);

          const currentNode = nodes.find((node) => node.id === currentNodeId);

          if (currentNode.type === 'ColdEmailNode') {
            const { subject, body } = currentNode.data;

            await agenda.schedule(new Date(Date.now() + accumulatedDelay), 'sendEmail', {
              to: email,
              subject,
              body,
            });
          }

          if (currentNode.type === 'WaitDelayNode') {
            accumulatedDelay += parseInt(currentNode.data.delay || 0, 10) * 60000;
          }

          const nextEdge = edges.find(
            (edge) => edge.source === currentNodeId && !visited.has(edge.target)
          );
          currentNodeId = nextEdge ? nextEdge.target : null;
        }
      }
    }

    res.status(200).json({ success: true, message: 'Workflow processed and emails scheduled.' });
  } catch (error) {
    console.error('Failed to process workflow:', error);
    res.status(500).json({ success: false, message: 'Failed to process workflow', error });
  }
};


module.exports = { scheduleWorkflow };
