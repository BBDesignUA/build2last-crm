export const MOCK_STAGES = [
    { id: 'lead', title: 'Lead' },
    { id: 'estimate-scheduled', title: 'Est. Scheduled' },
    { id: 'estimate-progress', title: 'Est. in Progress' },
    { id: 'job-prep', title: 'Job Prep' },
    { id: 'job-scheduled', title: 'Job Scheduled' },
    { id: 'job-progress', title: 'Job In Progress' },
    { id: 'job-post', title: 'Job Post / Inv.' },
    { id: 'completed', title: 'Completed / Paid' },
];

export const CHECKLIST_DATA = {
    Small: {
        lead: [
            { id: 's-l1', task: 'Quick Consultation', assignee: 'Sales', completed: false },
            { id: 's-l2', task: 'Mobile Estimate Sent', assignee: 'Sales', completed: false },
        ],
        'job-prep': [
            { id: 's-p1', task: 'Basic Work Order', assignee: 'Assistant', completed: false },
        ],
        'completed': [
            { id: 's-c1', task: 'Payment Collected', assignee: 'John', completed: true },
        ]
    },
    Medium: {
        lead: [
            { id: 'm-l1', task: 'Site Visit Scheduled', assignee: 'Sales', completed: true },
            { id: 'm-l2', task: 'Full Proposal Sent', assignee: 'Sales', completed: false },
        ],
        'job-prep': [
            { id: 'm-p1', task: 'Confirm Materials', assignee: 'Assistant', completed: false },
            { id: 'm-p2', task: 'Schedule Installer', assignee: 'John', completed: false },
        ],
        'job-progress': [
            { id: 'm-w1', task: 'Progress Photo', assignee: 'General', completed: false },
            { id: 'm-w2', task: 'Daily Cleanup', assignee: 'General', completed: false },
        ]
    },
    Large: {
        lead: [
            { id: 'l-l1', task: 'Initial Referral Check', assignee: 'Assistant', completed: true },
            { id: 'l-l2', task: 'Schedule Perry for Site Visit', assignee: 'Assistant', completed: true },
        ],
        'estimate-scheduled': [
            { id: 'l-e1', task: 'Site Measurements', assignee: 'Perry', completed: false },
            { id: 'l-e2', task: 'Color Sample Drop-off', assignee: 'Assistant', completed: false },
        ],
        'estimate-progress': [
            { id: 'l-ep1', task: 'Draft Scope of Work', assignee: 'Perry', completed: false },
            { id: 'l-ep2', task: 'Line Item Pricing', assignee: 'John', completed: false },
            { id: 'l-ep3', task: 'Review with Owner', assignee: 'Perry', completed: false },
        ],
        'job-prep': [
            { id: 'l-p1', task: 'Permits Filed', assignee: 'Assistant', completed: false },
            { id: 'l-p2', task: 'HOA Approval Check', assignee: 'Assistant', completed: false },
            { id: 'l-p3', task: 'Order Specialist Materials', assignee: 'John', completed: false },
        ],
        'job-scheduled': [
            { id: 'l-js1', task: 'Crew Assignment', assignee: 'John', completed: false },
            { id: 'l-js2', task: 'Trash Bin Scheduled', assignee: 'Assistant', completed: false },
        ],
        'job-progress': [
            { id: 'l-jp1', task: 'In Progress Walkthrough', assignee: 'Perry', completed: false },
            { id: 'l-jp2', task: 'Quality Control Check', assignee: 'John', completed: false },
        ],
        'job-post': [
            { id: 'l-po1', task: 'Final Inspection', assignee: 'General', completed: false },
            { id: 'l-po2', task: 'Send Final Invoice', assignee: 'Assistant', completed: false },
        ],
        'completed': [
            { id: 'l-c1', task: 'Warranty Registration', assignee: 'Assistant', completed: true },
            { id: 'l-c2', task: 'Review Request', assignee: 'Assistant', completed: false },
        ]
    }
};

export const MOCK_JOBS = [
    {
        id: 'job-1',
        clientName: 'Robert Smith',
        spouseName: 'Mary Smith',
        address: '123 Main St, Richboro, PA',
        trade: 'Roofing',
        status: 'estimate-progress',
        jobSize: 'Large',
        phone: '(215) 555-0123',
        email: 'robert@example.com',
        priority: 'high',
        notes: 'Client is very focused on the timeline for the new roof.',
        checklist: [],
        pricing: { total: 12500, paid: 2500, balance: 10000 },
        communications: [
            { id: 'm1', type: 'email', date: '2024-02-23', text: 'Sent initial intro email' },
            { id: 'm2', type: 'call', date: '2024-02-24', text: 'Follow-up call scheduled' },
        ]
    },
    {
        id: 'job-2',
        clientName: 'Sarah Johnson',
        spouseName: '',
        address: '456 Oak Ave, Doylestown, PA',
        trade: 'Siding',
        status: 'job-progress',
        jobSize: 'Medium',
        phone: '(215) 555-0456',
        email: 'sarah.j@example.com',
        priority: 'medium',
        notes: 'Special color request for siding panels.',
        checklist: [],
        pricing: { total: 8200, paid: 4100, balance: 4100 },
        communications: [
            { id: 'm3', type: 'call', date: '2024-02-20', text: 'Discussed material colors' },
        ]
    },
    {
        id: 'job-3',
        clientName: 'Michael Brown',
        spouseName: 'Linda Brown',
        address: '789 Pine Ln, Newtown, PA',
        trade: 'Gutters',
        status: 'lead',
        jobSize: 'Small',
        phone: '(215) 555-0789',
        email: 'mbrown@example.com',
        priority: 'low',
        notes: 'Gutter cleaning and minor repair.',
        checklist: [],
        pricing: { total: 800, paid: 0, balance: 800 },
        communications: []
    },
];

export const MOCK_CLIENTS = [
    {
        id: 'client-1',
        name: 'Robert Smith',
        spouseName: 'Mary Smith',
        address: '123 Main St, Richboro, PA',
        phone: '(215) 555-0123',
        email: 'robert@example.com',
        notes: 'Very detail-oriented. Prefers communication via email.'
    },
    {
        id: 'client-2',
        name: 'Sarah Johnson',
        spouseName: '',
        address: '456 Oak Ave, Doylestown, PA',
        phone: '(215) 555-0456',
        email: 'sarah.j@example.com',
        notes: 'Interested in future window replacement project.'
    },
    {
        id: 'client-3',
        name: 'Michael Brown',
        spouseName: 'Linda Brown',
        address: '789 Pine Ln, Newtown, PA',
        phone: '(215) 555-0789',
        email: 'mbrown@example.com',
        notes: 'Referred by neighbors.'
    }
];

export const MOCK_USERS = [
    {
        id: 'user-1',
        name: 'System Admin',
        email: 'admin@gmail.com',
        role: 'admin',
        password: 'admin' // In a real app this would be hashed
    },
    {
        id: 'user-2',
        name: 'Project Manager',
        email: 'manager@antigravity.com',
        role: 'manager',
        password: 'password'
    }
];
