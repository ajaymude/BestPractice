

app.all('/path', (req, res) => {
  res.send('This handles ALL HTTP methods');
});
