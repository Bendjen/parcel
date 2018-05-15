import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { animationFrame } from "rxjs/scheduler/animationFrame";

import { interval } from "rxjs/observable/interval";
import { fromEvent } from "rxjs/observable/fromEvent";
import { combineLatest } from "rxjs/observable/combineLatest";
import { of } from "rxjs/observable/of";

import {
  map,
  filter,
  scan,
  startWith,
  distinctUntilChanged,
  share,
  withLatestFrom,
  tap,
  skip,
  switchMap,
  takeWhile,
  first
} from "rxjs/operators";

import {
  createCanvasElement
  // renderScene,
  // renderApples,
  // renderSnake,
  // renderScore,
  // renderGameOver,
  // getRandomPosition,
  // checkCollision
} from "./canvas";

import { DIRECTIONS, SPEED } from "./constants";
import { Key } from "./types";
import { nextDirection } from "./types";

const INITIAL_DIRECTION = DIRECTIONS[Key.RIGHT];
let ticks$ = interval(SPEED);
let click$ = fromEvent(document, "click");
let keydown$ = fromEvent(document, "keydown");


export default function() {
  let canvas = createCanvasElement();
  let ctx = canvas.getContext("2d");
  document.querySelector("#container").appendChild(canvas);

  //   let direction$ = keydown$
  //     .map(event => DIRECTIONS[event.keyCode])
  //     .filter(direction => !!direction)
  //     .scan(nextDirection)
  //     .startWith(INITIAL_DIRECTION)
  //     .distinctUntilChanged();
}

function createGame(fps$) {
  let direction$ = keydown$.pipe(
    map(event => DIRECTIONS[event.keyCode]),
    filter(direction => !!direction),
    startWith(INITIAL_DIRECTION),
    scan(nextDirection),
    distinctUntilChanged()
  );
}
