import { Timer, Trigger, Unit } from "w3ts";
import { Players } from "w3ts/globals";
import { addScriptHook, W3TS_HOOK } from "w3ts/hooks";

const BUILD_DATE = compiletime(() => new Date().toUTCString());
const TS_VERSION = compiletime(() => require("typescript").version);
const TSTL_VERSION = compiletime(() => require("typescript-to-lua").version);

function tsMain() {
  print(`Build: ${BUILD_DATE}`);
  print(`Typescript: v${TS_VERSION}`);
  print(`Transpiler: v${TSTL_VERSION}`);
  print(" ");
  print("Welcome to TypeScript!");

  const unit = new Unit(Players[0], FourCC("hfoo"), 0, 0, 270);
  unit.name = "TypeScript";

  new Timer().start(1.00, true, () => {
    unit.color = Players[math.random(0, bj_MAX_PLAYERS)].color
  });

// --------------------8<-----------------------------------

  // this is working as expected
  new Timer().start(2.00, true, () => {
    print("2s timer expired")
  });

  print("creating test triggers...") // does print!

  const t1 = new Trigger()
  t1.registerTimerEvent(5, true)
  t1.addCondition((() => true))
  t1.addAction(() => print("trigger1 action invoked")) // does not print

  const t2 = new Trigger()
  t2.registerTimerEvent(5, true)
  t2.registerTimerEvent(60, true)
  t2.addAction(() => print("trigger2 action invoked")) // does not print

  const t3 = new Trigger()
  t3.registerAnyUnitEvent(EVENT_PLAYER_UNIT_ATTACKED)
  t3.addAction(() => print("trigger3 action invoked")) // does not print (use blood mage to attack any unit)
  
  const t4 = new Trigger()
  t4.registerTimerExpireEvent(new Timer().start(5, true, () => {print("5s timer expired")}).handle) // does not print
  t4.addAction(() => {print("triggered by expired timer")}) // does not print

  // --------------------8<-----------------------------------
}

addScriptHook(W3TS_HOOK.MAIN_AFTER, tsMain);