## Italian weather data 1901 to 2012

This small exercise displays Italian weather data from 1901 to 2012 and starts to explore them highlighting the hottest, coldest, dryest and wettest years and — in some case — seasons.

It's intended as a rough starting point for further investigations and developments.



### Technical details
A simple **state machine** has been implemented with [stateman](https://github.com/leeluolee/stateman) library.
There is an intro state (application cover) and a linegraph state (diagrams) with 5 child states (5 different explorations on the same data).
The state machine object and functions are in *js/states.js*; a custom *go* function has been implemented to achieve more flexibility for further developments.
The tasks to be performed for each state are located into the *js/states/* folder.

A very basic **components** structure has been set up in *components* folder: 

* *LineGraph*: line generator and data handler. To be split in two separate components: one for line drawing and animations, the other for data analysis. 

* *Ui*: user interface (now basically the navigation buttons only).

The ui html fragment are injected into index.html using [static-player] (https://github.com/abusedmedia/static-player) library.

### Next steps
Now the application is really basic in visual, narrative and functional sides.
About the functional side, here is a memo of some functional tasks to be implemented to improve the current version:

* implementing line segment highlight, to be able to highlight only the portion of a line associated with a specific season 

* develop a function to set the highlight on one or more lines on a diagram (not only when mouse overing), selecting them by year

* highlight lines using properties instead of classes, to be able to animate highlighting

* implement parametric texts, using variables for years and words instead having them hardcoded

* adding animations (e.g. on texts)

* adding diagram information, adding a legenda, the measurement units on the axes

* modifiy the layout in order to avoid the main diagram to move up and down depending on the height of the content above
