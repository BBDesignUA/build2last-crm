### **Part 1: Pricing Management Page (Admin Database Variables)**

This section outlines every exact field and base price variable that needs to be stored in database. The admin UI should be divided into these corresponding tabs or sections to manage these prices.

#### **1\. Shingle & Metal Base Pricing (Per Square/Facet)**

Create a matrix or list of fields for the base roof installation.

* **GAF Shingles:** `gaf_3-6_pitch_1_layer`, `gaf_3-6_pitch_2_layer`, `gaf_7-8_pitch_1_layer`, `gaf_7-8_pitch_2_layer`, `gaf_9-11_pitch_1_layer`, `gaf_9-11_pitch_2_layer`, `gaf_12-13_pitch_1_layer`, `gaf_12-13_pitch_2_layer`, `gaf_14-17_pitch_1_layer`, `gaf_14-17_pitch_2_layer`, `gaf_18+_pitch_1_layer`, `gaf_18+_pitch_2_layer`.  
* **Tamko Shingles:** Mirror the exact pitch and layer combinations above (e.g., `tamko_3-6_pitch_1_layer`).  
* **Metal Roofing:** Mirror the exact pitch and layer combinations above (e.g., `metal_3-6_pitch_1_layer`).  
* **Flat Roofing (Base & Components):** `sq_flat_1_layer`, `sq_flat_2_layer`, `sq_flat_3_layer`, `slag_stop_edge`, `drip_edge`, `custom_edge_metal`, `flat_pipes`, `flat_skylight_1`, `flat_skylight_2`, `small_heat`, `vent_2`, `vent_3`, `wall_less_than_3ft_tall_ac_unit_lf`, `wire_pipe_pitch_pocket`, `small_heater_stack`, `large_heater_stack`, `scupper_boxes`, `roof_drains`. *(Track materials: Modified, TPO, EPDM).*

#### **2\. Trim & Edge Components (Per Linear Foot)**

* **Standard (Shingle):** `ridge`, `ridge_vent`, `hip`, `valley`, `rake`, `eave`, `flashing`, `step_flashing`.  
* **Metal Roof (Walkable):** `metal_ridge_walkable`, `metal_ridge_vent_walkable`, `metal_hip_walkable`, `metal_valley_walkable`, `metal_rake_walkable`, `metal_eave_walkable`.  
* **Metal Roof (Non-Walkable):** `metal_ridge_non_walkable`, `metal_ridge_vent_non_walkable`, `metal_hip_non_walkable`, `metal_valley_non_walkable`, `metal_rake_non_walkable`, `metal_eave_non_walkable`.

#### **3\. Penetrations, Vents, & Decking (Per Item)**

* **Pipes (Iron, Copper, PVC):** Fields for `1.5_iron`, `1.5_copper`, `1.5_pvc`, `2.0_iron`, `2.0_copper`, `2.0_pvc`, `3.0_iron`, `3.0_copper`, `3.0_pvc`, `4.0_iron`, `4.0_copper`, `4.0_pvc`.  
* **Metal Pipe Upcharges:** `metal_small_pipe_walkable`, `metal_small_pipe_non_walkable`, `metal_medium_pipe_walkable`, `metal_medium_pipe_non_walkable`, `metal_large_pipe_walkable`, `metal_large_pipe_non_walkable`.  
* **Ventilation:** `4_inch_bath_vent`, `6_inch_bath_vent`, `attic_roof_fan_3-8_pitch`, `attic_roof_fan_8-14_pitch`.  
* **Plywood Decking:** `plywood_1/2`, `plywood_3/4`.

#### **4\. Skylights & Multipliers**

* **Skylight Models (Base Price Fixed, Base Price Vented, Labor Cost):** C01, C04, C06, C08, D26, D06, M02, M04, M06, M08, S01, S06, 2222, 2234, 2246, 3030, 3046, 3434, 3737, 4622, 4630, 4646\.  
* **Pitch Multipliers:** `skylight_pitch_3-6` (1.0), `skylight_pitch_7-8` (1.2), `skylight_pitch_9-10` (1.5), `skylight_pitch_11-12` (1.8), `skylight_pitch_13-16` (2.0), `skylight_pitch_16+` (2.5).

#### **5\. Chimney Material Rates**

* **Aluminum Rates:** `alum_w_siding`, `alum_w_brick_stucco`, `alum_w_smooth_stone`, `alum_w_jagged_stone`.  
* **Copper Rates:** `copper_w_siding`, `copper_w_brick_stucco`, `copper_w_smooth_stone`, `copper_w_jagged_stone`.

#### **6\. Small Jobs & Service Costs**

