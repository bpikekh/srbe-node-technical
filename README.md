# Exercise Details

## Background

Our case data does not readily identify the procedure that the surgeon operated. The only information we have is ICD10(PX) codes.

## Product Problem

We must be able to aggregate our case data via procedure. Currently our ICD10PX codes are too narrow for the desired scoping (One procedure has many associated ICD10 codes). Because of this, we need to provide a way to group and label ICD10 codes. Then and only then will we be able to properly query cases by a "procedure" group name.

## Product Solution

Our solution for this is to create mappings for the ICD10 codes. However, this will be cumbersome for engineers to own, so we must also offload this. We can offload this by delivering a CSV (google sheet), combining it with git history, and updating the database with the most recent mappings.

## Engineering Solution

Create process to sync the database when the csv in code has changed. This syncing process should run every time a deployment's image is updated (at service run time).

Currently we have a process to easily get a new CSV into code.

Now we need to create the workflow to sync the database with the CSV sheet code. 

## Steps

1. Complete `/sync-procedure-mappings`
2. Verify outcome with `/get-procedure-mappings`
3. Think about feature from the end users' perspective and ensure that all needs are met