import { MicroRollup } from "@stackr/sdk";
import { Playground } from "@stackr/sdk/plugins";

import { stackrConfig } from "../../stackr.config.ts";
import { machine } from "../stackr/machine.ts";

const mru = await MicroRollup({
  config: stackrConfig,
  stateMachines: [machine],
});

await mru.init();

Playground.init(mru);

export { mru };
