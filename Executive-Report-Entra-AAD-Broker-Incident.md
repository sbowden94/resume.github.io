# Executive Report: Entra/AAD Broker Authentication Incident

## Audience
System Engineers, Endpoint Engineering, Identity and Access Management, Workplace Platform Teams

## Executive Summary
A high-volume endpoint event storm was traced to Microsoft Entra/AAD token broker failures, not a generic network outage. The visible symptom was sustained Schannel Event ID 36871 (internal state 10013), initially appearing as broad TLS credential failures from background Windows processes. Deep correlation showed repeated AAD broker errors (Event IDs 1097/1098) with AADSTS50011 redirect URI mismatch failures for broker-driven clients.

Local endpoint mitigations significantly reduced noise and stabilized user impact, but the underlying redirect URI mismatch is a tenant-side identity configuration issue requiring IAM/Entra remediation.

## Environment and Scope
- Endpoint: R5462975
- OS posture: Domain joined + AzureAdJoined
- Primary impact window: Multi-day recurring storm, including post-reboot and post-logoff sessions
- Affected process patterns:
  - backgroundTaskHost
  - taskhostw
  - StartMenuExperienceHost
  - ms-teams
  - msedgewebview2
  - OneDriveActionHelper

## Key Symptoms
- Schannel Event ID 36871 at high frequency
- AAD Operational Event IDs 1097 and 1098
- Error signatures:
  - 0xCAA5001C Token broker operation failed
  - 0xCAA20009 invalid_client
  - AADSTS50011 redirect URI mismatch for BrokerPlugin URI
- Secondary system noise observed:
  - DCOM 10016/10010 spikes during active broker failure windows

## Root Cause Analysis
### Primary Cause
Microsoft Entra token broker requests were rejected due to redirect URI mismatch (AADSTS50011) for broker-mediated client IDs. This caused repeated token acquisition failures, which cascaded into frequent TLS credential setup attempts and Schannel logging noise.

### Why Schannel Was Flooding
When broker-mediated apps repeatedly fail token acquisition, background and UI-hosted processes continue retrying secure channel initialization. This appears in System log as Schannel 36871 with internal error state 10013, even when basic HTTPS connectivity remains functional.

## Business and Operational Impact
- Elevated event volume reduced signal-to-noise for real incident triage
- Increased analyst/engineer time spent on false-leading TLS diagnostics
- Potential disruption or degraded sign-in/refresh behavior in broker-dependent apps
- Increased risk of missed genuine endpoint failures due to log saturation

## What Was Remediated Locally
### Completed Endpoint Actions
- Time sync and TLS/update service normalization
- WinHTTP/Winsock/IP resets with reboot cycle
- Certificate hygiene checks and stale-certificate cleanup
- CyberArk service stability hardening (recovery tuning and dump capture)
- AAD broker cache rotation and package re-registration
- Controlled process suppression and startup mitigation for top trigger apps
  - Disabled Teams auto-start run key
  - Disabled OneDrive run key and scheduled startup/reporting tasks

### Outcome of Local Actions
- Short-window storm suppression achieved
- AAD broker error frequency reduced under controlled startup conditions
- Core connectivity (HTTPS and update scan trigger) remained functional
- Confirms endpoint-side mitigations are effective for stability, but not a full root-cause elimination

## Required Tenant-Side Fix
### Identity Team Action
Update Entra application registration and broker redirect URI alignment for affected client applications so BrokerPlugin redirect URIs are valid for the tenant configuration.

### Indicators to Validate in Tenant
- Broker app client IDs in failing events (examples observed):
  - 82864fa0-ed49-4711-8395-a0e6003dca1f
  - ecd6b820-32c2-49b6-98a6-444530e5a77a
- Redirect URI format:
  - ms-appx-web://Microsoft.AAD.BrokerPlugin/<SID-based suffix>
- Ensure environment-specific redirect URIs are present and policy-compliant

## Engineering Runbook
### Immediate Stabilization (Endpoint)
1. Confirm event correlation: Schannel 36871 + AAD 1097/1098 time alignment.
2. Verify dsregcmd status and token posture.
3. Normalize services and network stack.
4. Apply process/startup suppression for highest-volume broker clients.

### Permanent Resolution (Identity)
1. Correct Entra app redirect URI configuration.
2. Validate broker token acquisition success in AAD Operational logs.
3. Re-enable previously suppressed startup entries in phased manner.
4. Monitor 24-hour event trend for recurrence.

## Validation Criteria for Closure
- AAD 1097/1098 rate near zero under normal user workload
- Schannel 36871 rate returns to low baseline
- No sustained DCOM spike linked to broker retries
- Teams/OneDrive sign-in flows succeed without repeated token retries
- Endpoint remains stable after restart and user re-logon

## Residual Risk
If startup mitigations are removed before tenant-side redirect URI correction, event storms can recur. Maintain mitigations until IAM confirms and validates Entra app registration updates.

## Recommendation
Treat this as a cross-domain incident:
- Endpoint Engineering owns containment and telemetry
- IAM/Entra owns root-cause correction
- Joint validation required before rollback of mitigations
