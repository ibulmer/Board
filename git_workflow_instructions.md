Git Workflow


1) Create a branch called "typeOfCommit" / "feature"
  For reference, "typeOfCommit" could equal:
    - feat
    - bugfix
    - ...etc
2) Commit the files pertaining to that feature
3) Check if there is a pull request still open that has changes to your same file
  3a) Either merge their request because it is clean, or reach out to the pull requester.
4) git pull --rebase upstream master (git rb)
  4a) If there are merge conflicts, reach out to the other person, unless it is super evident the other stuff is not necessary.
5) git push origin "typeOfCommit" / "feature"
6) Go to Github and make pull request FROM THAT BRANCH