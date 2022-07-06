const { Task, Either } = require("../types");
const { Right, Left } = Either;

// nt(a.map(f)) == nt(a).map(f)
// T a -> F a
const eitherToTask = (e) => e.fold(Task.rejected, Task.of);

const fake = (id) => ({ id: id, name: "user1", best_friend_id: id + 1 });

const Db = {
  find: (id) =>
    Task((rej, res) =>
      setTimeout(() => res(id > 2 ? Right(fake(id)) : Left("not found")), 100)
    ),
};

const send = (code, json) =>
  console.log(`sending ${code}: ${JSON.stringify(json)}`);

Db.find(3) //Task(Either(user))
  .chain((eu) =>
    eu.fold(
      (e) => Task.of(eu),
      (u) => Db.find(u.best_friend_id)
    )
  )
  .fork(
    (error) => send(500, { error }),
    (
      eu //Either(user)
    ) =>
      eu.fold(
        (error) => send(404, { error }),
        (x) => send(200, x)
      )
  );

Db.find(3) //Task(Either(user))
  .chain(eitherToTask)
  .chain((u) => Db.find(u.best_friend_id))
  .chain(eitherToTask)
  .fork(
    (error) => send(500, { error }),
    (u) => send(200, u)
  );
