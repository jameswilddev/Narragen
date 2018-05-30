# Narragen
Procedural narrative generation through recursive triple-store pattern matching.

[![Travis](https://img.shields.io/travis/jameswilddev/narragen.svg)](https://travis-ci.org/jameswilddev/narragen)
[![David](https://img.shields.io/david/jameswilddev/narragen.svg)](https://david-dm.org/jameswilddev/narragen)
[![David](https://img.shields.io/david/dev/jameswilddev/narragen.svg)](https://david-dm.org/jameswilddev/narragen?type=dev)
[![Coveralls github](https://img.shields.io/coveralls/github/jameswilddev/narragen.svg)](https://coveralls.io/github/jameswilddev/narragen)
[![license](https://img.shields.io/github/license/jameswilddev/narragen.svg)](https://github.com/jameswilddev/narragen/blob/master/licence)

## Concept

An implementation of some of the ideas in [Rogelio E. Cardona-Rivera and Chris Martens' talk on Procedural Narrative Generation](https://youtu.be/k2rgzZ2WXKo).

All state is stored in a triple-store; this means that all information is stored
as an entity, an attribute of that entity, and the value of that attribute of
that entity.  For example:

- car-color-red
- hero-location-cave

Rules look for patterns in the data, and can make changes to it based on those
patterns:

```
            .---------------------.
            |        Rule         |
.------.    |---------.-----------|
| Data | -> | Pattern | Effect(s) |
'------'    '---------'-----------'
    ^._____________________.'
```

The pattern is a graph of things which are related, such as:

```
eater hasEaten -> nothing (constant)
      type -----> actor (constant)
      location -> place
      hates NOT     ^
  .----------'      |
  v                 |
eaten location -----'
      type -----> food (constant)
```

Then, a set of assignments to make to the things matched in the pattern:

```
eater hasEaten
  .--------'
  v
eaten type -> crumbs (constant)
```

This allows for a set of simple rules to be produced, which can be applied at
random to procedurally generate data.

## Example script

The definition of a basic environment; three entities describing rooms, which
are linked by entities describing doors and stairs (in pairs denoting opposite
directions):

```
define stairsA
  fromRoom kitchen
  toRoom livingRoom

define stairsB
  fromRoom livingRoom
  toRoom kitchen

define doorA
  fromRoom kitchen
  toRoom diningRoom

define doorB
  fromRoom diningRoom
  toRoom kitchen
```

This could be illustrated as:

```
      livingRoom <--.
                     |
  stairsA toRoom ---'|
 .------- fromRoom   |
|                    |
| stairsB fromRoom -'
|.------- toRoom
|
 '--> kitchen <-----.
                     |
  doorA fromRoom ---'|
 .----- toRoom       |
|                    |
| doorB toRoom -----'
|.----- fromRoom
|
 '--> diningRoom
```

Next, a spider is added to the kitchen:

```
define spider
  location kitchen
```

The graph now looks like this:

```
      livingRoom <--.
                     |
  stairsA toRoom ---'|
 .------- fromRoom   |
|                    |
| stairsB fromRoom -'
|.------- toRoom       spider location -.
|                                        |
 '--> kitchen <------.------------------'
                     |
  doorA fromRoom ---'|
 .----- toRoom       |
|                    |
| doorB toRoom -----'
|.----- fromRoom
|
 '--> diningRoom
```

Next, a rule is written to allow the spider to wander between rooms:

```
when wanderer location is passage fromRoom
set wanderer location to passage toRoom
```

This rule, in the default state, has two possible applications:

| possibility | wanderer | passage | wanderer location therefore |
| ----------- | -------- | ------- | --------------------------- |
| a           | spider   | doorA   | diningRoom                  |
| b           | spider   | stairsA | livingRoom                  |

Graph of possibility a:

```
      livingRoom <--.
                     |
  stairsA toRoom ---'|
 .------- fromRoom   |
|                    |
| stairsB fromRoom -'
|.------- toRoom       spider location -.
|                                        |
 '--> kitchen <------.                   |
                     |                   |
  doorA fromRoom ---'|                   |
 .----- toRoom       |                   |
|                    |                   |
| doorB toRoom -----'                    |
|.----- fromRoom                         |
|                                        |
 '--> diningRoom <----------------------'
```

Graph of possibility b:

```
      livingRoom <---.------------------.
                     |                   |
  stairsA toRoom ---'|                   |
 .------- fromRoom   |                   |
|                    |                   |
| stairsB fromRoom -'                    |
|.------- toRoom       spider location -'
|
 '--> kitchen <-----.
                     |
  doorA fromRoom ---'|
 .----- toRoom       |
|                    |
| doorB toRoom -----'
|.----- fromRoom
|
 '--> diningRoom
```

Repeatedly applying this pattern will see the spider randomly wander between the
three locations.

Addition of another object:

```
define biscuit
  location livingRoom
```

With the current rule set, there is nothing in the current "wander" rule which
excludes said entity; it fulfils all necessary criteria for it to run.
Something must be added to distinguish the two:

```
define spider
  location kitchen
  type character

define biscuit
  location livingRoom
  type food
```

And the "wander" rule amended to check that new attribute:

```
when wanderer location is passage fromRoom
  and wanderer type is character
set wanderer location to passage toRoom
```

A new rule to allow interaction between characters and food:

```
when eater type is character
  and eaten type is food
  and eater location is eaten location
set eaten type to crumbs
```

Here, multiple rules must work together to produce an effect; the spider must
"wander" into the livingRoom, then, as both the "wander" and "eat" rules would
match, there is a chance it may eat the biscuit or exit back to the kitchen.

It will only eat the biscuit once, as after, its type will no longer be "food".

Adding more entities with a type of food to the world allows the "eat" rule to
apply to that food as well:

```
define broccoli
  location diningRoom
  type food
```

The "eat" rule could then be amended to track what characters eat, preventing
them eating more than one thing:

```
when eater type is character
  and eater hasEaten is nothing
  and eaten type is food
  and eater location is eaten location
set eaten type to crumbs
  and eater hasEaten to eaten
```

Note that hasEaten is compared to "nothing" without having initialized it.  Any
unassigned attribute has an initial value of "nothing".

As an example of inequality, a special exemption could be added to the above
rule to prevent eating of broccoli specifically:

```
when eater type is character
  and eater hasEaten is nothing
  and eaten type is food
  and eater location is eaten location
  and eaten is not broccoli
set eaten type to crumbs
  and eater hasEaten to eaten
```

## Implementation

Inspired by the [LMAX architecture](https://martinfowler.com/articles/lmax.html),
the entire database/rules engine runs entirely in-memory, with instructions
(selecting a rule and its arguments) piped into a thread which verifies that the
rule and its arguments match, and then apply its effects.

### Rule search

Searching for a rule and corresponding arguments is done as though every
possible rule and argument set is generated, and one is then picked at random.

In the above example script, the initial possiblities are:

| rule   | wanderer | passage | eater | eaten |
| ------ | -------- | ------- | ----- | ----- |
| wander | spider   | doorA   |       |       |
| wander | spider   | stairsA |       |       |

If the second option were to be picked (the spider is now in the livingRoom with
the biscuit), the next set of possibilities would be:

| rule   | wanderer | passage | eater  | eaten   |
| ------ | -------- | ------- | ------ | ------- |
| wander | spider   | stairsB |        |         |
| eat    |          |         | spider | biscuit |

In practice, the implementation would count the possible permutations of each
rule, then work backwards to determine what the arguments would be.

This could be done in its own thread without locking if the in-memory database
design is sufficiently robust.

### In-memory database

While the modification of the in-memory database happens in a strictly single
threaded manner (both argument verification and application of effects) other
threads will be reading the same data at the same time, and as such, the data
must be organized in such a way that it can be safely read and written without
any locking.

This means that while data can be allocated or changed atomically, it can never
be safely deleted or moved (such as realloc), as such actions may cause another
thread to read freed memory.

Entities themselves are a 32-bit incrementing integer ID, where "nothing" is 0.

The forward index of attribute values is a 65536-item array of pointers to
65536-item arrays of values.  This means that:

- While a small amount of memory is allocated up-front, the full 16GB of values
  per entity is not allocated up-front.
- Nothing ever needs to be resized, which means that pointers never change; new
  pages are only allocated, initialized, then added to the "master" array.

## NPM module

### Parsing

The parser is streaming; information is fed into the pipeline as it is known,
and results generated as they are known.

State is held at two levels; a shared state which can be interacted with by
every file, and a state local to each file.  This is so that parser state can be
maintained locally to each file, with final results collected in a central state
repository.

Example:

```javascript
import { start, newFile, text, endOfFile, endOfFiles } from "narragen"
import { readdir, createReadStream } from "fs"
import { join } from "path"

const onNewFile = (sharedState, name) => `State local to file "${name}" which was built using shared state "${sharedState}"`
const onToken = (fileState, token, starts) => console.log(`Token "${token}" starts at index ${starts} and is being processed using file state "${fileState}"`)
const onEndOfFile = (fileState) => console.log(`File has ended with file state "${fileState}"`)
const onEndOfFiles = (sharedState) => console.log(`All files have ended (shared state "${sharedState}")`)

const parser = start("Test Shared State", onNewFile, onToken, onEndOfFile, onEndOfFiles)

readdir(`./a/path/to/reactive-script/files`, (error, filenames) => {
  if (error) throw error

  filenames.forEach(filename => {
    const file = newFile(parser, filename)
    const stream = createReadStream(join("./a/path/to/reactive-script/files", filename), { encoding: `utf8` })
    stream.on(`data`, data => text(file, data))
    stream.on(`error`, error => { throw error })
    stream.on(`close`, () => endOfFile(file))
  })

  endOfFiles(parser)
})
```

#### start

Creates and returns a new parser.

Arguments:

- A value to use as shared state for the parsing as a whole.
- A callback to execute every time a new file is started, returning a value to
  use as state for that particular file, with the arguments:
  - The shared state.
  - The name of the started file.
- A callback to execute every time a token is found in a file, with the
  arguments:
  - The state for the file a token was found inside.
  - The found token, as a string.
  - The number of characters between the start of the file and the start of
      the token.
- A callback to execute every time a file ends, with the arguments:
  - The state for the file which ended.
- A callback to execute when every file has ended, with the arguments:
  - The shared state.

#### newFile

Informs the parser of a newly found file, returning a file handle for it.

Arguments:

- The parser for which a file was found.
- The name of the file.

#### text

Call when text has been read for a previously found file.

Arguments:

- The file handle for which text has been found.
- The text read, as a string.

#### character

Call when a single character has been read for a previously found file.

Arguments:

- The file handle for which text has been found.
- The character read, as a single-character string.

#### endOfFile

Call when the end of a previously found file has been reached.

Arguments:

- The file handle for which the end has been found.

#### endOfFiles

Call when no more files will be found.

Arguments:

- The parser for which no more files will be found.
