import { Exercise } from '@/types/posture';

export const exercises: Record<string, Exercise> = {
  'chin-tucks': {
    id: 'chin-tucks',
    name: 'Chin Tucks',
    description: 'A simple exercise to counteract forward head posture by strengthening neck muscles and improving alignment.',
    duration: 60,
    targetIssues: ['forward_head'],
    steps: [
      'Sit or stand with your back straight and shoulders relaxed',
      'Look straight ahead, keeping your jaw parallel to the floor',
      'Gently pull your chin back, as if making a double chin',
      'You should feel a stretch at the base of your skull',
      'Hold for 5 seconds, then relax',
      'Repeat 10 times',
      'Do this exercise 3-4 times daily',
    ],
  },
  'shoulder-rolls': {
    id: 'shoulder-rolls',
    name: 'Shoulder Rolls & Blade Squeezes',
    description: 'Exercises to improve shoulder posture and reduce rounding.',
    duration: 90,
    targetIssues: ['rounded_shoulders'],
    steps: [
      'Shoulder Rolls: Roll your shoulders up, back, and down in a circular motion',
      'Do 10 rolls backward, then 10 forward',
      'Shoulder Blade Squeezes: Sit up straight, arms at your sides',
      'Squeeze your shoulder blades together as if holding a pencil between them',
      'Hold for 5 seconds, feeling the squeeze between your shoulder blades',
      'Release and repeat 10-15 times',
      'Keep your shoulders down (don\'t shrug up toward ears)',
    ],
  },
  'shoulder-shrugs': {
    id: 'shoulder-shrugs',
    name: 'Shoulder Leveling Exercise',
    description: 'Helps address shoulder asymmetry and improve balance.',
    duration: 60,
    targetIssues: ['shoulder_asymmetry'],
    steps: [
      'Stand or sit with good posture',
      'Raise both shoulders up toward your ears (shrug)',
      'Hold for 3 seconds, then release down',
      'Repeat 10 times',
      'For the elevated shoulder: Do single-shoulder stretches',
      'Tilt your head away from the elevated shoulder',
      'Use your hand to gently increase the stretch',
      'Hold for 20-30 seconds, repeat 3 times',
    ],
  },
  'core-engagement': {
    id: 'core-engagement',
    name: 'Core Engagement & Sitting Posture',
    description: 'Strengthen your core to support better sitting posture and reduce slouching.',
    duration: 120,
    targetIssues: ['slouching'],
    steps: [
      'Sit on the edge of your chair, feet flat on floor',
      'Lengthen your spine, imagining a string pulling you up from the crown of your head',
      'Gently engage your core muscles (like bracing for a gentle punch)',
      'Keep your shoulders back and down, chest slightly lifted',
      'Hold this engaged posture for 30 seconds',
      'Relax for 10 seconds, then repeat',
      'Do 5 repetitions throughout the day',
      'Seated Cat-Cow: Arch your back (cow), then round it (cat)',
      'Do 10 slow repetitions to mobilize your spine',
    ],
  },
  'hip-flexor-stretch': {
    id: 'hip-flexor-stretch',
    name: 'Hip Flexor Stretch',
    description: 'Stretch tight hip flexors that contribute to anterior pelvic tilt.',
    duration: 90,
    targetIssues: ['pelvic_tilt'],
    steps: [
      'Kneel on your right knee, left foot flat in front (lunge position)',
      'Keep your torso upright and core engaged',
      'Gently push your hips forward until you feel a stretch in the right hip flexor',
      'Keep your back straight - don\'t arch',
      'Hold for 30 seconds',
      'Switch sides and repeat',
      'Do 2-3 sets on each side',
      'For sitting: Regularly stand up and do standing hip circles',
    ],
  },
  'neck-stretches': {
    id: 'neck-stretches',
    name: 'Neck Stretches',
    description: 'Gentle stretches to relieve neck tension and improve head alignment.',
    duration: 90,
    targetIssues: ['head_tilt', 'forward_head'],
    steps: [
      'Sit or stand with good posture',
      'Lateral Stretch: Tilt your head to the right, bringing ear toward shoulder',
      'Use your right hand to gently increase the stretch',
      'Hold for 20-30 seconds, then switch sides',
      'Neck Rotation: Slowly turn your head to look over your right shoulder',
      'Hold for 15 seconds, return to center',
      'Repeat on the left side',
      'Do 2-3 sets on each side',
      'Move slowly and never force the stretch',
    ],
  },
};

export function getExerciseById(id: string): Exercise | undefined {
  return exercises[id];
}

export function getExercisesForIssue(issueType: string): Exercise[] {
  return Object.values(exercises).filter(exercise =>
    exercise.targetIssues.includes(issueType as any)
  );
}
