const { Task } = require("../types");
const { List } = require("immutable-ext");

const httpGet = (path, params) => Task.of(`${path}: result`);

const getUser = (x) => httpGet("/user", { id: x });
const getTimeLine = (x) => httpGet(`/timeLine/${x}`, {});
const getAds = () => httpGet("/ads", {});

//Resolve - past params
List([getUser, getTimeLine, getAds])
  .traverse(Task.of, (f) => f())
  .fork(console.log, (x) => console.log(x.toJS()));
