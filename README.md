# PosturePro - AI Posture Analysis App

<p><img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" height="20" alt="Next.js"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" height="20" alt="TypeScript"> <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white" height="20" alt="TensorFlow"> <img src="https://img.shields.io/badge/MediaPipe-0AC9B0?style=flat-square" height="20" alt="MediaPipe"></p>

A privacy-first web application that uses AI to analyze and provide feedback on posture issues for remote workers and students.

## The Hard Part

The privacy constraint is the whole point, and it's also the hard part. Users never upload a video, so I had to run real-time pose estimation entirely in the browser with MediaPipe Pose + TensorFlow.js — wrangling the model's frame budget so the camera stays smooth while landmarks stream through. The other half is turning skeletons into *interpretable* posture issues: the algorithms in `lib/posture` detect forward head posture, rounded shoulders, shoulder asymmetry, anterior pelvic tilt, slouching, and head tilt/rotation, then map each to specific exercises and ergonomic tips. Cues and session history persist locally, so there's a sense of progress without an account or a server.

## Features

- **Real-time Posture Detection**: Uses MediaPipe Pose and TensorFlow.js for accurate pose estimation
- **Privacy-First**: All processing happens client-side - video never leaves your device
- **No Signup Required**: Instant access to posture checking
- **Actionable Feedback**: Get specific exercises and ergonomic tips
- **Progress Tracking**: Monitor improvements over time (optional account)

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript + TailwindCSS
- **ML/AI**: TensorFlow.js + MediaPipe Pose
- **Deployment**: Vercel (planned)
- **Analytics**: PostHog (privacy-preserving, planned)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
/app
  /check          - Posture checking page with camera
  /dashboard      - User progress tracking (future)
  /privacy        - Privacy policy
  /terms          - Terms of service
/components
  /camera         - Camera and pose detection components
  /ui             - Reusable UI components
/lib
  /posture        - Posture analysis algorithms
  /storage        - Local storage utilities
/types            - TypeScript type definitions
```

## Detected Posture Issues

- Forward Head Posture (FHP)
- Rounded Shoulders
- Shoulder Asymmetry
- Slouching/Hunched Sitting
- Anterior Pelvic Tilt
- Head Tilt/Rotation

## Medical Disclaimer

This app provides educational information about posture. It is NOT a medical device and does NOT diagnose or treat medical conditions. Always consult a healthcare professional for persistent pain or health concerns.

## License

MIT — see [LICENSE](LICENSE).

## Screenshots

![Landing](docs/landing.png)

Landing page with the app value proposition for remote workers and students.

![Posture analysis](docs/analysis.png)

Posture check flow (intro state before camera capture) with session duration controls.

## Roadmap

- [x] Project setup
- [x] MediaPipe integration
- [x] Core posture detection
- [x] Real-time feedback UI
- [x] Session tracking
- [x] Educational content
- [ ] Progress dashboard
- [ ] Reminder system
- [ ] PWA capabilities
- [ ] Freemium features
