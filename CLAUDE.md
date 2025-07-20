# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**走走小日模擬器 (Daily Walk Simulator)** - A dialogue-based life simulation game focused on realistic commuting experiences. Built with Next.js 15, TypeScript, and Chakra UI.

## Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Build & Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint to check for code issues
```

## Architecture

### Core Technologies
- **Framework**: Next.js 15.3.5 with App Router
- **UI**: Chakra UI 3.22.0 + Framer Motion for animations
- **Language**: TypeScript with strict mode
- **State Management**: React Context API with useReducer pattern

### Key Directories
- `src/app/components/game/` - Core game components (GameEngine, EventDisplay, etc.)
- `src/contexts/GameContext.tsx` - Global game state management
- `src/data/events/` - Event definitions organized by category
- `src/data/scenes/` - Scene management and visual presentation
- `src/types/game.ts` - TypeScript interfaces for game entities

### Game Architecture
1. **State Management**: GameContext provides global state with actions for mood, stamina, and savings updates
2. **Event System**: Modular event structure with choices that affect player attributes
3. **Scene System**: Dynamic background changes based on game progression
4. **Personality Traits**: -10 to 10 scale affecting dialogue and choices

### Important Patterns
- Events are defined as objects with `id`, `text`, `choices`, and optional `sceneId`
- Choices include `text`, `effectDescription`, and `action` (mood/stamina/savings changes)
- Use Chakra UI components and theme for consistent styling
- Follow existing TypeScript interfaces in `src/types/game.ts`

## Development Notes

- Game content is in Chinese (Traditional/Simplified)
- Focus on realistic urban commuting experiences
- Events should reflect daily life situations (weather, crowds, delays)
- Maintain balance between player attributes to create engaging gameplay

## Reference Documentation
- Game specification: `docs/specs/game-specification.md`
- Event templates: `docs/templates/`
- Development logs: `docs/ai-journal/`