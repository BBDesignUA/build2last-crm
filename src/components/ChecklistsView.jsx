import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, GripVertical, ChevronDown, Check, Type, AlignLeft, CheckSquare, Image as ImageIcon, Briefcase } from 'lucide-react';

/* 
  ChecklistsView - Allows managing different workflows.
  A workflow contains an array of stages.
  Each stage contains an array of tasks.
  Each task has a specific field type (text, generic toggle, dropdown etc). 
*/

export const ChecklistsView = ({ checklists, onUpdateChecklists }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'editor'
    const [editingChecklist, setEditingChecklist] = useState(null);

    const handleCreateNew = () => {
        const newChecklist = {
            id: `wf-${Date.now()}`,
            name: 'Untitled Workflow',
            description: '',
            stages: []
        };
        setEditingChecklist(newChecklist);
        setViewMode('editor');
    };

    const handleSave = () => {
        if (!editingChecklist.name.trim()) return;

        const existingIndex = checklists.findIndex(c => c.id === editingChecklist.id);
        let newChecklists;

        if (existingIndex >= 0) {
            newChecklists = [...checklists];
            newChecklists[existingIndex] = editingChecklist;
        } else {
            newChecklists = [...checklists, editingChecklist];
        }

        onUpdateChecklists(newChecklists);
        setViewMode('list');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this workflow?')) {
            onUpdateChecklists(checklists.filter(c => c.id !== id));
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-title font-bold tracking-tight uppercase text-gray-900 leading-none">
                        {viewMode === 'list' ? 'Workflow Builder' : 'Edit Workflow'}
                    </h1>
                    <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">
                        {viewMode === 'list' ? 'Manage Custom Checklists' : 'Configure Stages & Fields'}
                    </p>
                </div>

                {viewMode === 'list' ? (
                    <button
                        onClick={handleCreateNew}
                        className="px-6 py-3 rounded-2xl bg-primary shadow-lg shadow-primary/20 font-title font-bold text-xs uppercase tracking-widest text-white hover:opacity-90 transition-all flex items-center gap-2 active:scale-[0.98]"
                    >
                        <Plus size={16} />
                        Create Workflow
                    </button>
                ) : (
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setViewMode('list')}
                            className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-500 font-title font-bold text-xs uppercase tracking-widest hover:text-gray-900 transition-colors flex items-center gap-2"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!editingChecklist?.name?.trim()}
                            className="px-6 py-3 rounded-2xl bg-primary shadow-lg shadow-primary/20 font-title font-bold text-xs uppercase tracking-widest text-white hover:opacity-90 transition-all flex items-center gap-2 active:scale-[0.98] disabled:opacity-50"
                        >
                            <Save size={16} />
                            Save
                        </button>
                    </div>
                )}
            </div>

            <div className="flex-1 min-h-0 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden relative">
                {viewMode === 'list' ? (
                    <WorkflowList
                        checklists={checklists}
                        onEdit={(wf) => { setEditingChecklist({ ...wf }); setViewMode('editor'); }}
                        onDelete={handleDelete}
                    />
                ) : (
                    <WorkflowEditor
                        workflow={editingChecklist}
                        onChange={setEditingChecklist}
                    />
                )}
            </div>
        </div>
    );
};

