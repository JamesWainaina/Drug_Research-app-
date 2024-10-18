"use client";

import * as Ably from "ably";
import ChatBox from "./chat-box.jsx";

export default function Chat() {
  const client = new Ably.Realtime({
    key: "86p3gA.G0T1ZA:oKduisIq-z3HV5_9lIzCFLE4Dx4ABk4l2SMVtv1a3TM",
  });
  return <ChatBox />;
}
