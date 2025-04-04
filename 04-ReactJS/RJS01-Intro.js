










// 01 - installation 
// npm create vite@latest
// npm create vite@latest foldername -- --template  react 



// 02 - component





// 03 - data 
// create a data for the list like nav list or link this can make your code cleaner 
// always map your data , don't hard code every time 




// 04 - short circuit 

function WelcomeMessage({ isLoggedIn }) {
    return (
      <div>
        <h1>Welcome to the App</h1>
        {isLoggedIn && <p>You are logged in!</p>}
      </div>
    );
  }

  

function Greeting({ name }) {
  return <h1>Hello, {name || "Guest"}!</h1>;
}



//Short-Circuit vs Ternary (? :)
{isLoggedIn ? <p>You are logged in!</p> : <p>Please log in.</p>}

