// lib/tool-data.ts — javari-pets
// CR AudioViz AI · May 2026
export function getActions() {
  return [
    { id: 'health_check',         label: '🩺 Health Check',        desc: 'AI symptom assessment and vet guidance',   buildPrompt: function(v) { return 'My pet: ' + (v.petName||'my pet') + ', a ' + (v.age||'') + ' year old ' + (v.breed||v.species||'dog') + '. Symptoms: ' + (v.concern||'') + '. Provide a detailed health assessment, possible causes, immediate steps I can take, and when to see a vet. Weight: ' + (v.weight||'unknown') + '.' } },
    { id: 'nutrition_plan',       label: '🥗 Nutrition Plan',       desc: 'Custom diet and feeding schedule',          buildPrompt: function(v) { return 'Create a complete nutrition and feeding plan for ' + (v.petName||'my pet') + ', a ' + (v.age||'') + ' year old ' + (v.breed||v.species||'dog') + ', weighing ' + (v.weight||'unknown') + ' lbs. Activity: ' + (v.activity||'moderate') + '. Health conditions: ' + (v.conditions||'none') + '. Include: daily schedule, portions, recommended foods, foods to avoid, treats, supplements.' } },
    { id: 'vaccination_schedule', label: '💉 Vaccination Schedule',  desc: 'Complete vaccine timeline',                buildPrompt: function(v) { return 'Create a complete vaccination schedule for ' + (v.petName||'my pet') + ', a ' + (v.age||'') + ' year old ' + (v.breed||v.species||'dog') + ' in ' + (v.state||'Florida') + '. Include: core vaccines, boosters, rabies requirements, flea/tick/heartworm prevention, and annual vet visit checklist.' } },
    { id: 'breed_guide',          label: '📖 Breed Guide',           desc: 'Complete care guide for your breed',        buildPrompt: function(v) { return 'Write a comprehensive breed guide for ' + (v.breed||v.species||'mixed breed') + '. Include: temperament, exercise needs, grooming, common health issues, training tips, ideal living situation, lifespan, and what makes this breed unique.' } },
    { id: 'behavioral_advice',    label: '🐾 Behavior Help',         desc: 'Fix behavioral issues with expert guidance', buildPrompt: function(v) { return 'My ' + (v.species||'dog') + ' ' + (v.petName||'') + ' (' + (v.age||'') + ' years, ' + (v.breed||'') + ') has this behavioral issue: ' + (v.behavior||'') + '. Provide: root cause analysis, step-by-step training techniques, what NOT to do, timeline for improvement, and when to consult a professional.' } },
    { id: 'vet_prep',             label: '🏥 Vet Visit Prep',        desc: 'Prepare for your vet appointment',          buildPrompt: function(v) { return 'Help me prepare for a vet appointment for ' + (v.petName||'my pet') + ' (' + (v.breed||v.species||'dog') + ', ' + (v.age||'') + ' years). Reason: ' + (v.visitReason||'routine checkup') + '. Create: questions to ask the vet, symptoms to describe, what to bring, what to expect, and post-visit care.' } },
    { id: 'adoption_profile',     label: '❤️ Adoption Profile',      desc: 'Help find the perfect home for your pet',   buildPrompt: function(v) { return 'Write a compelling adoption profile for ' + (v.petName||'this pet') + ', a ' + (v.age||'') + ' year old ' + (v.breed||v.species||'dog') + '. Personality: ' + (v.personality||'') + '. Special needs: ' + (v.specialNeeds||'none') + '. Make it heartfelt and specific with ideal home requirements and a CTA.' } },
  ]
}
export function getFields(actionId) {
  const base = [{ id: 'petName', label: 'Pet Name', placeholder: 'Buddy' }, { id: 'species', label: 'Species', placeholder: 'Dog, Cat, Bird...' }, { id: 'breed', label: 'Breed', placeholder: 'Golden Retriever, Siamese...' }, { id: 'age', label: 'Age', placeholder: '3 years' }, { id: 'weight', label: 'Weight (lbs)', placeholder: '45' }]
  const extras = {
    health_check: [{ id: 'concern', label: 'Symptoms / Concern', placeholder: 'Not eating, lethargic, limping...', type: 'textarea' }],
    nutrition_plan: [{ id: 'activity', label: 'Activity Level', placeholder: 'Low, Moderate, High' }, { id: 'conditions', label: 'Health Conditions', placeholder: 'Diabetes, allergies...' }],
    vaccination_schedule: [{ id: 'state', label: 'State', placeholder: 'Florida' }],
    behavioral_advice: [{ id: 'behavior', label: 'Behavioral Issue', placeholder: 'Aggression, excessive barking...', type: 'textarea' }],
    vet_prep: [{ id: 'visitReason', label: 'Reason for Visit', placeholder: 'Annual checkup, limping...' }],
    adoption_profile: [{ id: 'personality', label: 'Personality', placeholder: 'Playful, gentle, loves kids...' }, { id: 'specialNeeds', label: 'Special Needs', placeholder: 'None, requires medication...' }],
  }
  return { label: 'Pet Details', fields: [...base, ...(extras[actionId] || [])] }
}
