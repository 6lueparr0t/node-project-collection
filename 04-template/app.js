// const http = require("http");

const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const rootDir = require("./util/path");

const app = express();
const shopRoutes = require("./routes/shop");
const adminData = require("./routes/admin");

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.use(favicon(path.join(rootDir, "public", "favicon.ico")));
app.use(express.static(path.join(rootDir, 'public')));

app.use("/", (req, res, next) => {
  console.log(`logging area`);
  next();
});

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "404.html"));
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
// app.listen 에서 아래와 같은 코드를 실행함
// const server = http.createServer(app);
// server.listen(3000);
