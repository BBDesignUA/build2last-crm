import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, RotateCcw, ChevronDown, ChevronUp, DollarSign, Percent, Info } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────
const PITCH_LABELS = {
  '3-6': '3–6', '7-8': '7–8', '9-11': '9–11',
  '12-13': '12–13', '14-17': '14–17', '18+': '18+',
};

const LAYER_LABELS = { '1layer': '1 Layer', '2layer': '2 Layers' };

const PIPE_SIZES = ['1.5', '2.0', '3.0', '4.0'];
const PIPE_MATERIALS = ['iron', 'copper', 'pvc'];

const formatKey = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

// Price cell editor
const PriceCell = ({ value, onChange, prefix = '$', small = false }) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">{prefix}</span>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className={`w-full bg-gray-50 border border-gray-200 rounded-xl pl-7 pr-3 text-right font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary/30 focus:bg-white transition-all outline-none ${small ? 'h-9 text-xs' : 'h-11 text-sm'}`}
    />
  </div>
);

// Section wrapper
const Section = ({ title, description, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
      >
        <div className="text-left">
          <h3 className="font-title font-bold text-sm uppercase tracking-widest text-gray-900">{title}</h3>
          {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
        </div>
        {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-6 border-t border-gray-50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── TABS ─────────────────────────────────────────────
const TABS = [
  { id: 'shingle-metal', label: 'Shingle & Metal' },
  { id: 'trim-edges', label: 'Trim & Edges' },
  { id: 'penetrations', label: 'Penetrations' },
  { id: 'skylights', label: 'Skylights' },
  { id: 'chimneys', label: 'Chimneys' },
  { id: 'small-jobs', label: 'Small Jobs' },
  { id: 'global-rules', label: 'Global Rules' },
];

// ─── Main Component ───────────────────────────────────
export const RoofingPricingModel = ({ model, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('shingle-metal');
  const [localModel, setLocalModel] = useState(JSON.parse(JSON.stringify(model)));
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = (path, value) => {
    const updated = JSON.parse(JSON.stringify(localModel));
    const keys = path.split('.');
    let obj = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setLocalModel(updated);
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate(localModel);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalModel(JSON.parse(JSON.stringify(model)));
    setHasChanges(false);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 flex-shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-2xl font-title font-bold text-[11px] uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === tab.id
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'bg-white border border-gray-100 text-gray-500 hover:text-gray-900 hover:border-gray-200'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-6"
          >
            {activeTab === 'shingle-metal' && (
              <ShingleMetalTab model={localModel} updateField={updateField} />
            )}
            {activeTab === 'trim-edges' && (
              <TrimEdgesTab model={localModel} updateField={updateField} />
            )}
            {activeTab === 'penetrations' && (
              <PenetrationsTab model={localModel} updateField={updateField} />
            )}
            {activeTab === 'skylights' && (
              <SkylightsTab model={localModel} updateField={updateField} />
            )}
            {activeTab === 'chimneys' && (
              <ChimneysTab model={localModel} updateField={updateField} />
            )}
            {activeTab === 'small-jobs' && (
              <SmallJobsTab model={localModel} updateField={updateField} />
            )}
            {activeTab === 'global-rules' && (
              <GlobalRulesTab model={localModel} updateField={updateField} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Save Bar */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 flex items-center justify-center gap-4 z-40 shadow-2xl"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 mr-4">
              <Info size={14} />
              You have unsaved changes
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-2xl border border-gray-200 text-gray-600 font-title font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-3 rounded-2xl bg-primary text-white font-title font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2"
            >
              <Save size={14} />
              Save Changes
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Tab: Shingle & Metal Base Pricing ────────────────
const ShingleMetalTab = ({ model, updateField }) => {
  const pitchKeys = Object.keys(PITCH_LABELS);
  const layerKeys = Object.keys(LAYER_LABELS);

  const renderTable = (systemKey, label) => (
    <Section title={`${label} Shingles — Per Square`} description={`Base pricing for ${label} system by pitch and layer count`}>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 pb-3 pr-4">Pitch</th>
              {layerKeys.map(lk => (
                <th key={lk} className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 pb-3 px-2">{LAYER_LABELS[lk]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pitchKeys.map(pk => (
              <tr key={pk} className="border-t border-gray-50">
                <td className="py-3 pr-4">
                  <span className="text-sm font-bold text-gray-700">{PITCH_LABELS[pk]}</span>
                </td>
                {layerKeys.map(lk => {
                  const fieldKey = `${pk}_${lk}`;
                  return (
                    <td key={lk} className="py-3 px-2">
                      <PriceCell
                        value={model.shingleMetalBase[systemKey][fieldKey]}
                        onChange={(v) => updateField(`shingleMetalBase.${systemKey}.${fieldKey}`, v)}
                        small
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );

  return (
    <>
      {renderTable('gaf', 'GAF')}
      {renderTable('tamko', 'Tamko')}
      {renderTable('metal', 'Metal Roofing')}

      {/* Flat Roofing */}
      <Section title="Flat Roofing — Base Per Square" description="Base pricing for flat roof systems by layer count">
        <div className="mt-4 grid grid-cols-3 gap-4">
          {Object.entries(model.flatRoofing.base).map(([key, val]) => (
            <div key={key}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                {key.replace('layer', ' Layer')}
              </label>
              <PriceCell value={val} onChange={(v) => updateField(`flatRoofing.base.${key}`, v)} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Flat Roofing — Components" description="Per-item pricing for flat roof components" defaultOpen={false}>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(model.flatRoofing.components).map(([key, val]) => (
            <div key={key}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{formatKey(key)}</label>
              <PriceCell value={val} onChange={(v) => updateField(`flatRoofing.components.${key}`, v)} small />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

// ─── Tab: Trim & Edges ──────────────────────────────
const TrimEdgesTab = ({ model, updateField }) => {
  const renderTrimSection = (sectionKey, label, desc) => (
    <Section title={label} description={desc}>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(model.trimEdges[sectionKey]).map(([key, val]) => (
          <div key={key}>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{formatKey(key)}</label>
            <PriceCell value={val} onChange={(v) => updateField(`trimEdges.${sectionKey}.${key}`, v)} small />
          </div>
        ))}
      </div>
    </Section>
  );

  return (
    <>
      {renderTrimSection('standard', 'Standard (Shingle) — Per LF', 'Linear foot pricing for standard shingle trim components')}
      {renderTrimSection('metal_walkable', 'Metal Roof (Walkable) — Per LF', 'Linear foot pricing for walkable metal roof trim')}
      {renderTrimSection('metal_non_walkable', 'Metal Roof (Non-Walkable) — Per LF', 'Linear foot pricing for non-walkable metal roof trim')}
    </>
  );
};

// ─── Tab: Penetrations ──────────────────────────────
const PenetrationsTab = ({ model, updateField }) => (
  <>
    <Section title="Pipes — Per Item" description="Pricing by pipe size and material (Iron, Copper, PVC)">
      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 pb-3 pr-4">Size</th>
              {PIPE_MATERIALS.map(m => (
                <th key={m} className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 pb-3 px-2">{m.charAt(0).toUpperCase() + m.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PIPE_SIZES.map(size => (
              <tr key={size} className="border-t border-gray-50">
                <td className="py-3 pr-4"><span className="text-sm font-bold text-gray-700">{size}"</span></td>
                {PIPE_MATERIALS.map(mat => {
                  const fieldKey = `${size}_${mat}`;
                  return (
                    <td key={mat} className="py-3 px-2">
                      <PriceCell
                        value={model.penetrations.pipes[fieldKey]}
                        onChange={(v) => updateField(`penetrations.pipes.${fieldKey}`, v)}
                        small
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>

    <Section title="Metal Pipe Upcharges" description="Additional charge for metal roofing pipe penetrations">
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(model.penetrations.metalPipeUpcharges).map(([key, val]) => (
          <div key={key}>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{formatKey(key)}</label>
            <PriceCell value={val} onChange={(v) => updateField(`penetrations.metalPipeUpcharges.${key}`, v)} small />
          </div>
        ))}
      </div>
    </Section>

    <Section title="Ventilation — Per Item" description="Pricing for bath vents and attic roof fans">
      <div className="mt-4 grid grid-cols-2 gap-4">
        {Object.entries(model.penetrations.ventilation).map(([key, val]) => (
          <div key={key}>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{formatKey(key)}</label>
            <PriceCell value={val} onChange={(v) => updateField(`penetrations.ventilation.${key}`, v)} />
          </div>
        ))}
      </div>
    </Section>

    <Section title="Plywood Decking — Per Sheet" description="Pricing for plywood decking replacement">
      <div className="mt-4 grid grid-cols-2 gap-4">
        {Object.entries(model.penetrations.plywood).map(([key, val]) => (
          <div key={key}>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{key}" Plywood</label>
            <PriceCell value={val} onChange={(v) => updateField(`penetrations.plywood.${key}`, v)} />
          </div>
        ))}
      </div>
    </Section>
  </>
);

// ─── Tab: Skylights ─────────────────────────────────
const SkylightsTab = ({ model, updateField }) => {
  const models = Object.keys(model.skylights.models);

  return (
    <>
      <Section title="Skylight Models" description="Base fixed price, vented price, and labor cost per model">
        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 pb-3 pr-4">Model</th>
                <th className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 pb-3 px-2">Fixed Price</th>
                <th className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 pb-3 px-2">Vented Price</th>
                <th className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 pb-3 px-2">Labor Cost</th>
              </tr>
            </thead>
            <tbody>
              {models.map(m => (
                <tr key={m} className="border-t border-gray-50">
                  <td className="py-3 pr-4">
                    <span className="text-sm font-bold text-gray-700">{m}</span>
                  </td>
                  <td className="py-3 px-2">
                    <PriceCell
                      value={model.skylights.models[m].fixedPrice}
                      onChange={(v) => updateField(`skylights.models.${m}.fixedPrice`, v)}
                      small
                    />
                  </td>
                  <td className="py-3 px-2">
                    <PriceCell
                      value={model.skylights.models[m].ventedPrice}
                      onChange={(v) => updateField(`skylights.models.${m}.ventedPrice`, v)}
                      small
                    />
                  </td>
                  <td className="py-3 px-2">
                    <PriceCell
                      value={model.skylights.models[m].laborCost}
                      onChange={(v) => updateField(`skylights.models.${m}.laborCost`, v)}
                      small
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Pitch Multipliers" description="Multiplier applied to skylight cost based on roof pitch">
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(model.skylights.pitchMultipliers).map(([key, val]) => (
            <div key={key}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Pitch {PITCH_LABELS[key] || key}</label>
              <PriceCell value={val} onChange={(v) => updateField(`skylights.pitchMultipliers.${key}`, v)} prefix="×" />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

// ─── Tab: Chimneys ──────────────────────────────────
const ChimneysTab = ({ model, updateField }) => {
  const materialLabels = {
    w_siding: 'w/ Siding',
    w_brick_stucco: 'w/ Brick/Stucco',
    w_smooth_stone: 'w/ Smooth Stone',
    w_jagged_stone: 'w/ Jagged Stone',
  };

  const renderChimneySection = (metalKey, label) => (
    <Section title={`${label} Rates — Per LF`} description={`Chimney flashing rates for ${label.toLowerCase()}`}>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {Object.entries(model.chimneyRates[metalKey]).map(([key, val]) => (
          <div key={key}>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
              {label} {materialLabels[key] || formatKey(key)}
            </label>
            <PriceCell value={val} onChange={(v) => updateField(`chimneyRates.${metalKey}.${key}`, v)} />
          </div>
        ))}
      </div>
    </Section>
  );

  return (
    <>
      {renderChimneySection('aluminum', 'Aluminum')}
      {renderChimneySection('copper', 'Copper')}
    </>
  );
};

// ─── Tab: Small Jobs ────────────────────────────────
const SmallJobsTab = ({ model, updateField }) => {
  const sections = [
    { key: 'gutterCleaning', label: 'Gutter Cleaning Factors', desc: 'Pitch and floor factors for gutter cleaning pricing' },
    { key: 'smallRoofRepair', label: 'Small Roof Repair', desc: 'Setup and component costs for small roof repairs' },
    { key: 'smallSidingRepair', label: 'Small Siding Repair', desc: 'Setup and component costs for small siding repairs' },
    { key: 'smallCappingRepair', label: 'Small Capping Repair', desc: 'Setup and component costs for capping repairs' },
    { key: 'smallGutterRepair', label: 'Small Gutter Repair', desc: 'Setup and component costs for gutter repairs' },
    { key: 'smallGutterReplacement', label: 'Small Gutter Replacement', desc: 'Full gutter replacement pricing components' },
  ];

  return (
    <>
      {/* Gutter Cleaning - special layout */}
      <Section title="Gutter Cleaning Factors" description="Pitch and floor factors for gutter cleaning pricing">
        <div className="mt-4 space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Pitch Factors</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(model.smallJobs.gutterCleaning.pitchFactors).map(([key, val]) => (
                <div key={key}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Pitch {key}</label>
                  <PriceCell value={val} onChange={(v) => updateField(`smallJobs.gutterCleaning.pitchFactors.${key}`, v)} prefix="×" small />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Floor Factors</h4>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(model.smallJobs.gutterCleaning.floorFactors).map(([key, val]) => (
                <div key={key}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{key} Floor</label>
                  <PriceCell value={val} onChange={(v) => updateField(`smallJobs.gutterCleaning.floorFactors.${key}`, v)} prefix="×" small />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Other small job sections */}
      {sections.filter(s => s.key !== 'gutterCleaning').map(section => (
        <Section key={section.key} title={section.label} description={section.desc} defaultOpen={false}>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(model.smallJobs[section.key]).map(([key, val]) => (
              <div key={key}>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{formatKey(key)}</label>
                <PriceCell value={val} onChange={(v) => updateField(`smallJobs.${section.key}.${key}`, v)} small />
              </div>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
};

// ─── Tab: Global Rules ──────────────────────────────
const GlobalRulesTab = ({ model, updateField }) => (
  <>
    <Section title="Minimum Job Upcharges" description="Automatic upcharge applied when job total falls below threshold">
      <div className="mt-4 space-y-6">
        {[1, 2, 3].map(tier => (
          <div key={tier} className="flex items-end gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                Tier {tier} — If Job Under
              </label>
              <PriceCell
                value={model.globalRules[`upcharge_tier_${tier}_threshold`]}
                onChange={(v) => updateField(`globalRules.upcharge_tier_${tier}_threshold`, v)}
              />
            </div>
            <div className="text-gray-400 font-bold text-xl pb-2">→</div>
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                Upcharge Amount
              </label>
              <PriceCell
                value={model.globalRules[`upcharge_tier_${tier}_amount`]}
                onChange={(v) => updateField(`globalRules.upcharge_tier_${tier}_amount`, v)}
              />
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Global Discount" description="Default discount percentage applied to all jobs">
      <div className="mt-4 max-w-sm">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Discount Percentage</label>
        <div className="relative">
          <input
            type="number"
            step="0.01"
            value={model.globalRules.global_discount_percentage}
            onChange={(e) => updateField('globalRules.global_discount_percentage', parseFloat(e.target.value) || 0)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 h-12 text-right font-mono text-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30 focus:bg-white transition-all outline-none"
          />
          <Percent size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <p className="text-xs text-gray-400 mt-2">Current default: {model.globalRules.global_discount_percentage}%</p>
      </div>
    </Section>

    {/* Calculation Preview */}
    <Section title="Calculation Preview" description="How upcharges and discounts are applied to the final quote">
      <div className="mt-4 bg-gray-50 rounded-xl p-6 space-y-3 font-mono text-sm">
        <p className="text-gray-600">
          <span className="text-gray-400">1.</span> Raw_Subtotal = Base_Roof + Trim + Addons + Skylights + Chimneys + Small_Jobs + Misc
        </p>
        <p className="text-gray-600">
          <span className="text-gray-400">2.</span> IF Raw_Subtotal {'<'} ${model.globalRules.upcharge_tier_1_threshold.toLocaleString()} → Upcharge = ${model.globalRules.upcharge_tier_1_amount.toLocaleString()}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-400">3.</span> ELSE IF Raw_Subtotal {'<'} ${model.globalRules.upcharge_tier_2_threshold.toLocaleString()} → Upcharge = ${model.globalRules.upcharge_tier_2_amount.toLocaleString()}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-400">4.</span> ELSE IF Raw_Subtotal {'<'} ${model.globalRules.upcharge_tier_3_threshold.toLocaleString()} → Upcharge = ${model.globalRules.upcharge_tier_3_amount.toLocaleString()}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-400">5.</span> Gross_Job_Cost = Raw_Subtotal + Upcharge
        </p>
        <p className="text-gray-600">
          <span className="text-gray-400">6.</span> Discount = Gross_Job_Cost × {model.globalRules.global_discount_percentage}%
        </p>
        <p className="text-primary font-bold">
          <span className="text-gray-400">7.</span> Final_Quote = Gross_Job_Cost − Discount
        </p>
      </div>
    </Section>
  </>
);
