import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Home, Layers, Droplets, Square, ArrowLeft,
  Pencil, Trash2, Copy, Calendar, ChevronRight, Package
} from 'lucide-react';
import { PRICING_MODEL_TEMPLATES, DEFAULT_ROOFING_PRICING } from '../data/pricingData';
import { RoofingPricingModel } from './RoofingPricingModel';

const iconMap = { Home, Layers, Droplets, Square, Package };

const getIcon = (iconName) => iconMap[iconName] || Package;

export const PricingView = () => {
  const [pricingModels, setPricingModels] = useState([DEFAULT_ROOFING_PRICING]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddModel = (template) => {
    if (template.id === 'template-roofing') {
      const newModel = {
        ...DEFAULT_ROOFING_PRICING,
        id: `model-${Date.now()}`,
        name: `${template.name} - Copy`,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setPricingModels(prev => [...prev, newModel]);
    } else {
      // Placeholder for other models
      const newModel = {
        id: `model-${Date.now()}`,
        name: template.name,
        description: template.description,
        icon: template.icon,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setPricingModels(prev => [...prev, newModel]);
    }
    setShowAddModal(false);
  };

  const handleDeleteModel = (modelId) => {
    setPricingModels(prev => prev.filter(m => m.id !== modelId));
    if (selectedModel?.id === modelId) setSelectedModel(null);
  };

  const handleDuplicateModel = (model) => {
    const duplicate = {
      ...JSON.parse(JSON.stringify(model)),
      id: `model-${Date.now()}`,
      name: `${model.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setPricingModels(prev => [...prev, duplicate]);
  };

  const handleUpdateModel = (updatedModel) => {
    setPricingModels(prev => prev.map(m => m.id === updatedModel.id ? { ...updatedModel, updatedAt: new Date().toISOString().split('T')[0] } : m));
    setSelectedModel({ ...updatedModel, updatedAt: new Date().toISOString().split('T')[0] });
  };

  // If a model is selected, show its management page
  if (selectedModel) {
    const isRoofing = selectedModel.shingleMetalBase !== undefined;

    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setSelectedModel(null)}
            className="p-3 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all shadow-sm active:scale-[0.97]"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-4xl font-title font-bold tracking-tight uppercase text-gray-900 leading-none">{selectedModel.name}</h1>
            <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">Pricing Model Management</p>
          </div>
        </div>
        {isRoofing ? (
          <RoofingPricingModel model={selectedModel} onUpdate={handleUpdateModel} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Package size={64} className="mx-auto mb-4 opacity-40" />
              <h3 className="text-xl font-title font-bold uppercase tracking-widest mb-2">Coming Soon</h3>
              <p className="text-sm">This pricing model template is under development.</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-title font-bold tracking-tight uppercase text-gray-900 leading-none">Pricing Models</h1>
          <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">Manage Your Job Pricing Templates</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 rounded-2xl bg-primary shadow-lg shadow-primary/20 font-title font-bold text-xs uppercase tracking-widest text-white hover:opacity-90 transition-all flex items-center gap-2 active:scale-[0.98]"
        >
          <Plus size={16} />
          Add Model
        </button>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pricingModels.map((model) => {
          const Icon = getIcon(model.icon);
          return (
            <motion.div
              key={model.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group cursor-pointer"
              onClick={() => setSelectedModel(model)}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon size={28} className="text-primary" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDuplicateModel(model); }}
                    className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Duplicate"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteModel(model.id); }}
                    className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-title font-bold uppercase tracking-tight mb-2">{model.name}</h3>
              <p className="text-sm text-gray-500 mb-6 line-clamp-2">{model.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar size={12} />
                  <span>Updated {model.updatedAt}</span>
                </div>
                <div className="flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-wider">
                  Manage <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {pricingModels.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <Package size={64} className="mx-auto mb-4 opacity-40" />
            <h3 className="text-xl font-title font-bold uppercase tracking-widest mb-2">No Pricing Models</h3>
            <p className="text-sm mb-6">Create your first pricing model to get started.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 rounded-2xl bg-primary text-white font-title font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all"
            >
              <Plus size={16} className="inline mr-2" />
              Add Model
            </button>
          </div>
        </div>
      )}

      {/* Add Model Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-title font-bold uppercase tracking-tight mb-2">Add Pricing Model</h2>
              <p className="text-sm text-gray-500 mb-8">Select a template to create a new pricing model.</p>

              <div className="grid grid-cols-2 gap-4">
                {PRICING_MODEL_TEMPLATES.map((template) => {
                  const Icon = getIcon(template.icon);
                  return (
                    <button
                      key={template.id}
                      onClick={() => handleAddModel(template)}
                      className="p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 text-left transition-all group active:scale-[0.98]"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-colors">
                        <Icon size={24} className="text-gray-500 group-hover:text-primary transition-colors" />
                      </div>
                      <h4 className="font-title font-bold text-lg uppercase tracking-tight mb-1">{template.name}</h4>
                      <p className="text-xs text-gray-400">{template.description}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 rounded-2xl border border-gray-200 text-gray-600 font-title font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
