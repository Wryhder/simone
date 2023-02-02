/* eslint-disable prettier/prettier */
/* 
Updating player score:
  saveScore(level, getScore())
  savePlayTime(level, timeTaken)
  sessionScores[level1].scores.push(score)
  sessionScores[level1].playTimes.push(timeTaken)

  getScore(level) {
    let score;
    switch (level) {
      case 1:
        score = 15
        break;
      case 2:
        score = 20
        break;
      case 3:
        score = 25
        break;
      case 4:
        score = 30
        break;
      default:
        score = 35
        break;
    }

    const adjustedScore = adjustScoreByTimeTaken(score, level, timeTaken)
    return adjustedScore
  }

  updateLevel() {
    switch (true) {
      case patternCount > 40 && <= 50:
        level = 5
        break;
      case patternCount > 30 && <= 40:
        level = 4
        break;
      case patternCount > 20 && <= 30:
        level = 3
        break;
      case patternCount > 10 && <= 20:
        level = 2
        break;
      default:
        level = 1
        break;
    }
  }

  adjustScoreByTimeTaken(score, level, timeTaken) {
    if (level == 1 && timeTaken >= 10s) ||
    (level == 2 && timeTaken >= 30s) ||
    (level == 3 && timeTaken >= 60s) ||
    (level == 4 && timeTaken >= 80s) ||
    (level == 5 && timeTaken >= 100s) || {
        score -= 5
    } else {
        score += 5
    }
    return score
  }

  watch level variable:
    if level increases {
        update table cell with score of previous level
          score will be average of all scores in level
        add new table cell to scoreboard and set score to N/A
    }

After each successful pattern:
  If 

After a wrong pattern guess:
  show game over modal
    Shucks, game over! Processing scores...
    Your Criminal Coefficient (CC) is 180
    if CC < 100 { "You're all set! Such a great hue you got there" }
    if CC > 100 < 300 { "Please stay calm. We are dispatching the closest bureau inspectors
                    to your address. We'll also have a psychologist along to work with
                    you to bring your CC down to acceptable range" }
    if CC > 300 { "Please hold on. We are still processing your scores..." }

    Reporting hues:
      clear_hue = ["white"]
      healthy_hues = ["light blue", "pink"]
      cloudy_hues = ["steel blue", "medium green"]
      clouded_hue = ["black"]

  Restarting game (w/ "Replay" button)
    Clear state
    Reload game screen

    NB(?): Players shouldn't have to start afresh from beginning if they
     cleared the previous level e.g game-over in level 2 means they can
     restart at begiining of level 2

  Exiting game (w/ "Exit" button)
    Clear state
    Navigate to home screen

*/
