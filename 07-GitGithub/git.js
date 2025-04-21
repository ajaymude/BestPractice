// 01 - git introduction 







// 01 - git introduction 

// git --version                             # Check if Git is installed

// git init                                  # Initialize a new Git repository
// git config --global user.email "you@example.com"   # Set global email
// git config --global user.name "Your Name"          # Set global username
// git config --list                         # List all Git configurations

// git status                                # Show the status of working directory and staging area
// git add index.html                        # Stage a specific file
// git add .                                 # Stage all modified and new files

// git rm file.txt                           # Remove a file and stage the deletion
// git commit -m "Added new feature"         # Commit staged changes with a message

// git branch -M main                        # Rename the current branch to 'main'
// git remote add origin <repo_url>         # Add a remote origin (e.g., GitHub repo)
// git push -u origin main                   # Push to remote 'main' and set upstream tracking

// # Optional force push (if needed — use with caution):
// git push -f origin main                   # Force push (overwrites history on remote)



//working dir --> git add --> staging dir                 // untrack , unmodified , modified
//staging dir --> git commit --> local repo 
//local repo --> git push --> remote repo











// git push origin main                        # Push code to the 'main' branch on remote
// git push -u origin main                     # Push and set upstream (track local 'main' with remote 'main')
// git push origin feature                     # Push 'feature' branch to remote
// git push origin --delete branchname         # Delete a branch from remote

// git push --force origin main                # Force push 'main' branch (dangerous — overwrites remote history)
// git push -f origin main                     # Same as above (shorthand for --force)

// git push                                    # Push changes to the current upstream branch












// git pull                                 # Pull from the currently tracked upstream branch (default)
// git pull origin main                     # Pull changes from 'main' branch of remote 'origin'
// git pull origin feature                  # Pull changes from 'feature' branch of remote 'origin'

// git pull --rebase                        # Rebase current branch on top of upstream after pulling
// git pull --rebase origin main            # Pull with rebase from 'main' branch of 'origin'

// git pull --all                           # Fetch and merge all branches from all remotes (rarely used)
// git pull --no-commit                     # Pull changes and merge without committing automatically
// git pull --no-ff                         # Force a merge commit even if fast-forward is possible

// # Pull with strategy options
// git pull -s recursive -X ours            # Resolve conflicts by preferring local changes
// git pull -s recursive -X theirs          # Resolve conflicts by preferring remote changes

// # Set upstream branch to simplify future pulls
// git push -u origin main                  # Set upstream for main
// git branch --set-upstream-to=origin/main  # Set upstream without pushing

// # Configuring default behavior
// git config pull.rebase true              # Make 'git pull' use rebase by default
// git config pull.ff only                  # Prevent merge commits unless fast-forward is possible










// git branch
// git branch new-feature -- create new branch but not navigate that created branch 
// git branch -d name-branch == it delete the branch is the merge
// git branch -D name-branch second-branch  == it delete the branch force fully 
// git branch detach-head fdf322 == new branch will create with detach head 
// git branch -M main == rename the branch 
// git branch -a == to see the all hidden branch  local and remote 
// git branch -r == it show all remote branch 
// git branch track 
// git branch --delete --remote origin/branchname == delete remote branch from the local and then push 

// git checkout main -- it swithc the branch 
// git checkout -b new-feature -- it switch the branch if the branch is not exist it create the new branch 
// git checkout 5g4g3gd -- to checkout out at perticular commit  detached head it is not related to branch is it is related to commit
// git checkout filename.txt == the remove all unwanted changes which is not commit on up to last commit 
// git checkout . == it remove all unwanted change upto last commit 
// git checkout 1.0 == to checkout at the perticular tag

// git switch second-brach == similar like checkout command 
// git swithc -c new-branch == create new branch and switch that branch

// git ls-files == to check the working files 
// git ls-remote == it show the all remote branch 

// git clean -dn == it remove all untrack file from all directory 
// git clean -df == with the force clean             

// git merge new-feature -- this command merge new-feature branch in current branch where you are  , fast-farward=no change is done in ref branche  , non fast-farward merge - recursive , octopus , ours , subtree
// git merge --sqash branch-name == git merge the code but not save in the all commit we have to a commit then i will show all code in one commit 
// git merge --no-ff branchname == it give new commit to save the changes  , this give the call the recursive merge 
// git merge --abort  == it abort the merge 
// git merge origin/main == it merge the main branch in to your current branch from the remote 
// 


