# Design Guidelines: AI-Powered Personal Farming Assistant for Kerala Farmers

## Design Approach: Reference-Based (Productivity + Regional Cultural Elements)

**Primary Reference**: Linear, Notion, and WhatsApp for clean productivity interfaces
**Cultural Inspiration**: Kerala's natural landscapes - coconut palms, backwaters, monsoon greens

## Core Design Principles

- **Cultural Sensitivity**: Malayalam-first design with Kerala's agricultural context
- **Accessibility**: Works on basic smartphones with limited data
- **Trust & Reliability**: Professional yet approachable for farming community
- **Efficiency**: Quick access to critical farming decisions

## Color Palette

**Primary Colors**:
- Deep Kerala Green: `142 45% 25%` (main brand)
- Monsoon Blue: `210 35% 30%` (secondary actions)

**Supporting Colors**:
- Coconut White: `60 8% 96%` (backgrounds)
- Laterite Red: `15 55% 45%` (alerts/warnings)
- Paddy Gold: `45 35% 65%` (success states)
- Mist Gray: `200 10% 85%` (borders/dividers)

**Dark Mode**: Maintain Kerala Green as primary with darker, muted variations.

## Typography

**Primary**: Inter (Google Fonts) - excellent Malayalam support
**Display**: Poppins (headings)
**Weights**: 400 (regular), 500 (medium), 600 (semibold)

## Layout System

**Spacing Units**: Tailwind units of 2, 4, 8, and 16 for consistent rhythm
- `p-2, m-4, h-8, gap-16` as primary spacing
- Mobile-first approach with generous touch targets (44px minimum)

## Component Library

**Navigation**: Bottom tab bar (mobile) with weather widget always visible
**Cards**: Rounded corners (8px), subtle shadows, weather/price data displays
**Forms**: Photo upload for pest detection, voice input buttons prominent
**Data Displays**: Simple charts for weather forecasts, price trends
**Overlays**: Modal dialogs for detailed pest/disease information

## Key Features Integration

**Voice Interface**: Large, prominently placed microphone button with Malayalam voice waveform visualization
**Photo Upload**: Camera icon with instant preview for pest detection
**Weather Widget**: Always-visible header showing current conditions
**Price Ticker**: Scrolling price updates for major crops

## Images

**Hero Section**: Split-screen layout - left side shows Kerala farmer using smartphone in coconut grove, right side displays the app interface. Warm, natural lighting emphasizing the connection between traditional farming and modern technology.

**Feature Images**: 
- Pest detection: Close-up of coconut palm leaves with diagnostic overlay
- Weather advisory: Monsoon clouds over paddy fields
- Market prices: Local vegetable market with price displays

**Background Elements**: Subtle watermark patterns of Kerala's agricultural symbols (coconut, paddy, cardamom) in very light opacity

## Accessibility Considerations

- High contrast ratios for outdoor visibility
- Large text sizes (16px minimum)
- Voice-first interactions with visual confirmation
- Offline-capable design patterns
- Data-light image optimization for rural connectivity

## Cultural Design Elements

- Malayalam typography prominence
- Green color dominance reflecting Kerala's lush landscapes
- Card layouts resembling traditional Kerala architecture (clean lines, natural materials)
- Icons inspired by local farming tools and crops

This design balances modern productivity app patterns with Kerala's rich agricultural heritage, ensuring farmers feel both technologically empowered and culturally connected.