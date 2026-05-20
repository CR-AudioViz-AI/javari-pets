// lib/tool-data.ts — javari-pets
// Tool definitions extracted from page.tsx to keep JSX parser clean
// CR AudioViz AI · May 2026

export const ACTIONS = [
  { id: 'health_check',         label: '🩺 Health Check',          desc: 'AI symptom assessment and vet guidance',    prompt: (v) => `My pet: ${v.petName || 'my pet'}, a ${v.age || ''} year old ${v.breed || v.species || 'dog'}. Symptoms or concerns: ${v.concern || ''}. Provide a detailed health assessment, possible causes, immediate steps I can take at home, and clear guidance on whether/when to see a vet. Weight: ${v.weight || 'unknown'}.` },
  { id: 'nutrition_plan',       label: '🥗 Nutrition Plan',         desc: 'Custom diet and feeding schedule',          prompt: (v) => `Create a complete nutrition and feeding plan for ${v.petName || 'my pet'}, a ${v.age || ''} year old ${v.breed || v.species || 'dog'}, weighing ${v.weight || 'unknown'} lbs. Activity level: ${v.activity || 'moderate'}. Any health conditions: ${v.conditions || 'none'}. Include: daily feeding schedule, portion sizes, recommended foods, foods to avoid, treats, and supplements.` },
  { id: 'vaccination_schedule', label: '💉 Vaccination Schedule',   desc: 'Complete vaccine timeline for your pet',    prompt: (v) => `Create a complete vaccination schedule for ${v.petName || 'my pet'}, a ${v.age || ''} year old ${v.breed || v.species || 'dog'}. Location: ${v.state || 'Florida'}. Include: core vaccines, non-core vaccines, boosters, rabies requirements, flea/tick/heartworm prevention schedule, and annual vet visit checklist.` },
  { id: 'breed_guide',          label: '📖 Breed Guide',            desc: 'Complete care guide for your breed',        prompt: (v) => `Write a comprehensive breed guide for ${v.breed || v.species || 'mixed breed'}. Include: temperament and personality, exercise needs, grooming requirements, common health issues, training tips, ideal living situation, lifespan, and what makes this breed unique. Format as a complete owner's guide.` },
  { id: 'behavioral_advice',    label: '🐾 Behavior Help',          desc: 'Fix behavioral issues with expert guidance', prompt: (v) => `My ${v.species || 'dog'} ${v.petName || ''} (${v.age || ''} years old, ${v.breed || ''}) is having this behavioral issue: ${v.behavior || ''}. Provide: root cause analysis, step-by-step training techniques, what NOT to do, timeline for improvement, and when to consult a professional trainer.` },
  { id: 'vet_prep',             label: '🏥 Vet Visit Prep',         desc: 'Prepare for your vet appointment',          prompt: (v) => `Help me prepare for a vet appointment for ${v.petName || 'my pet'} (${v.breed || v.species || 'dog'}, ${v.age || ''} years old). Reason for visit: ${v.visitReason || 'routine checkup'}. Create: a list of questions to ask the vet, symptoms to describe clearly, what to bring, what to expect, and post-visit care instructions.` },
  { id: 'adoption_profile',     label: '❤️ Adoption Profile',       desc: 'Help find the perfect match for your pet',  prompt: (v) => `Write a compelling adoption profile for ${v.petName || 'this pet'}, a ${v.age || ''} year old ${v.breed || v.species || 'dog'}. Personality: ${v.personality || ''}. Special needs: ${v.specialNeeds || 'none'}. Make it heartfelt, specific, and include ideal home requirements, compatibility with kids/pets, and a CTA that will motivate adoption.` },
]


const BASE_FIELDS = [
  { id: 'petName', label: 'Pet Name', placeholder: 'Buddy' },
  { id: 'species', label: 'Species', placeholder: 'Dog, Cat, Bird, Rabbit...' },
  { id: 'breed', label: 'Breed', placeholder: 'Golden Retriever, Siamese...' },
  { id: 'age', label: 'Age', placeholder: '3 years' },
  { id: 'weight', label: 'Weight (lbs)', placeholder: '45' },
]

const EXTRA_FIELDS = {
  health_check:         [{ id: 'concern', label: 'Symptoms / Concern', placeholder: 'Not eating, lethargic, limping...', type: 'textarea' }],
  nutrition_plan:       [{ id: 'activity', label: 'Activity Level', placeholder: 'Low, Moderate, High, Athletic' }, { id: 'conditions', label: 'Health Conditions', placeholder: 'Diabetes, allergies, joint issues...' }],
  vaccination_schedule: [{ id: 'state', label: 'State', placeholder: 'Florida' }],
  breed_guide:          [],
  behavioral_advice:    [{ id: 'behavior', label: 'Behavioral Issue', placeholder: 'Aggression, excessive barking, separation anxiety...', type: 'textarea' }],
  vet_prep:             [{ id: 'visitReason', label: 'Reason for Visit', placeholder: 'Annual checkup, limping, not eating...' }],
  adoption_profile:     [{ id: 'personality', label: 'Personality', placeholder: 'Playful, gentle, loves kids, shy with strangers...' }, { id: 'specialNeeds', label: 'Special Needs', placeholder: 'None, requires medication, senior dog...' }],
}

export function getFields(actionId) {
  return FIELDS[actionId] || []
}
