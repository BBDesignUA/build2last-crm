Act as an expert Senior Frontend Software Engineer and UI/UX Designer who specializes in building iPad-optimized web applications using React and Tailwind CSS.

I am building a frontend-only prototype for a home renovation company called "Build 2 Last". Currently, they manage jobs using a disconnected CRM (Leap) and a 14-tab Google Sheet called a Job Flow Checklist (JFC). I need to consolidate these into a single, unified internal management system that is highly optimized for an iPad.

I want you to generate the complete frontend code for a fully functional, interactive prototype of the "Internal Management System." It must include a global search bar, a Kanban-style CRM pipeline, and a dynamic Job Dashboard that replaces the 14-tab spreadsheet. We are focusing *only* on the frontend. Do not include or write any backend, database, or API integrations. Use local mock JSON data for everything.

Use the following tech stack:

* React 18 (using Vite for the build tool)  
* Tailwind CSS 3  
* Framer Motion (for iPad-style slide/swipe interactions)  
* Lucide React (for icons)

The UI must strictly adhere to this design system:

* **Primary Action Color:** `#ec1c24` (Use for primary buttons, active tabs, notifications).  
* **Secondary/Sidebar Color:** `#020d1c` (Use for the main navigation sidebar).  
* **Text Color:** `#111111`.  
* **Typography:** Google Fonts 'Oswald' for all titles/headers, and 'Inter' for all paragraphs, inputs, and checklist items.

*(If you have a boilerplate repository or a specific UI library component you like, insert the link or code snippet here. For example: "Use a Kanban drag-and-drop structure similar to `@hello-pangea/dnd`.")*

Please build this in the following phases:

1. **Layout Setup:** Create the iPad landscape shell. Sidebar on the left (`#020d1c`), and a top header with a "Global Client Search" bar to quickly pull up client details.  
2. **Pipeline View (CRM):** Create a Kanban board with columns for job stages (e.g., Estimate, Production, Completed). Add draggable Job Cards containing a client name, trade (Roofing/Siding), and a quick-call icon.  
3. **Job Dashboard (JFC Replacement):** When a card is clicked, open a modal with a split view. The left side is a dynamic checklist that changes based on the job's current pipeline stage. The right side has tabs for "Pricing", "Photos", and "Communications".

**Plan for Things Going Wrong**

* **iPad Touch Targets:** Since this is for an iPad, buttons and checklist items must have a minimum touch target height of 44px. Do not use tiny, mouse-centric checkboxes.  
* **Empty States:** If a pipeline column has no jobs, or a search yields no results, display a cleanly styled empty state message using the 'Inter' font.  
* **Data Structure:** If the mock JSON data is missing a field (e.g., a client has no phone number), ensure the UI does not break and renders a fallback like "N/A".

Ensure all interactive elements update the local React state. Do *not* attempt to write `fetch` calls to an external server, as I previously stated this is a frontend-only prototype with mock data.

Before writing the code, please outline your proposed React component tree and the structure of the mock JSON data you plan to use.

Once you have outlined your thoughts, provide the complete, copy-pasteable code blocks for `App.jsx`, the main layout components, the Kanban board, and the dynamic dashboard. Include the `tailwind.config.js` settings required for the custom fonts and colors.

If any part of these requirements is unclear, or if you need me to define the exact checklist items for the "Estimate" vs. "Production" stages before you begin coding, please ask me before generating the code.

