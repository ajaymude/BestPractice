// 01 - git introduction 







// 01 - git introduction 

// git --version -- to check is it installed or not 
// git init     -- to create git
// git config --global user.email 'mudeajay@gmail.com'
// git config --global user.name 'ajay mude'
// git config --list 

// git status
// git add index.html
// git rm file.txt == file name that is removed
// git add .
// git commit -m "Added new feature"
// git branch -M main                                         // rename the current branch to main 
// git remote add origin repo_line                           // how add the remote origin
// git push origin -u main                                   // push the change the force full 


//working dir --> git add --> staging dir
//staging dir --> git commit --> local repo 
//local repo --> git push --> remote repo











// git push origin main
// git push origin -u main == 
// git push origin feature == to push the in feature branch 
// git push origin --delete branchname == delete branch from the remote 
// git push --force origin master  == it push the code force fully 

// git pull origin main == it pull only from the main branch from remote , it is the combination of the git fetch , and git merge  command 
// git pull == it pull the all changes from the remote with all branches 
// git 

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

// git diff main..feature-branch -- to check the diff in the branch 
// git diff = show the diff 


// git reset file.txt == it remove the latest unstage or git add . command
// git reset --soft HEAD~1  == it remove the letest commit 0 is the commit the last which you want to remove , it remove the only the commit not not staging data 
// git reset --hard HEAD~1 == commit and staging area removed 
// git reset HEAD~1 = it remove commit as well as staged area 

// git restore file.txt == it remove the specific changes upto last commit 
// git restore . == it remove the changes from the all file   

// git reflog == it show the all overview of the project for the 30 days 

// git stash  == unstage and unstash  , it remove the all unstage changes means before the git add . commit changes 
// git stash list == list we will get of all stash changes 
// git stash apply == we will get all the changes back
// git stash apply 0 == number you can give to go specific commit 
// git stash push -m "message" == you can give the message to the stash 
// git stash apply stash@{1} == 0 means letest 
// git stash pop == delete the all stash at once 
// git stash pop stash@{1}
// git stash drop stash@{0}
// git stash clear  == clear the stash 

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