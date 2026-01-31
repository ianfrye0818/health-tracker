import { createWeightEntryInputSchema, updateWeightEntryInputSchema } from "@/lib/schemas";
import { authMiddleware } from "@/server/middleware";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { createWeightEntry } from "./createWaterEntry.server";
import { removeWeightEntry } from "./deleteWeightEntry.server";
import { getWeightEntires } from "./getWeightEntries.server";
import { updateWeightEntry } from "./updateWeightEntry.fn";

export const GetWeightEntriesFn = createServerFn({ method: 'GET'})
.middleware([authMiddleware])
.handler(async ({ context }) => getWeightEntires(context.user));

export const CreateWeightEntryFn = createServerFn({ method: 'POST'})
.middleware([authMiddleware])
.inputValidator(zodValidator(createWeightEntryInputSchema))
.handler(async ({ data, context }) => createWeightEntry(data, context.user));

export const UpdateWeightEntryFn = createServerFn({ method: 'POST'})
.middleware([authMiddleware])
.inputValidator(zodValidator(updateWeightEntryInputSchema))
.handler(async ({ data, context }) => updateWeightEntry(data, context.user));

export const DeleteWeightEntryFn = createServerFn({ method: 'POST'})
.middleware([authMiddleware])
.inputValidator(zodValidator(z.object({ id: z.coerce.number() })))
.handler(async ({ data, context }) => removeWeightEntry(data.id, context.user));    