* **Gutter Cleaning Factors:** Pitch (0-3: 0.65, 4-6: 0.7, 7-8: 0.9, 9+: 1.8), Floor Factor (1st=1, 2nd=2, 3rd=3).  
* **Small Roof Repair:** `setup_cost` ($350), `gaf_shingles_needed` ($200), `other_shingle_match` ($450), `location_3x3` ($150), `pipe_collar` ($200).  
* **Small Siding Repair:** `setup_cost` ($400), `siding_needed` ($350), `siding_match` ($350), `location_repair` ($320), `outside_corner` ($980), `dryer_vent` ($70), `gable_vent` ($75).  
* **Small Capping Repair:** `setup_cost` ($700), `remove_reinstall_gutter` ($7/LF), `fascia_cap_no_gutter` ($45/LF), `rake_capping_10LF` ($75), `color_charge` ($150), `fascia_board` ($20/LF).  
* **Small Gutter Repair:** `setup_cost` ($250), `hidden_hangers` ($7/ea), `corner_sealing` ($45/ea), `downspout_install` ($75/ea).  
* **Small Gutter Replacement:** `setup_cost` ($400), `gutters_5k` ($13), `gutters_6k` ($15), `spouts_2x3` ($12), `spouts_3x4` ($14), Gutter guards (5k/6k low/high slope), 5"/6" Half rounds (Traditional/Flat Fascia), 4" Round Spouts/Elbows.

#### **7\. Global Rules (Upcharges & Discounts)**

* **Minimum Job Upcharge:** `upcharge_tier_1` (\<$5,000 \= $1,500), `upcharge_tier_2` (\<$7,500 \= $1,000), `upcharge_tier_3` (\<$10,000 \= $750).  
* **Discount:** `global_discount_percentage` (default 23.00%).

---

### **Part 2: Intake Form Calculation Logic**

Provide this logic to your AI tool to map the intake form inputs directly to the finalized quote.

#### **Step 1: Base Roof Calculation**

* **Input:** System Type (GAF, Tamko, Metal, Flat), Pitch (Dropdown), Layers (1 or 2), Total Squares (Number).  
* **Logic:** `Base_Roof_Total = Total Squares * Lookup Database(System Type + Pitch + Layers)`

#### **Step 2: Trim & Edges**

* **Input:** Linear feet for Ridge, Ridge Vent, Hip, Valley, Rake, Eave, Flashing, Step Flashing. If System Type \= Metal, prompt a toggle for "Walkable" vs. "Non-Walkable".  
* **Logic:** `Trim_Total = (Input_LF * Component_Price)` for each selected line item, then sum them together.

#### **Step 3: Penetrations & Add-ons**

* **Input (Pipes):** Quantity, Size (1.5, 2, 3, 4), Material (Iron, Copper, PVC).  
* **Input (Vents):** Quantity of 4" bath, 6" bath, and Attic Fans. *Logic Check: If Pitch \> 8, automatically apply the 8-14 pitch attic fan price, otherwise apply the 3-8 pitch price.*  
* **Input (Decking):** Quantity of 1/2" or 3/4" Plywood.  
* **Logic:** `Addons_Total = Sum of (Quantity * Database Item Price)`

#### **Step 4: Skylights & Chimneys**

* **Input (Skylights):** Quantity, Model (e.g., C01), Type (Fixed vs Vent).  
* **Skylight Logic:** `Skylight_Total = Quantity * ((Base Price Fixed or Vent + Labor Cost) * Pitch Multiplier)`. *(Pitch multiplier is dynamically pulled from the Pitch Dropdown in Step 1).*  
* **Input (Chimneys):** Quantity, Base Flashing LF, Step Side 1 LF, Step Side 2 LF, Flat Pan LF, Gusset Pan LF, Cricket Pan LF. Material Combo (e.g., Aluminum w/ Siding).  
* **Chimney Logic:** `Chimney_Total = Quantity * (Sum of all Chimney LFs * Material Combo Rate)`.

#### **Step 5: Small Jobs & Change Orders**

* **Input (Small Jobs):** If a user selects a small job module (e.g., Capping Repair), reveal the exact fields for that category (e.g., Setup Fee \+ (LF \* Fascia board rate)).  
* **Input (Misc):** Allow up to 27 dynamic line items. Each row requires: Line Item Name, Quantity, Price/Unit.  
* **Logic:** `Misc_Total = Sum of (Misc Quantity * Price/Unit)`.

#### **Step 6: Grand Total, Upcharges & Discounts**

* `Raw_Subtotal = Base_Roof_Total + Trim_Total + Addons_Total + Skylight_Total + Chimney_Total + Small_Jobs_Total + Misc_Total`  
* **Upcharge Logic:**  
  * `IF Raw_Subtotal < 5000 THEN Upcharge = 1500`  
  * `ELSE IF Raw_Subtotal < 7500 THEN Upcharge = 1000`  
  * `ELSE IF Raw_Subtotal < 10000 THEN Upcharge = 750`  
  * `ELSE Upcharge = 0`  
* **Final Calculations:**  
  * `Gross_Job_Cost = Raw_Subtotal + Upcharge`  
  * `Discount_Amount = Gross_Job_Cost * (Global_Discount_Percentage / 100)`  
  * `Final_Quote = Gross_Job_Cost - Discount_Amount`

