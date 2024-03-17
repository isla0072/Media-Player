# Media Player

## Overview
This project is an enhancement of a basic media player that I created in the first semester, focusing on improving user interaction with a seek bar and implementing animations for a more dynamic experience. The media player now supports track seeking, playlist shuffling, and visual feedback during playback.

## Features
- **Dynamic Seek Bar**: Updates in real-time as tracks play, with the ability to click and seek to different parts of the track.
- **Playlist Shuffling**: Users can shuffle their playlist, automatically reloading and playing from the first track in the shuffled list.
- **Responsive Animations**: Incorporates animations for the playing track's title and album art, enhancing the visual appeal.

## Technical Highlights
- Utilizes the `timeupdate` event to synchronize the seek bar with the current playback time.
- Implements click event listeners on the seek bar, allowing users to jump to specific parts of a track.
- Adds a shuffle method to the Array prototype for efficient playlist shuffling.
- Leverages CSS transitions and animations to provide a smooth and engaging user interface.
  
## Credits
Developed as part of the Fullstack: Frontend Development course.

## Getting Started
To explore the media player, visit the deployed GitHub Pages link. Developers interested in contributing or customizing can clone the repository:

```bash
git clone <https://github.com/isla0072/Media-Player>
# Navigate to the project directory
cd enhanced-media-player