const WorkflowList = ({ checklists, onEdit, onDelete }) => {
    if (checklists.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-12">
                <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center mb-6">
                    <Briefcase size={32} className="opacity-50" />
                </div>
                <h2 className="text-2xl font-title font-bold uppercase tracking-widest text-gray-900 mb-2">No Workflows</h2>
                <p className="font-body text-sm max-w-md text-center">Create a custom workflow template with stages and dynamic fields to standardize your operations.</p>
            </div>
        );
    }

    return (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto h-full">
            {checklists.map(wf => (
                <div key={wf.id} className="bg-gray-50 border border-gray-100 p-6 rounded-[2rem] hover:border-primary/30 transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                            <Briefcase size={20} />
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => onEdit(wf)} className="p-2 text-gray-400 hover:text-primary transition-colors bg-white rounded-xl shadow-sm"><Edit size={16} /></button>
                            <button onClick={() => onDelete(wf.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-xl shadow-sm"><Trash2 size={16} /></button>
                        </div>
                    </div>
                    <h3 className="text-xl font-title font-bold text-gray-900 uppercase tracking-tight mb-2 truncate">{wf.name}</h3>
                    <p className="text-xs font-body text-gray-500 mb-6 line-clamp-2 min-h-[32px]">{wf.description || 'No description provided.'}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/60">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{wf.stages.length} Stages</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{wf.stages.reduce((acc, s) => acc + s.tasks.length, 0)} Fields</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ... Editor Components to be continued ...
const WorkflowEditor = ({ workflow, onChange }) => {
    const handleUpdate = (field, value) => {
        onChange({ ...workflow, [field]: value });
    };

    const addStage = () => {
        const newStage = {
            id: `stage-${Date.now()}`,
            name: 'New Stage',
            tasks: []
        };
        handleUpdate('stages', [...workflow.stages, newStage]);
    };

    const updateStage = (stageId, field, value) => {
        const updatedStages = workflow.stages.map(s =>
            s.id === stageId ? { ...s, [field]: value } : s
        );
        handleUpdate('stages', updatedStages);
    };

    const deleteStage = (stageId) => {
        handleUpdate('stages', workflow.stages.filter(s => s.id !== stageId));
    };

    const addTaskToStage = (stageId) => {
        const newTask = {
            id: `task-${Date.now()}`,
            type: 'checkbox', // 'checkbox', 'text', 'dropdown', 'image'
            label: 'New Task',
            description: '',
            required: false,
            options: [] // for dropdowns
        };
        const updatedStages = workflow.stages.map(s => {
            if (s.id === stageId) {
                return { ...s, tasks: [...s.tasks, newTask] };
            }
            return s;
        });
        handleUpdate('stages', updatedStages);
    };

    const updateTask = (stageId, taskId, field, value) => {
        const updatedStages = workflow.stages.map(s => {
            if (s.id === stageId) {
                return {
                    ...s,
                    tasks: s.tasks.map(t => t.id === taskId ? { ...t, [field]: value } : t)
                };
            }
            return s;
        });
        handleUpdate('stages', updatedStages);
    };

    const deleteTask = (stageId, taskId) => {
        const updatedStages = workflow.stages.map(s => {
            if (s.id === stageId) {
                return { ...s, tasks: s.tasks.filter(t => t.id !== taskId) };
            }
            return s;
        });
        handleUpdate('stages', updatedStages);
    };

    return (
        <div className="h-full flex">
            {/* Sidebar for Workflow Meta */}
            <div className="w-80 border-r border-gray-100 bg-gray-50/50 p-6 flex flex-col h-full overflow-y-auto">
                <div className="mb-6">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Workflow Name</label>
                    <input
                        type="text"
                        value={workflow.name}
                        onChange={(e) => handleUpdate('name', e.target.value)}
                        placeholder="e.g. Roof Replacement"
                        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none font-title font-bold text-gray-900 placeholder:font-body placeholder:font-normal"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Description</label>
                    <textarea
                        value={workflow.description}
                        onChange={(e) => handleUpdate('description', e.target.value)}
                        placeholder="Brief description of when to use this workflow..."
                        rows={4}
                        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none"
                    />
                </div>

                <div className="mt-auto">
                    <button
                        onClick={addStage}
                        className="w-full py-3 rounded-2xl border-2 border-dashed border-primary/30 text-primary font-title font-bold text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={14} />
                        Add New Stage
                    </button>
                </div>
            </div>

            {/* Main Stage Editor */}
            <div className="flex-1 p-8 overflow-y-auto bg-gray-50/30">
                {workflow.stages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm">
                            <Plus size={24} className="text-primary" />
                        </div>
                        <p className="font-title text-sm uppercase tracking-widest">No stages added yet</p>
                        <p className="font-body text-xs mt-1">Add a stage from the sidebar to begin building the workflow.</p>
                    </div>
                ) : (
                    <div className="space-y-8 max-w-4xl mx-auto">
                        {workflow.stages.map((stage, stageIndex) => (
                            <div key={stage.id} className="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                                    <div className="flex-1 flex items-center gap-4 w-full">
                                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center font-title font-bold text-gray-400 shrink-0">
                                            {stageIndex + 1}
                                        </div>
                                        <input
                                            type="text"
                                            value={stage.name}
                                            onChange={(e) => updateStage(stage.id, 'name', e.target.value)}
                                            placeholder="Stage Name"
                                            className="bg-transparent border-none text-lg font-title font-bold uppercase tracking-tight text-gray-900 focus:ring-0 p-0 w-full placeholder:text-gray-300"
                                        />
                                    </div>
                                    <button
                                        onClick={() => deleteStage(stage.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-2 shrink-0"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="p-6 space-y-4 bg-gray-50/10">
                                    {stage.tasks.map((task) => (
                                        <TaskEditorItem
                                            key={task.id}
                                            task={task}
                                            onUpdate={(field, val) => updateTask(stage.id, task.id, field, val)}
                                            onDelete={() => deleteTask(stage.id, task.id)}
                                        />
                                    ))}

                                    <button
                                        onClick={() => addTaskToStage(stage.id)}
                                        className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 font-title font-bold text-[10px] uppercase tracking-widest hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center gap-2 mt-4"
                                    >
                                        <Plus size={14} />
                                        Add Checklist Action
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const TaskEditorItem = ({ task, onUpdate, onDelete }) => {
    const fieldTypes = [
        { id: 'checkbox', icon: CheckSquare, label: 'Standard Checkbox' },
        { id: 'text', icon: Type, label: 'Text Input' },
        { id: 'dropdown', icon: ChevronDown, label: 'Dropdown Select' },
        { id: 'image', icon: ImageIcon, label: 'Image Upload' }
    ];

    const handleAddOption = () => {
        onUpdate('options', [...task.options, 'New Option']);
    };

    const updateOption = (index, val) => {
        const newOpts = [...task.options];
        newOpts[index] = val;
        onUpdate('options', newOpts);
    };

    const removeOption = (index) => {
        onUpdate('options', task.options.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 group">
            <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={task.label}
                            onChange={(e) => onUpdate('label', e.target.value)}
                            placeholder="Action Title"
                            className="bg-gray-50 border border-transparent hover:border-gray-200 focus:border-primary/30 focus:bg-white rounded-xl px-3 py-2 text-sm font-bold text-gray-900 w-full outline-none transition-all"
                        />
                    </div>
                    <div className="shrink-0 w-48 relative">
                        <select
                            value={task.type}
                            onChange={(e) => onUpdate('type', e.target.value)}
                            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 pr-8 text-xs font-title font-bold tracking-widest uppercase text-gray-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                        >
                            {fieldTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.label}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={task.description}
                        onChange={(e) => onUpdate('description', e.target.value)}
                        placeholder="Optional description or instructions for the user..."
                        className="bg-transparent border-none text-xs text-gray-500 w-full focus:ring-0 p-0 ml-1 italic placeholder:text-gray-300"
                    />

                    {task.type === 'dropdown' && (
                        <div className="mt-3 pl-1 border-l-2 border-primary/20 ml-2 space-y-2">
                            {task.options.map((opt, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                                    <input
                                        type="text"
                                        value={opt}
                                        onChange={(e) => updateOption(idx, e.target.value)}
                                        className="bg-gray-50 border border-gray-100 rounded-lg px-2 py-1 text-xs outline-none flex-1 focus:border-primary/30"
                                    />
                                    <button onClick={() => removeOption(idx)} className="text-gray-400 hover:text-red-500"><X size={12} /></button>
                                </div>
                            ))}
                            <button onClick={handleAddOption} className="text-[10px] font-bold text-primary uppercase tracking-widest pl-4 flex items-center gap-1">
                                <Plus size={10} /> Add Option
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="shrink-0 flex items-start gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-4">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 cursor-pointer bg-gray-50 px-2 py-1 rounded-lg">
                    <input
                        type="checkbox"
                        checked={task.required}
                        onChange={(e) => onUpdate('required', e.target.checked)}
                        className="rounded bg-white border-gray-300 text-primary focus:ring-primary"
                    />
                    Required
                </label>
                <button
                    onClick={onDelete}
                    className="p-1 px-2 rounded-lg text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};
