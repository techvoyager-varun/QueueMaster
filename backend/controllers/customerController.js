import { v4 as uuidv4 } from 'uuid';

let queue = [];

export const getCustomers = (req, res) => {
  res.json(queue);
};

export const addCustomer = (req, res) => {
  const { name, note } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }
  const newCustomer = {
    id: uuidv4(),
    name: name.trim(),
    note: note ? note.trim() : '',
    status: 'WAITING',
    createdAt: new Date().toISOString()
  };
  queue.push(newCustomer);
  res.status(201).json(newCustomer);
};

export const updateCustomerStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const validStatuses = ['WAITING', 'SERVING', 'COMPLETED'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const customerIndex = queue.findIndex(c => c.id === id);
  if (customerIndex === -1) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  queue[customerIndex].status = status;
  res.json(queue[customerIndex]);
};

export const deleteCustomer = (req, res) => {
  const { id } = req.params;
  const initialLength = queue.length;
  queue = queue.filter(c => c.id !== id);
  
  if (queue.length === initialLength) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  
  res.status(204).send();
};
