# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

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
