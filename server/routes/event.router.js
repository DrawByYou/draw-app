const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//get all uncompleted events
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "events" WHERE "completed"='FALSE' ORDER BY "timestamp";`;
  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

//get all completed events/requests
router.get('/completed', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT SUM("artist_count") as "total_artists", "events"."id", "location", "timestamp" FROM "events" JOIN "requests" ON
"requests"."event_id" = "events"."id" WHERE "events"."completed" = 'TRUE' AND "requests"."completed" = 'TRUE' GROUP BY "events"."id" ORDER BY "timestamp";`;

  if (req.user.auth_level === 'superAdmin' || req.user.auth_level === 'admin') {
    pool
      .query(queryText)
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.warn(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

//post event
router.post('/', rejectUnauthenticated, (req, res) => {
  const e = req.body;
  const queryText = `INSERT INTO "events" ("location", "timestamp") VALUES ($1, $2);`;
  console.log('EVENT POST', req.body);
  if (req.user.auth_level === 'superAdmin' || req.user.auth_level === 'admin') {
    pool
      .query(queryText, [e.location, e.timestamp])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error('Error completing EVENT POST', err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

//delete specific event in case of making a mistake
router.delete('/', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "events" WHERE "id" = $1`;
  if (req.user.auth_level === 'superAdmin' || req.user.auth_level === 'admin') {
    pool
      .query(queryText, [req.body.id])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.warn(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

//edit specific event ID in case of making a mistake
router.put('/', rejectUnauthenticated, (req, res) => {
  let e = req.body;
  console.log('EDIT EVENT', req.body);
  const queryText = `UPDATE "events" SET "location"=$1, "timestamp" = $2 WHERE "id" =$3;`;
  if (req.user.auth_level === 'superAdmin' || req.user.auth_level === 'admin') {
    pool
      .query(queryText, [e.location, e.timestamp, e.id])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.warn(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

//complete an event
router.put('/completed/:id', rejectUnauthenticated, (req, res) => {
  let e = req.params;
  const queryText = `UPDATE "events" SET "completed"='TRUE' WHERE "id" =$1;`;
  if (req.user.auth_level === 'superAdmin' || req.user.auth_level === 'admin') {
    pool
      .query(queryText, [e.id])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.warn(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});
module.exports = router;
