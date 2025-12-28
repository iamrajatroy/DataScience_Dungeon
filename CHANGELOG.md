# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Mobile Touch Controls**: Full mobile support with on-screen D-pad and Action button
  - Controls automatically appear on touch devices and hide on desktop
  - Interaction prompts adapt to device type ("Press SPACE" vs "TAP ⚡")
- **Enhanced Victory Screen**: Complete aesthetic overhaul of the victory experience
  - Confetti animation celebration
  - New "Retro Happy" victory music track
  - Credits section
  - **Journey Review**: Detailed stats breakdown including "Mastered Dungeons" and "Cursed Chambers" based on topic performance
- **Auto-Victory**: Game now automatically triggers victory sequence upon completing the final room's challenges

### Fixed
- **Tunnel Asset Loading**: Fixed 404 errors for assets when accessing via dev tunnels by enabling CORS in `startup.bat`
- **Backend Connection**: Hardcoded API URL to `localhost` to ensure tunnel connections correctly route to local backend
- **Test User Script**: Fixed test user creation script dependencies and logic

### Added
- **Global Leaderboard**: New leaderboard feature accessible from the main menu showing top 10 players ranked by score
  - Backend: New `/api/leaderboard` endpoint returning top players' scores
  - Frontend: "LEADERBOARD" button on home page with modal showing rankings
  - Visual: Gold/Silver/Bronze medals for top 3, champion badge for game completers

### Changed
- **Server-Only Storage**: Removed localStorage fallback, all game progress now stored exclusively on the server
  - Requires login to play and save progress
  - Ensures leaderboard always reflects actual player scores

### Fixed
- **Continue Button Not Showing**: Fixed `hasSavedGame()` in `gameState.js` to check both server and localStorage for saved games while still requiring user login
- **Save Game Not Loading Properly**: Fixed `continueGame()` in `game.js` to properly load saves by trying server first, then falling back to localStorage if server has no valid save. Previously, clicking Continue would start a new game instead of loading the saved progress.
