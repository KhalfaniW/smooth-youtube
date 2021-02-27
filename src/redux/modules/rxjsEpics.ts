import {from} from "rxjs";
import {filter} from "rxjs/operators";
import {ofType} from "redux-observable";
import {Observable} from "redux";

export const pingEpic = (action$: any) =>
  action$.pipe(
    ofType("PING"),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo({type: "PONG"}),
  );
