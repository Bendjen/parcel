import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { animationFrame } from "rxjs/scheduler/animationFrame";

import { interval } from "rxjs/observable/interval";
import { fromEvent } from "rxjs/observable/fromEvent";
import { combineLatest } from "rxjs/observable/combineLatest";
import { of } from "rxjs/observable/of";

import { nextDirection, move, generateSnake, generateApples, eat, isGameOver } from "./utils"
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
  createCanvasElement,
  renderScene,
  renderApples,
  renderSnake,
  renderScore,
  renderGameOver,
  getRandomPosition,
  checkCollision
} from "./canvas";

import { DIRECTIONS, SPEED, INITIAL_DIRECTION, SNAKE_LENGTH, POINTS_PER_APPLE, FPS } from "./constants";


let ticks$ = interval(SPEED);
let click$ = fromEvent(document, "click");
let keydown$ = fromEvent(document, "keydown");

function createGame (fps$) {

  // 将键盘输入转换为方向输出
  let direcion$ = keydown$
    .map(event => DIRECTIONS[event.keyCode])
    .filter(direcion => !!direcion)
    .scan(nextDirection)
    .startWith(INITIAL_DIRECTION)
    .distinctUntilChanged() //过滤相同的值


  // length作为 BehaviorSubject 既是观察者也可以是被观察到的状态，被传播状态 
  let length$ = new BehaviorSubject(SNAKE_LENGTH);

  let snakeLength$ = length$
    .scan((step, snakeLength) => snakeLength + step)
    .share()

  let score$ = snakeLength$
    .startWith(0)
    .scan((score) => score + POINTS_PER_APPLE)


  let ticks$ = Observable.interval(SPEED);
  let snake$ = ticks$
    .withLatestFrom(direcion$, snakeLength$, (tick, direcion, snakeLength) => [direcion, snakeLength])
    .scan(move, generateSnake())
    .share()

  let apples$ = snake$
    .scan(eat, generateApples())
    .distinctUntilChanged()
    .share();

  let appleEaten$ = apples$
    .skip(1)
    .do(() => length$.next(POINTS_PER_APPLE))
    .subscribe();

  let scene$ = Observable.combineLatest(snake$, apples$, score$, (snake, apples, score) => ({ snake, apples, score }));

  return fps$.pipe(withLatestFrom(scene$, (_, scene) => scene));
}

let game$ = of('Start Game').pipe(
  map(() => interval(1000 / FPS, animationFrame)),
  switchMap(createGame),
  takeWhile(scene => !isGameOver(scene))
);

const startGame = () => {
  let canvas = createCanvasElement();
  let ctx = canvas.getContext('2d');
  document.getElementById('container').appendChild(canvas);

  game$.subscribe({
    next: (scene) => renderScene(ctx, scene),
    complete: () => {
      renderGameOver(ctx);

      click$.pipe(first()).subscribe(startGame);
    }
  })
};



export default startGame