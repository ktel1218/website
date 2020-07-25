Title: Space Monster
Date: 2016-02-05 11:07
Tags: javascript, games, game development, canvas
Category: development
Slug: quadtree-javascript
Author: Katie Lefevre
Summary: Using quadtree partitioning for swarming behavior in javascript
<!-- status: draft -->


[This](/games/SpaceMonster/ "Space Monster") is Space Monster. Eat as many dots as you can. There are some neat things happening behind the scenes in this game. My initial idea was to have a game where you fight against small swarming nanomachines that'll eat you up bit by bit and use your matter to self-replicate, circa a sweet side plot in the book [Surface Detail](https://en.wikipedia.org/wiki/Surface_Detail "Surface Detail") by Iain M. Banks. Because I wanted a __lot__ of simple ai enemies it was recommended that I look into into this paper on [Continuum Crowds](http://grail.cs.washington.edu/projects/crowd-flows/continuum-crowds.pdf "Continuum Crowds Abstract"). 

## Continuum Crowds ##

The general idea is that instead of each bot having to figure out the most efficient path to a target, the surface it traverses influences it's path. Think about planets in orbit following the edges of a gravity well. Or, using the metaphor that worked well for me, imagine ants. A single ant finds food. Other ants don't have to find food, they can follow the first ant's pheromone trail. If that trail is blocked by an obstacle, the ants following that path bump into it and find their way around, creating a new trail. If the obstacle is permanent, the old trail gets weaker and the new trail gets stronger. If the obstacle was temporary, the original pheromone path will still be strong and the ants can follow it when the obstacle is moved. This is great for a crowd swarming algorithm because your computer doesn't have to find a way around the same obstacle for every object.

## Vector Mapping ##

A major piece of what makes this continuum crowd work is a vector map or vector field. How it works is this: Every object imprints its position and velocity onto a vector map. Any other object passing over the vector map at the same spot reads that velocity, uses it to adjusts its own velocity, and imprints again. Combine this with pathfinding, signal degradation, and probably some other neat things, and you get Continuum Crowds. The math in the abstract was too hard for me to implement and my priority was really just collision detection and swarming, so I abandoned the idea of continuum crowds as specified. Luckily, vector maps by themselves can be used to get pretty efficient collision detection and swarming behavior. There's a great write up [here](http://buildnewgames.com/vector-field-collision-avoidance/ "Vector Fields") that I followed for my first vector mapping prototype. Their own prototype seems to be down, so here's a link to mine: [link](vector field demo goes here).

The resulting animation isn't great. I could've spent more time on it to get it looking niice but I had a _deadline_. I switched to a much easier flocking behavior. 

## Flocking with Partitions ##

The trouble is that flocking is much slower. Each bot has to check the position of every other bot. One way to make this faster is to make partitions so that each bot knows its closest neighbors. That way it only has to watch the bots closest to it, like the way we meat-puppets keep from bumping into each other. The problem was, my bots are moving around. Some places they'll be clustered closely together and other places they'll be far apart. In the places where they clustered together, my partitions weren't reducing the number of collision checks by very much.


## Quadtree Partitioning ##

I took a break to work on something else. I had decided that everything in my game would be "goopy." To that end I started looking into this thing called metaball graphics. [demo]. This was also really slow, since the effect requires you to do a pixel-by-pixel proximity check, but someone recommended using a thing called quadtree partitioning to speed things up. The steps are roughly like this: Break your field into four quadrants. Check each quadrant. Is there something we need to draw inside of it? If no, we don't need to run our calculation on those pixels. If yes, break this field into four quadrants. Look at each of those smaller quadrants. Is there something we need to draw inside of it? Etc. Hey, could this be the answer to my flocking problem? It was! If a quandrant contained too many bots, it would subdivide. If those smaller subdivisions had too many, THEY would subdivide. When we had small enough groups of neighbors, we can do a sane number of collision checks. The white lines in the final Space Monster game are these quadtree partitions in action.

## Multiplayer with Firebase! ##

The last bit of tinkering I did with this project was multiplayer. I used firebase to share user coordinates without needing to have a server running. This will also be how I eventually do a scoreboard. If you'd like to look at the code in progress or send me some recommendations (or work on it :>), you can find it on my [github](https://github.com/ktel1218/SpaceMonster-Multiplayer "Space Monster multiplayer github repository")
