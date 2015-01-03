#!/bin/bash

## Make sure we are in the master branch.
git checkout -B master

## Build the master branch.
node builder/build
 
## Make sure that you don't have any untracked files!
git add build/

## This should return no untracked files.
git status

## If this shows any untracked files, add them.
## See basic git tutorial.

## Commit this
git commit -m 'Building platform'

## Push to master branch
git push origin master

## At this point, you might want to check for errors.

## Push rc3 to stable
## This script will push rc3 to stable.
## SO THIS IS A STABLE RELEASE!
git checkout -B stable
git merge origin/rc3 --no-commit --no-edit
git commit -m 'Releasing rc3 to stable'
git push origin stable

## START RC CYCLE

## Push rc2 to rc3
git checkout -B rc3
git merge origin/rc2 --no-commit --no-edit
git commit -m 'Releasing rc2 to rc3'
git push origin rc3

## Push rc1 to rc2
git checkout -B rc2
git merge origin/rc1 --no-commit --no-edit
git commit -m 'Releasing rc1 to rc2'
git push origin rc2

## Push rc0 to rc1
git checkout -B rc1
git merge origin/rc0 --no-commit --no-edit
git commit -m 'Releasing rc0 to rc1'
git push origin rc1

## END RC CYCLE

## Push master onto rc0
## Finally, we push the master branch onto rc0.
git checkout -B rc0
git merge origin/master --no-commit --no-edit
git commit -m 'Releasing master to rc0'
git push origin rc0

## Switch back to master.
git checkout -B master