
# 🛠 Cridge Technical Documentation

## 1. Overview
Cridge is a mobile-first React application designed to foster community engagement through AI-assisted content creation. It utilizes the **Google Gemini API** to act as a creative backend for its users.

## 2. Tech Stack
- **Frontend:** React (v19), TypeScript, Tailwind CSS.
- **Icons:** Lucide React.
- **AI Engine:** @google/genai (Gemini 3 Flash).
- **Styling:** Glassmorphism, custom CSS animations, mobile-only simulation for web.

## 3. System Architecture
The app follows a modular component-based architecture:
- `App.tsx`: Main router and state manager for navigation.
- `Layout.tsx`: Mobile shell providing a consistent header and floating bottom navigation.
- `Feed.tsx`: The primary landing page featuring "Daily Sparks" and the community stream.
- `ShortsFeed.tsx`: A vertical, snap-scrolling interface for short-form media.
- `Communities.tsx`: The discovery hub for "Guilds."

## 4. AI Integration (Gemini API)
The core of Cridge's intelligence resides in `services/geminiService.ts`.

### A. Daily Sparks (`getDailySparks`)
- **Model:** `gemini-3-flash-preview`
- **Function:** Takes a user's skills/interests and returns a JSON array of creative hooks.
- **Input:** `string[]` (User skills).
- **Output:** Structured JSON containing `title`, `description`, and `emoji`.

### B. Caption Refinement (`generateCatchyCaption`)
- **Model:** `gemini-3-flash-preview`
- **Function:** Acts as a "copy editor" to add "sauce" (energy and emojis) to raw user text.
- **Trigger:** "Add Sauce" button in the post creation card.

### C. Community Vibe Analysis (`getCommunityVibeDescription`)
- **Model:** `gemini-3-flash-preview`
- **Function:** Dynamically generates a summary of a community's current energy.

## 5. UI/UX Design Principles
- **Mobile Only:** The layout is restricted to 430px width on desktop to maintain a native feel.
- **Glassmorphism:** High usage of `backdrop-blur` and semi-transparent borders to create a premium, futuristic look.
- **Vibrant Gradients:** Uses a "Neon Purple to Pink" palette to signify energy and creativity.
- **Micro-interactions:** `active:scale-95` on buttons and `fade-in` transitions for page loads.

## 6. Data Modeling
Defined in `types.ts`:
- `User`: Profile and skill-set metadata.
- `Community`: Guild information and member counts.
- `Post`: Standard feed items.
- `ShortContent`: Metadata for the vertical video/image feed.

## 7. Setup & Environment
- **API Key:** Requires `process.env.API_KEY` for Gemini functionality.
- **Responsive Design:** Optimized for iOS/Android viewports with `viewport-fit=cover`.
