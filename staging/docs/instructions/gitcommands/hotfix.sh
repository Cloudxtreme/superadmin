#!/bin/bash

## Switch to the branch you want to hotfix.
git checkout -B branch

## Do the changes you need to do.
## Done?

## Commit your changes
git commit

## Rebuild the project
node builder/build.js

## Commit your the build (only for platform)
git commit -m 'Rebuilding project'

## Push
git push

## ... and switch back to master branch.
git checkout -B master
