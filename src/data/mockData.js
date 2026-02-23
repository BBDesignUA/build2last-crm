export const MOCK_STAGES = [
    { id: 'estimate', title: 'Estimates' },
    { id: 'production', title: 'Production' },
    { id: 'completed', title: 'Completed' },
];

export const MOCK_JOBS = [
    {
        id: 'job-1',
        clientName: 'Robert Smith',
        address: '123 Main St, Richboro, PA',
        trade: 'Roofing',
        status: 'estimate',
        phone: '(215) 555-0123',
        priority: 'high',
        checklist: [
            { id: 'c1', task: 'Review Blueprints', completed: true },
            { id: 'c2', task: 'Site Inspection', completed: true },
            { id: 'c3', task: 'Send Quote', completed: false },
        ],
        pricing: { total: 12500, paid: 5000, balance: 7500 },
    },
    {
        id: 'job-2',
        clientName: 'Sarah Johnson',
        address: '456 Oak Ave, Doylestown, PA',
        trade: 'Siding',
        status: 'production',
        phone: '(215) 555-0456',
        priority: 'medium',
        checklist: [
            { id: 'c4', task: 'Order Materials', completed: true },
            { id: 'c5', task: 'Schedule Install', completed: false },
        ],
        pricing: { total: 8200, paid: 8200, balance: 0 },
    },
    {
        id: 'job-3',
        clientName: 'Michael Brown',
        address: '789 Pine Ln, Newtown, PA',
        trade: 'Gutters',
        status: 'estimate',
        phone: '(215) 555-0789',
        priority: 'low',
        checklist: [],
        pricing: { total: 2400, paid: 0, balance: 2400 },
    },
    {
        id: 'job-4',
        clientName: 'Emily Davis',
        address: '321 Elm St, Yardley, PA',
        trade: 'Carpentry',
        status: 'completed',
        phone: '(215) 555-0321',
        priority: 'medium',
        checklist: [],
        pricing: { total: 4500, paid: 4500, balance: 0 },
    },
];
