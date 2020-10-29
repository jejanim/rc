import { Force, MapPlayer, Timer, Unit } from "w3ts";
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

  const getAllPlayers = () => {
    let players: player[] = []

    print("before callback")

    ForForce(GetPlayersAll(), () => players.push(GetEnumPlayer()));

    print("after callback")

    return players
  }

  getAllPlayers().forEach(p => print(`player ${MapPlayer.fromHandle(p).name}`))
}

addScriptHook(W3TS_HOOK.MAIN_AFTER, tsMain);