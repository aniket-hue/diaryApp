import React from "react";
import ReactDom from "react-dom";
import Root from "./root";
import "./index.css";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn:
      "https://04d876f5f29644a4bacf81015fe6a0ba@o499634.ingest.sentry.io/5578354",
    release: "%REACT_APP_RELEASE_VERSION%",
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
  

ReactDom.render(<Root />, document.getElementById("root"));
