Web App, similar to Race the Rails

1. Player is assigned a starting station and a destination station, which vary each game, within a fictional underground network.
2. The player must plan and executed a valid route before TIME RUNS OUT, gaining or losing COINS along the way due to RANDOM EVENTS.
3. Goal is to reach the destination with the highest possible score.

This game is based on an underground network consisting of a fixed set of stations connected by metro lines.

Both stations and lines have unique names.

The underground network must have at least 4 lines, at least 12 stations, and at least 3 interchange stations (serves more than one line). Network does not change during the game

At least 8 different events may occur during a segment; each event consists of a description and an effect and a positive or negative integer from -4 to +4.

Examples of events may include: Quiet journey, 0 coins, Wrong platform, -2 coins, Kind passenger, +1 coin

The network and the events are stored on the server and retrieved by the client at the appropriate times.

App allows to play multiple games, each game starts with 20 coins and consist of following phases:
1. Setup
2. Planning
3. Execution
4. Result