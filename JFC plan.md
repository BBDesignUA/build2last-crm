Here is the updated development plan to accurately build the JFC functionality in our prototype:

### **1\. Architectural Update: The Tri-Tiered JSON Data Model**

To make the checklist truly dynamic, our mock JSON data structure needs a massive upgrade. The UI cannot just render a flat list; it must query the JSON based on two variables: currentStage and jobSize.

* **Job Sizes:** We must implement conditional logic for three distinct workflows:  
  * **Small Jobs:** Under $1,000.  
  * **Medium Jobs:** $1,000 \- $5,000.  
  * **Large Jobs:** Implicitly over $5,000 (following the primary 14-tab flow).  
* **Assignee Metadata:** Every task in the JSON must include an assignee key (e.g., "Perry", "John", "Assistant", "General").

### **2\. UI/UX Updates: The Dynamic Checklist Component**

We will update the "Job Dashboard" modal to reflect these new nuances while keeping the iPad touch-friendly design.

* **Size Toggle/Indicator:** At the top of the Job Dashboard, we will add a dropdown or toggle to set the Job Size (Small, Medium, Large). Changing this will instantly re-render the checklist below it to show the correct workflow.  
* **Assignee Badges:** Next to each checklist item, we will add a small, colored pill/badge denoting who is responsible.  
  * *Example:* \[Needs Perry\] in red \#ec1c24.  
  * *Example:* \[Needs John\] in a secondary color.  
  * *Example:* \[Needs Assistant\] in a distinct color.  
* **Expanded Pipeline Stages:** The Kanban board columns must be updated to mirror the highly specific JFC stages outlined in the document. Instead of generic columns, we will use:  
  * Lead  
  * Estimate Scheduled  
  * Estimate in Progress  
  * Job Prep  
  * Job Scheduled  
  * Job In Progress  
  * Job Post / Invoiced  
  * Completed / Paid

### **3\. Implementation Steps for the Code Agent**

When prompting your coding environment (or AI), you will need to give it these specific instructions for the JFC part:

* **Step 1: Build the Data File.** Create a jfc-data.json file. Structure it as a nested object: JobSize \-\> Stage \-\> Array of Tasks.  
* **Step 2: Component Props.** The DynamicChecklist.jsx component must accept currentStage and jobSize as props, and use them to filter which array of tasks to display from the JSON.  
* **Step 3: Initial Information Header.** The JFC requires capturing initial data right at the top. The dashboard header must include fields for: Customers Name, Spouses Name, Property Address, Email Address, Phone Number, and Notes.

