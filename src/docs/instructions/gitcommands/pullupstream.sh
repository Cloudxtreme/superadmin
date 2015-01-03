#!/bin/bash

## pull everything into master
git checkout -B master
git merge origin/rc0 --no-commit --no-edit
git merge origin/rc1 --no-commit --no-edit
git merge origin/rc2 --no-commit --no-edit
git merge origin/rc3 --no-commit --no-edit
git merge origin/stable --no-commit --no-edit
git commit -m 'Merging hotfixes upstream'
git push origin master

## pull everything post rc0 into rc0
git checkout -B rc0
git merge origin/rc1 --no-commit --no-edit
git merge origin/rc2 --no-commit --no-edit
git merge origin/rc3 --no-commit --no-edit
git merge origin/stable --no-commit --no-edit
git commit -m 'Merging hotfixes upstream'
git push origin rc0

## pull everything post rc1 into rc1
git checkout -B rc1
git merge origin/rc2 --no-commit --no-edit
git merge origin/rc3 --no-commit --no-edit
git merge origin/stable --no-commit --no-edit
git commit -m 'Merging hotfixes upstream'
git push origin rc1

## pull everything post rc2 into rc2
git checkout -B rc2
git merge origin/rc3 --no-commit --no-edit
git merge origin/stable --no-commit --no-edit
git commit -m 'Merging hotfixes upstream'
git push origin rc2

## pull everything post rc3 into rc3
git checkout -B rc3
git merge origin/stable --no-commit --no-edit
git commit -m 'Merging hotfixes upstream'
git push origin rc3

## Move back to master.
git checkout -B master