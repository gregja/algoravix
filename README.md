# Algoravix
Experimental algorave project to play with the WebAudio API

---

Three examples of algorave machines, to play and have fun with electronic sounds
and rythms.

The exemples are inspired by a more simple algorave machine proposed by 
Matthew Yee-King (computer scientist, musician and educator) on this excellent
course :

https://www.futurelearn.com/courses/electronic-music-tools


The sounds used here have been downloaded on that project : 

https://github.com/tidalcycles/Dirt-Samples

If you don't want to download the file locally, you can use this path in
you Javascript code :
  var path_sounds = "https://cdn.rawgit.com/tidalcycles/Dirt-Samples/a7f0b277/"


Three examples are proposed here with differect possibilities : 
- algorave1.html : the simplest example (closer to the Matthew Yee-King example)
- algorave2.html : intermediate level
- algorave3.html : more sounds, with "mute" checkbox for each sound 


Just a small explanation about the values :

- you can use a lot of combinations, like for example : 
    0,1,0,1 or 1,0,1,0, 0,0,0,1, etc..

With the value "1", the sound is played everytime.
With the value "0", the sound isn't played.

- you can use some decimal values, like for example :
    0.1 , 0.5 , 0.05 , etc..

When you use decimal values, the computer calculates a random value between
0 and 1, and if you value is greater or equal to the random value, so the 
sound is played. 

You can mix different sequences with 4, 5, 6 notes, and more, for example :
    0, 1, 0, 1, 0, 1
    0.5, 0, 0, 1
    1, 0, 0.2, 1, 0, .5

You can change sounds, modify the algorithm about random values, or experiment
in other directions.

You can test the algorave3.html online here :
https://thimbleprojects.org/gregja/493414

Play, modify the code (if you want), and Have fun !!!



This module is powered by the CreativeCodeParis Meetup :
https://www.meetup.com/fr-FR/CreativeCodeParis/

