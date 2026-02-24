// Default Roofing Pricing Model Data
// Based on Roofing Pricing.md specification

export const DEFAULT_ROOFING_PRICING = {
  id: 'model-roofing',
  name: 'Roofing',
  description: 'Complete roofing pricing model including shingles, metal, flat roofing, trim, penetrations, skylights, chimneys, small jobs, and global rules.',
  icon: 'Home',
  createdAt: '2026-01-15',
  updatedAt: '2026-01-15',

  // Section 1: Shingle & Metal Base Pricing (Per Square)
  shingleMetalBase: {
    gaf: {
      '3-6_1layer': 350, '3-6_2layer': 425,
      '7-8_1layer': 400, '7-8_2layer': 480,
      '9-11_1layer': 475, '9-11_2layer': 560,
      '12-13_1layer': 550, '12-13_2layer': 640,
      '14-17_1layer': 650, '14-17_2layer': 750,
      '18+_1layer': 800, '18+_2layer': 920,
    },
    tamko: {
      '3-6_1layer': 320, '3-6_2layer': 395,
      '7-8_1layer': 370, '7-8_2layer': 450,
      '9-11_1layer': 445, '9-11_2layer': 530,
      '12-13_1layer': 520, '12-13_2layer': 610,
      '14-17_1layer': 620, '14-17_2layer': 720,
      '18+_1layer': 770, '18+_2layer': 890,
    },
    metal: {
      '3-6_1layer': 650, '3-6_2layer': 750,
      '7-8_1layer': 720, '7-8_2layer': 825,
      '9-11_1layer': 820, '9-11_2layer': 935,
      '12-13_1layer': 950, '12-13_2layer': 1070,
      '14-17_1layer': 1100, '14-17_2layer': 1230,
      '18+_1layer': 1300, '18+_2layer': 1450,
    },
  },

  // Flat Roofing
  flatRoofing: {
    base: {
      '1layer': 300, '2layer': 400, '3layer': 500,
    },
    components: {
      slag_stop_edge: 12,
      drip_edge: 8,
      custom_edge_metal: 25,
      flat_pipes: 85,
      flat_skylight_1: 350,
      flat_skylight_2: 500,
      small_heat: 150,
      vent_2: 75,
      vent_3: 95,
      wall_less_than_3ft_tall_ac_unit_lf: 18,
      wire_pipe_pitch_pocket: 125,
      small_heater_stack: 200,
      large_heater_stack: 350,
      scupper_boxes: 275,
      roof_drains: 325,
    },
    materialTypes: ['Modified', 'TPO', 'EPDM'],
  },

  // Section 2: Trim & Edge Components (Per Linear Foot)
  trimEdges: {
    standard: {
      ridge: 8, ridge_vent: 12, hip: 10, valley: 14,
      rake: 7, eave: 6, flashing: 15, step_flashing: 12,
    },
    metal_walkable: {
      ridge: 18, ridge_vent: 22, hip: 20, valley: 24,
      rake: 16, eave: 14,
    },
    metal_non_walkable: {
      ridge: 24, ridge_vent: 28, hip: 26, valley: 30,
      rake: 22, eave: 20,
    },
  },

  // Section 3: Penetrations, Vents & Decking (Per Item)
  penetrations: {
    pipes: {
      '1.5_iron': 85, '1.5_copper': 120, '1.5_pvc': 65,
      '2.0_iron': 95, '2.0_copper': 135, '2.0_pvc': 75,
      '3.0_iron': 110, '3.0_copper': 155, '3.0_pvc': 85,
      '4.0_iron': 130, '4.0_copper': 180, '4.0_pvc': 100,
    },
    metalPipeUpcharges: {
      small_walkable: 35, small_non_walkable: 55,
      medium_walkable: 50, medium_non_walkable: 75,
      large_walkable: 70, large_non_walkable: 100,
    },
    ventilation: {
      '4_inch_bath_vent': 95,
      '6_inch_bath_vent': 120,
      'attic_roof_fan_3-8_pitch': 350,
      'attic_roof_fan_8-14_pitch': 500,
    },
    plywood: {
      '1/2': 65,
      '3/4': 85,
    },
  },

  // Section 4: Skylights & Multipliers
  skylights: {
    models: {
      C01: { fixedPrice: 350, ventedPrice: 500, laborCost: 250 },
      C04: { fixedPrice: 400, ventedPrice: 575, laborCost: 275 },
      C06: { fixedPrice: 450, ventedPrice: 625, laborCost: 300 },
      C08: { fixedPrice: 500, ventedPrice: 700, laborCost: 325 },
      D26: { fixedPrice: 550, ventedPrice: 750, laborCost: 350 },
      D06: { fixedPrice: 475, ventedPrice: 650, laborCost: 300 },
      M02: { fixedPrice: 375, ventedPrice: 525, laborCost: 275 },
      M04: { fixedPrice: 425, ventedPrice: 600, laborCost: 300 },
      M06: { fixedPrice: 475, ventedPrice: 675, laborCost: 325 },
      M08: { fixedPrice: 525, ventedPrice: 725, laborCost: 350 },
      S01: { fixedPrice: 350, ventedPrice: 500, laborCost: 250 },
      S06: { fixedPrice: 450, ventedPrice: 625, laborCost: 300 },
      '2222': { fixedPrice: 500, ventedPrice: 700, laborCost: 325 },
      '2234': { fixedPrice: 550, ventedPrice: 750, laborCost: 350 },
      '2246': { fixedPrice: 600, ventedPrice: 825, laborCost: 375 },
      '3030': { fixedPrice: 650, ventedPrice: 875, laborCost: 400 },
      '3046': { fixedPrice: 700, ventedPrice: 950, laborCost: 425 },
      '3434': { fixedPrice: 750, ventedPrice: 1000, laborCost: 450 },
      '3737': { fixedPrice: 800, ventedPrice: 1075, laborCost: 475 },
      '4622': { fixedPrice: 850, ventedPrice: 1125, laborCost: 500 },
      '4630': { fixedPrice: 900, ventedPrice: 1200, laborCost: 525 },
      '4646': { fixedPrice: 950, ventedPrice: 1275, laborCost: 550 },
    },
    pitchMultipliers: {
      '3-6': 1.0,
      '7-8': 1.2,
      '9-10': 1.5,
      '11-12': 1.8,
      '13-16': 2.0,
      '16+': 2.5,
    },
  },

  // Section 5: Chimney Material Rates
  chimneyRates: {
    aluminum: {
      w_siding: 18,
      w_brick_stucco: 25,
      w_smooth_stone: 30,
      w_jagged_stone: 38,
    },
    copper: {
      w_siding: 35,
      w_brick_stucco: 45,
      w_smooth_stone: 55,
      w_jagged_stone: 68,
    },
  },

  // Section 6: Small Jobs & Service Costs
  smallJobs: {
    gutterCleaning: {
      pitchFactors: { '0-3': 0.65, '4-6': 0.70, '7-8': 0.90, '9+': 1.80 },
      floorFactors: { '1st': 1, '2nd': 2, '3rd': 3 },
    },
    smallRoofRepair: {
      setup_cost: 350,
      gaf_shingles_needed: 200,
      other_shingle_match: 450,
      location_3x3: 150,
      pipe_collar: 200,
    },
    smallSidingRepair: {
      setup_cost: 400,
      siding_needed: 350,
      siding_match: 350,
      location_repair: 320,
      outside_corner: 980,
      dryer_vent: 70,
      gable_vent: 75,
    },
    smallCappingRepair: {
      setup_cost: 700,
      remove_reinstall_gutter_per_lf: 7,
      fascia_cap_no_gutter_per_lf: 45,
      rake_capping_10lf: 75,
      color_charge: 150,
      fascia_board_per_lf: 20,
    },
    smallGutterRepair: {
      setup_cost: 250,
      hidden_hangers_each: 7,
      corner_sealing_each: 45,
      downspout_install_each: 75,
    },
    smallGutterReplacement: {
      setup_cost: 400,
      gutters_5k: 13,
      gutters_6k: 15,
      spouts_2x3: 12,
      spouts_3x4: 14,
      gutter_guards_5k_low: 0,
      gutter_guards_5k_high: 0,
      gutter_guards_6k_low: 0,
      gutter_guards_6k_high: 0,
      half_round_5_traditional: 0,
      half_round_5_flat_fascia: 0,
      half_round_6_traditional: 0,
      half_round_6_flat_fascia: 0,
      round_spouts_4: 0,
      round_elbows_4: 0,
    },
  },

  // Section 7: Global Rules (Upcharges & Discounts)
  globalRules: {
    upcharge_tier_1_threshold: 5000,
    upcharge_tier_1_amount: 1500,
    upcharge_tier_2_threshold: 7500,
    upcharge_tier_2_amount: 1000,
    upcharge_tier_3_threshold: 10000,
    upcharge_tier_3_amount: 750,
    global_discount_percentage: 23.00,
  },
};

// All available pricing model templates
export const PRICING_MODEL_TEMPLATES = [
  {
    id: 'template-roofing',
    name: 'Roofing',
    description: 'Full roofing pricing with shingles, metal, flat, trim, penetrations, skylights, chimneys, small jobs & global rules.',
    icon: 'Home',
  },
  {
    id: 'template-siding',
    name: 'Siding',
    description: 'Siding installation and repair pricing model.',
    icon: 'Layers',
  },
  {
    id: 'template-gutters',
    name: 'Gutters',
    description: 'Gutter installation, replacement, and cleaning pricing.',
    icon: 'Droplets',
  },
  {
    id: 'template-windows',
    name: 'Windows',
    description: 'Window replacement and installation pricing model.',
    icon: 'Square',
  },
];
