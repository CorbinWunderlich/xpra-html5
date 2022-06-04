/*
 * This file is part of Xpra.
 * Copyright (C) 2021 Tijs van der Zwaan <tijzwa@vpo.nl>
 * Copyright (c) 2022 Antoine Martin <antoine@xpra.org>
 * Licensed under MPL 2.0, see:
 * http://www.mozilla.org/MPL/2.0/
 *
 */

/*
 * Helper for offscreen decoding and painting.
 * Requires Chrome 94+ or Android and a secure (SSL or localhost) context.
 */

import { XpraImageDecoderLoader } from "./ImageDecoder.js";
import { XpraVideoDecoderLoader } from "./VideoDecoder.js";

export const XpraOffscreenWorker = {
  isAvailable() {
    if (
      XpraImageDecoderLoader.hasNativeDecoder() &&
      XpraVideoDecoderLoader.hasNativeDecoder &&
      typeof OffscreenCanvas !== "undefined"
    ) {
      //we also need the direct constructor:
      try {
        new OffscreenCanvas(256, 256);
        return true;
      } catch (error) {
        console.warn("unable to instantiate an offscreen canvas:", error);
      }
    }
    console.warn(
      "Offscreen decoding is not available. Please consider using Google Chrome 94+ in a secure (SSL or localhost) context for better performance."
    );
    return false;
  },
};