// git log
// git log --oneline
// git log --merge == you will see the commit you want to merge  
// git log HEAD..origin/main  == if you want inspect the changes while you fetch the data from the remote repository 

// git remote add origin https://github.com/username/repository.git  -- to add remote origin to local origin 

// git clone https://github.com/username/repository.git  -- to clone repository from the server 

// git fetch 
// git fetch origin == it fetch the all branch from the specifice remote origin   but it will not merge in branch 
// get fetch --all == it fetch the details from the all remote origin with out merge 
// git fetch origin main == it will fetch the details from the specific origin and specific branch 
// git fetch --tags == when you want to fetch the specific tag from the remote origin 
// git fetch --no-ff == git fetch but without fast farwarding 
// 








// git diff                              # Show unstaged changes (working directory vs last commit)
// git diff --staged                     # Show staged changes (staged vs last commit)

// git diff commit1 commit2              # Show changes between two specific commits
// git diff branch1..branch2             # Show changes in branch2 not in branch1
// git diff main..feature-branch         # Show what’s in feature-branch that’s not in main
// git diff main...feature-branch        # Show changes since branches diverged (three-dot syntax)

// git diff filename                     # Show changes in a specific file
// git diff --name-only                  # Show only filenames with changes











// git stash                            # Save all staged & unstaged changes (except untracked files)
// git stash -u                         # Save all changes including untracked files
// git stash -a                         # Save all changes including ignored files

// git stash list                       # Show list of all stashes
// git stash push -m "message"          # Stash with a custom message

// git stash apply                      # Apply latest stash (does NOT delete it)
// git stash apply stash@{1}            # Apply a specific stash (e.g., stash@{1})

// git stash pop                        # Apply latest stash AND remove it
// git stash pop stash@{1}              # Apply and remove a specific stash

// git stash drop stash@{0}             # Delete a specific stash
// git stash clear                      # Delete ALL stashes









// 00 - restore 
// git restore filename                    # Discard unstaged changes in a file (from working dir to last commit)
// git restore .                           # Discard ALL unstaged changes in the project

// git restore --staged filename           # Unstage a file (keep the changes in working directory)
// git restore --staged .                  # Unstage ALL files (soft reset)









// git reset filename                      # Unstage a specific file (keep changes in working directory)
// git reset                              # Unstage ALL files (like soft restore of staging)

// git reset --soft HEAD~1                # Move HEAD back by 1 commit (keep all changes staged)
// git reset --mixed HEAD~1               # Move HEAD back by 1 commit (keep changes, unstage them)
// git reset --hard HEAD~1                # Move HEAD back by 1 commit and delete all changes

// git reset commitHash                   # Reset HEAD to specific commit (default is --mixed)
// git reset --soft commitHash            # Reset to commit and keep all changes staged
// git reset --mixed commitHash           # Reset to commit, keep changes, unstage them
// git reset --hard commitHash            # Reset to commit and delete all changes

// git reset --hard                        # Reset working directory and staging area to last commit (DANGER: deletes changes)
















// git reset file.txt == it remove the latest unstage or git add . command
// git reset --soft HEAD~1  == it remove the letest commit 0 is the commit the last which you want to remove , it remove the only the commit not not staging data 
// git reset --hard HEAD~1 == commit and staging area removed 
// git reset HEAD~1 = it remove commit as well as staged area 

// git restore file.txt == it remove the specific changes upto last commit 
// git restore . == it remove the changes from the all file   

// git reflog == it show the all overview of the project for the 30 days 



// git rebase branch-you-want-merge = it take the code but create the new hash code for it , be carefull about it 

// git cherry-pich 444rdfdsdfocommit == it merge the specific commit to the current branch 

// git tag == get the list of the tags 
// git tag 1.0 4535fdsfsdgasgfgfscommithash  == this is how we can create the tag 
// git tag -d 1.0 == remove the perticular tag 

// git show 1.0 == you can see the commit 



// widows terminal command 

// echo "# studytubeAdda" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/ajaymude/studytubeAdda.git
// git push -u origin main

// git remote add origin https://github.com/ajaymude/studytubeAdda.git
// git branch -M main
// git push -u origin main